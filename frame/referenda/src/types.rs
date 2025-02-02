// This file is part of Substrate.

// Copyright (C) Parity Technologies (UK) Ltd.
// SPDX-License-Identifier: Apache-2.0

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// 	http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

//! Miscellaneous additional datatypes.

use super::*;
use codec::{Decode, Encode, EncodeLike, MaxEncodedLen};
use frame_support::{
	traits::{schedule::v3::Anon, Bounded},
	Parameter,
};
use scale_info::TypeInfo;
use sp_arithmetic::{Rounding::*, SignedRounding::*};
use sp_runtime::{FixedI64, PerThing, RuntimeDebug};
use sp_std::fmt::Debug;
use std::io;
use std::error::Error;

pub type BalanceOf<T, I = ()> =
	<<T as Config<I>>::Currency as Currency<<T as frame_system::Config>::AccountId>>::Balance;
pub type NegativeImbalanceOf<T, I> = <<T as Config<I>>::Currency as Currency<
	<T as frame_system::Config>::AccountId,
>>::NegativeImbalance;
pub type CallOf<T, I> = <T as Config<I>>::RuntimeCall;
pub type BoundedCallOf<T, I> = Bounded<<T as Config<I>>::RuntimeCall>;
pub type VotesOf<T, I> = <T as Config<I>>::Votes;
pub type TallyOf<T, I> = <T as Config<I>>::Tally;
pub type PalletsOriginOf<T> =
	<<T as frame_system::Config>::RuntimeOrigin as OriginTrait>::PalletsOrigin;
pub type ReferendumInfoOf<T, I> = ReferendumInfo<
	TrackIdOf<T, I>,
	PalletsOriginOf<T>,
	<T as frame_system::Config>::BlockNumber,
	BoundedCallOf<T, I>,
	BalanceOf<T, I>,
	TallyOf<T, I>,
	<T as frame_system::Config>::AccountId,
	ScheduleAddressOf<T, I>,
>;
pub type ReferendumStatusOf<T, I> = ReferendumStatus<
	TrackIdOf<T, I>,
	PalletsOriginOf<T>,
	<T as frame_system::Config>::BlockNumber,
	BoundedCallOf<T, I>,
	BalanceOf<T, I>,
	TallyOf<T, I>,
	<T as frame_system::Config>::AccountId,
	ScheduleAddressOf<T, I>,
>;
pub type DecidingStatusOf<T> = DecidingStatus<<T as frame_system::Config>::BlockNumber>;
pub type TrackInfoOf<T, I = ()> =
	TrackInfo<BalanceOf<T, I>, <T as frame_system::Config>::BlockNumber>;
pub type TrackIdOf<T, I> = <<T as Config<I>>::Tracks as TracksInfo<
	BalanceOf<T, I>,
	<T as frame_system::Config>::BlockNumber,
>>::Id;
pub type ScheduleAddressOf<T, I> = <<T as Config<I>>::Scheduler as Anon<
	<T as frame_system::Config>::BlockNumber,
	CallOf<T, I>,
	PalletsOriginOf<T>,
>>::Address;

/// A referendum index.
pub type ReferendumIndex = u32;

pub trait InsertSorted<T> {
	/// Inserts an item into a sorted series.
	///
	/// Returns `true` if it was inserted, `false` if it would belong beyond the bound of the
	/// series.
	fn insert_sorted_by_key<F: FnMut(&T) -> K, K: PartialOrd<K> + Ord>(
		&mut self,
		t: T,
		f: F,
	) -> bool;
}
impl<T: Ord, S: Get<u32>> InsertSorted<T> for BoundedVec<T, S> {
	fn insert_sorted_by_key<F: FnMut(&T) -> K, K: PartialOrd<K> + Ord>(
		&mut self,
		t: T,
		mut f: F,
	) -> bool {
		let index = self.binary_search_by_key::<K, F>(&f(&t), f).unwrap_or_else(|x| x);
		self.force_insert_keep_right(index, t).is_ok()
	}
}

#[derive(Encode, Decode, Clone, PartialEq, Eq, RuntimeDebug, TypeInfo, MaxEncodedLen)]
pub struct DecidingStatus<BlockNumber> {
	/// When this referendum began being "decided". If confirming, then the
	/// end will actually be delayed until the end of the confirmation period.
	pub since: BlockNumber,
	/// If `Some`, then the referendum has entered confirmation stage and will end at
	/// the block number as long as it doesn't lose its approval in the meantime.
	pub confirming: Option<BlockNumber>,
}

#[derive(Encode, Decode, Clone, PartialEq, Eq, RuntimeDebug, TypeInfo, MaxEncodedLen)]
pub struct Deposit<AccountId, Balance> {
	pub who: AccountId,
	pub amount: Balance,
}

#[derive(Clone, Encode, TypeInfo)]
pub struct TrackInfo<Balance, Moment> {
	/// Name of this track.
	pub name: &'static str,
	/// A limit for the number of referenda on this track that can be being decided at once.
	/// For Root origin this should generally be just one.
	pub max_deciding: u32,
	/// Amount that must be placed on deposit before a decision can be made.
	pub decision_deposit: Balance,
	/// Amount of time this must be submitted for before a decision can be made.
	pub prepare_period: Moment,
	/// Amount of time that a decision may take to be approved prior to cancellation.
	pub decision_period: Moment,
	/// Amount of time that the approval criteria must hold before it can be approved.
	pub confirm_period: Moment,
	/// Minimum amount of time that an approved proposal must be in the dispatch queue.
	pub min_enactment_period: Moment,
	/// Minimum aye votes as percentage of overall conviction-weighted votes needed for
	/// approval as a function of time into decision period.
	pub min_approval: Curve,
	/// Minimum pre-conviction aye-votes ("support") as percentage of overall population that is
	/// needed for approval as a function of time into decision period.
	pub min_support: Curve,
}

/// Information on the voting tracks.
pub trait TracksInfo<Balance, Moment> {
	/// The identifier for a track.
	type Id: Copy + Parameter + Ord + PartialOrd + Send + Sync + 'static + MaxEncodedLen;

	/// The origin type from which a track is implied.
	type RuntimeOrigin;

	/// Return the array of known tracks and their information.
	fn tracks() -> &'static [(Self::Id, TrackInfo<Balance, Moment>)];

	/// Determine the voting track for the given `origin`.
	fn track_for(origin: &Self::RuntimeOrigin) -> Result<Self::Id, ()>;

	/// Return the track info for track `id`, by default this just looks it up in `Self::tracks()`.
	fn info(id: Self::Id) -> Option<&'static TrackInfo<Balance, Moment>> {
		Self::tracks().iter().find(|x| x.0 == id).map(|x| &x.1)
	}
}

/// Info regarding an ongoing referendum.
#[derive(Encode, Decode, Clone, PartialEq, Eq, RuntimeDebug, TypeInfo, MaxEncodedLen)]
pub struct ReferendumStatus<
	TrackId: Eq + PartialEq + Debug + Encode + Decode + TypeInfo + Clone,
	RuntimeOrigin: Eq + PartialEq + Debug + Encode + Decode + TypeInfo + Clone,
	Moment: Parameter + Eq + PartialEq + Debug + Encode + Decode + TypeInfo + Clone + EncodeLike,
	Call: Eq + PartialEq + Debug + Encode + Decode + TypeInfo + Clone,
	Balance: Eq + PartialEq + Debug + Encode + Decode + TypeInfo + Clone,
	Tally: Eq + PartialEq + Debug + Encode + Decode + TypeInfo + Clone,
	AccountId: Eq + PartialEq + Debug + Encode + Decode + TypeInfo + Clone,
	ScheduleAddress: Eq + PartialEq + Debug + Encode + Decode + TypeInfo + Clone,
> {
	/// The track of this referendum.
	pub track: TrackId,
	/// The origin for this referendum.
	pub origin: RuntimeOrigin,
	/// The hash of the proposal up for referendum.
	pub proposal: Call,
	/// The time the proposal should be scheduled for enactment.
	pub enactment: DispatchTime<Moment>,
	/// The time of submission. Once `UndecidingTimeout` passes, it may be closed by anyone if
	/// `deciding` is `None`.
	pub submitted: Moment,
	/// The deposit reserved for the submission of this referendum.
	pub submission_deposit: Deposit<AccountId, Balance>,
	/// The deposit reserved for this referendum to be decided.
	pub decision_deposit: Option<Deposit<AccountId, Balance>>,
	/// The status of a decision being made. If `None`, it has not entered the deciding period.
	pub deciding: Option<DecidingStatus<Moment>>,
	/// The current tally of votes in this referendum.
	pub tally: Tally,
	/// Whether we have been placed in the queue for being decided or not.
	pub in_queue: bool,
	/// The next scheduled wake-up, if `Some`.
	pub alarm: Option<(Moment, ScheduleAddress)>,
}

/// Info regarding a referendum, present or past.
#[derive(Encode, Decode, Clone, PartialEq, Eq, RuntimeDebug, TypeInfo, MaxEncodedLen)]
pub enum ReferendumInfo<
	TrackId: Eq + PartialEq + Debug + Encode + Decode + TypeInfo + Clone,
	RuntimeOrigin: Eq + PartialEq + Debug + Encode + Decode + TypeInfo + Clone,
	Moment: Eq + PartialEq + Debug + Encode + Decode + TypeInfo + Clone + EncodeLike,
	Call: Eq + PartialEq + Debug + Encode + Decode + TypeInfo + Clone,
	Balance: Eq + PartialEq + Debug + Encode + Decode + TypeInfo + Clone,
	Tally: Eq + PartialEq + Debug + Encode + Decode + TypeInfo + Clone,
	AccountId: Eq + PartialEq + Debug + Encode + Decode + TypeInfo + Clone,
	ScheduleAddress: Eq + PartialEq + Debug + Encode + Decode + TypeInfo + Clone,
> {
	/// Referendum has been submitted and is being voted on.
	Ongoing(
		ReferendumStatus<
			TrackId,
			RuntimeOrigin,
			Moment,
			Call,
			Balance,
			Tally,
			AccountId,
			ScheduleAddress,
		>,
	),
	/// Referendum finished with approval. Submission deposit is held.
	Approved(Moment, Option<Deposit<AccountId, Balance>>, Option<Deposit<AccountId, Balance>>),
	/// Referendum finished with rejection. Submission deposit is held.
	Rejected(Moment, Option<Deposit<AccountId, Balance>>, Option<Deposit<AccountId, Balance>>),
	/// Referendum finished with cancellation. Submission deposit is held.
	Cancelled(Moment, Option<Deposit<AccountId, Balance>>, Option<Deposit<AccountId, Balance>>),
	/// Referendum finished and was never decided. Submission deposit is held.
	TimedOut(Moment, Option<Deposit<AccountId, Balance>>, Option<Deposit<AccountId, Balance>>),
	/// Referendum finished with a kill.
	Killed(Moment),
}

impl<
		TrackId: Eq + PartialEq + Debug + Encode + Decode + TypeInfo + Clone,
		RuntimeOrigin: Eq + PartialEq + Debug + Encode + Decode + TypeInfo + Clone,
		Moment: Parameter + Eq + PartialEq + Debug + Encode + Decode + TypeInfo + Clone + EncodeLike,
		Call: Eq + PartialEq + Debug + Encode + Decode + TypeInfo + Clone,
		Balance: Eq + PartialEq + Debug + Encode + Decode + TypeInfo + Clone,
		Tally: Eq + PartialEq + Debug + Encode + Decode + TypeInfo + Clone,
		AccountId: Eq + PartialEq + Debug + Encode + Decode + TypeInfo + Clone,
		ScheduleAddress: Eq + PartialEq + Debug + Encode + Decode + TypeInfo + Clone,
	> ReferendumInfo<TrackId, RuntimeOrigin, Moment, Call, Balance, Tally, AccountId, ScheduleAddress>
{
	/// Take the Decision Deposit from `self`, if there is one. Returns an `Err` if `self` is not
	/// in a valid state for the Decision Deposit to be refunded.
	pub fn take_decision_deposit(&mut self) -> Result<Option<Deposit<AccountId, Balance>>, ()> {
		use ReferendumInfo::*;
		match self {
			Ongoing(x) if x.decision_deposit.is_none() => Ok(None),
			// Cannot refund deposit if Ongoing as this breaks assumptions.
			Ongoing(_) => Err(()),
			Approved(_, _, d) | Rejected(_, _, d) | TimedOut(_, _, d) | Cancelled(_, _, d) =>
				Ok(d.take()),
			Killed(_) => Ok(None),
		}
	}

	/// Take the Submission Deposit from `self`, if there is one and it's in a valid state to be
	/// taken. Returns an `Err` if `self` is not in a valid state for the Submission Deposit to be
	/// refunded.
	pub fn take_submission_deposit(&mut self) -> Result<Option<Deposit<AccountId, Balance>>, ()> {
		use ReferendumInfo::*;
		match self {
			// Can only refund deposit if it's appoved or cancelled.
			Approved(_, s, _) | Cancelled(_, s, _) => Ok(s.take()),
			// Cannot refund deposit if Ongoing as this breaks assumptions.
			Ongoing(..) | Rejected(..) | TimedOut(..) | Killed(..) => Err(()),
		}
	}
}

/// Type for describing a curve over the 2-dimensional space of axes between 0-1, as represented
/// by `(Perbill, Perbill)`.
#[derive(Clone, Eq, PartialEq, Encode, Decode, TypeInfo, MaxEncodedLen)]
#[cfg_attr(not(feature = "std"), derive(RuntimeDebug))]
pub enum Curve {
	/// Linear curve starting at `(0, ceil)`, proceeding linearly to `(length, floor)`, then
	/// remaining at `floor` until the end of the period.
	LinearDecreasing { length: Perbill, floor: Perbill, ceil: Perbill },
	/// Stepped curve, beginning at `(0, begin)`, then remaining constant for `period`, at which
	/// point it steps down to `(period, begin - step)`. It then remains constant for another
	/// `period` before stepping down to `(period * 2, begin - step * 2)`. This pattern continues
	/// but the `y` component has a lower limit of `end`.
	SteppedDecreasing { begin: Perbill, end: Perbill, step: Perbill, period: Perbill },
	/// A recipocal (`K/(x+S)-T`) curve: `factor` is `K` and `x_offset` is `S`, `y_offset` is `T`.
	Reciprocal { factor: FixedI64, x_offset: FixedI64, y_offset: FixedI64 },
}

/// Calculate the quadratic solution for the given curve.
///
/// WARNING: This is a `const` function designed for convenient use at build time and
/// will panic on overflow. Ensure that any inputs are sensible.
const fn pos_quad_solution(a: FixedI64, b: FixedI64, c: FixedI64) -> FixedI64 {
	const TWO: FixedI64 = FixedI64::from_u32(2);
	const FOUR: FixedI64 = FixedI64::from_u32(4);
	b.neg().add(b.mul(b).sub(FOUR.mul(a).mul(c)).sqrt()).div(TWO.mul(a))
}

impl Curve {
	/// Create a `Curve::Linear` instance from a high-level description.
	///
	/// WARNING: This is a `const` function designed for convenient use at build time and
	/// will panic on overflow. Ensure that any inputs are sensible.
	pub const fn make_linear(length: u128, period: u128, floor: FixedI64, ceil: FixedI64) -> Curve {
		let length = FixedI64::from_rational(length, period).into_perbill();
		let floor = floor.into_perbill();
		let ceil = ceil.into_perbill();
		Curve::LinearDecreasing { length, floor, ceil }
	}

	/// Create a `Curve::Reciprocal` instance from a high-level description.
	///
	/// WARNING: This is a `const` function designed for convenient use at build time and
	/// will panic on overflow. Ensure that any inputs are sensible.
	pub const fn make_reciprocal(
		delay: u128,
		period: u128,
		level: FixedI64,
		floor: FixedI64,
		ceil: FixedI64,
	) -> Curve {
		let delay = FixedI64::from_rational(delay, period).into_perbill();
		let mut bounds = (
			(
				FixedI64::from_u32(0),
				Self::reciprocal_from_parts(FixedI64::from_u32(0), floor, ceil),
				FixedI64::from_inner(i64::max_value()),
			),
			(
				FixedI64::from_u32(1),
				Self::reciprocal_from_parts(FixedI64::from_u32(1), floor, ceil),
				FixedI64::from_inner(i64::max_value()),
			),
		);
		const TWO: FixedI64 = FixedI64::from_u32(2);
		while (bounds.1).0.sub((bounds.0).0).into_inner() > 1 {
			let factor = (bounds.0).0.add((bounds.1).0).div(TWO);
			let curve = Self::reciprocal_from_parts(factor, floor, ceil);
			let curve_level = FixedI64::from_perbill(curve.const_threshold(delay));
			if curve_level.into_inner() > level.into_inner() {
				bounds = (bounds.0, (factor, curve, curve_level.sub(level)));
			} else {
				bounds = ((factor, curve, level.sub(curve_level)), bounds.1);
			}
		}
		if (bounds.0).2.into_inner() < (bounds.1).2.into_inner() {
			(bounds.0).1
		} else {
			(bounds.1).1
		}
	}

	/// Create a `Curve::Reciprocal` instance from basic parameters.
	///
	/// WARNING: This is a `const` function designed for convenient use at build time and
	/// will panic on overflow. Ensure that any inputs are sensible.
	const fn reciprocal_from_parts(factor: FixedI64, floor: FixedI64, ceil: FixedI64) -> Self {
		let delta = ceil.sub(floor);
		let x_offset = pos_quad_solution(delta, delta, factor.neg());
		let y_offset = floor.sub(factor.div(FixedI64::from_u32(1).add(x_offset)));
		Curve::Reciprocal { factor, x_offset, y_offset }
	}

	/// Print some info on the curve.
	#[cfg(feature = "std")]
	pub fn info(&self, days: u32, name: impl std::fmt::Display) -> Result<(), Box<dyn Error>> {
		let mut wtr = csv::Writer::from_path(name.to_string())?;
		wtr.write_record(&["Time", "Threshold"])?;

		let hours = days * 24;
		println!("Curve {} := {:?}:", name, self);
		println!("   t + 0h:   {:?}", self.threshold(Perbill::zero()));
		wtr.serialize((0,self.threshold(Perbill::zero())))?;
		for n in 1..673 {
			println!("   t + {}h:   {:?}", n, self.threshold(Perbill::from_rational(n, hours)));
			wtr.serialize((n,self.threshold(Perbill::from_rational(n, hours))))?;
		}
		wtr.flush();
		Ok(())
		
	}

	/// Determine the `y` value for the given `x` value.
	pub fn threshold(&self, x: Perbill) -> Perbill {
		match self {
			Self::LinearDecreasing { length, floor, ceil } =>
				*ceil - (x.min(*length).saturating_div(*length, Down) * (*ceil - *floor)),
			Self::SteppedDecreasing { begin, end, step, period } =>
				(*begin - (step.int_mul(x.int_div(*period))).min(*begin)).max(*end),
			Self::Reciprocal { factor, x_offset, y_offset } => factor
				.checked_rounding_div(FixedI64::from(x) + *x_offset, Low)
				.map(|yp| (yp + *y_offset).into_clamped_perthing())
				.unwrap_or_else(Perbill::one),
		}
	}

	/// Determine the `y` value for the given `x` value.
	///
	/// This is a partial implementation designed only for use in const functions.
	const fn const_threshold(&self, x: Perbill) -> Perbill {
		match self {
			Self::Reciprocal { factor, x_offset, y_offset } => {
				match factor.checked_rounding_div(FixedI64::from_perbill(x).add(*x_offset), Low) {
					Some(yp) => (yp.add(*y_offset)).into_perbill(),
					None => Perbill::one(),
				}
			},
			_ => panic!("const_threshold cannot be used on this curve"),
		}
	}

	/// Determine the smallest `x` value such that `passing` returns `true` when passed along with
	/// the given `y` value.
	///
	/// If `passing` never returns `true` for any value of `x` when paired with `y`, then
	/// `Perbill::one` may be returned.
	///
	/// ```nocompile
	/// let c = Curve::LinearDecreasing { begin: Perbill::one(), delta: Perbill::one() };
	/// //      ^^^ Can be any curve.
	/// let y = Perbill::from_percent(50);
	/// //      ^^^ Can be any value.
	/// let x = c.delay(y);
	/// assert!(c.passing(x, y));
	/// ```
	pub fn delay(&self, y: Perbill) -> Perbill {
		match self {
			Self::LinearDecreasing { length, floor, ceil } =>
				if y < *floor {
					Perbill::one()
				} else if y > *ceil {
					Perbill::zero()
				} else {
					(*ceil - y).saturating_div(*ceil - *floor, Up).saturating_mul(*length)
				},
			Self::SteppedDecreasing { begin, end, step, period } =>
				if y < *end {
					Perbill::one()
				} else {
					period.int_mul((*begin - y.min(*begin) + step.less_epsilon()).int_div(*step))
				},
			Self::Reciprocal { factor, x_offset, y_offset } => {
				let y = FixedI64::from(y);
				let maybe_term = factor.checked_rounding_div(y - *y_offset, High);
				maybe_term
					.and_then(|term| (term - *x_offset).try_into_perthing().ok())
					.unwrap_or_else(Perbill::one)
			},
		}
	}

	/// Return `true` iff the `y` value is greater than the curve at the `x`.
	pub fn passing(&self, x: Perbill, y: Perbill) -> bool {
		y >= self.threshold(x)
	}
}

#[cfg(feature = "std")]
impl Debug for Curve {
	fn fmt(&self, f: &mut sp_std::fmt::Formatter<'_>) -> sp_std::fmt::Result {
		match self {
			Self::LinearDecreasing { length, floor, ceil } => {
				write!(
					f,
					"Linear[(0%, {:?}) -> ({:?}, {:?}) -> (100%, {:?})]",
					ceil, length, floor, floor,
				)
			},
			Self::SteppedDecreasing { begin, end, step, period } => {
				write!(
					f,
					"Stepped[(0%, {:?}) -> (100%, {:?}) by ({:?}, {:?})]",
					begin, end, period, step,
				)
			},
			Self::Reciprocal { factor, x_offset, y_offset } => {
				write!(
					f,
					"Reciprocal[factor of {:?}, x_offset of {:?}, y_offset of {:?}]",
					factor, x_offset, y_offset,
				)
			},
		}
	}
}

#[cfg(test)]
mod tests {
	use super::*;
	use frame_support::traits::ConstU32;
	use sp_runtime::PerThing;

	const fn percent(x: u128) -> FixedI64 {
		FixedI64::from_rational(x, 100)
	}
	const APP_ROOT: Curve = Curve::make_reciprocal(4, 28, percent(80), percent(50), percent(100));
	const SUP_ROOT: Curve = Curve::make_linear(28, 28, percent(0), percent(50));
	const APP_STAKING_ADMIN: Curve = Curve::make_linear(17, 28, percent(50), percent(100));
	const SUP_STAKING_ADMIN: Curve =
		Curve::make_reciprocal(12, 28, percent(1), percent(0), percent(50));
	const APP_TREASURER: Curve = Curve::make_reciprocal(4, 28, percent(80), percent(50), percent(100));
	const SUP_TREASURER: Curve = Curve::make_linear(28, 28, percent(0), percent(50));
	const APP_FELLOWSHIP_ADMIN: Curve = Curve::make_linear(17, 28, percent(50), percent(100));
	const SUP_FELLOWSHIP_ADMIN: Curve =
		Curve::make_reciprocal(12, 28, percent(1), percent(0), percent(50));
	const APP_GENERAL_ADMIN: Curve =
		Curve::make_reciprocal(4, 28, percent(80), percent(50), percent(100));
	const SUP_GENERAL_ADMIN: Curve =
		Curve::make_reciprocal(7, 28, percent(10), percent(0), percent(50));
	const APP_AUCTION_ADMIN: Curve =
		Curve::make_reciprocal(4, 28, percent(80), percent(50), percent(100));
	const SUP_AUCTION_ADMIN: Curve =
		Curve::make_reciprocal(7, 28, percent(10), percent(0), percent(50));
	const APP_LEASE_ADMIN: Curve = Curve::make_linear(17, 28, percent(50), percent(100));
	const SUP_LEASE_ADMIN: Curve = Curve::make_reciprocal(12, 28, percent(1), percent(0), percent(50));
	const APP_REFERENDUM_CANCELLER: Curve = Curve::make_linear(17, 28, percent(50), percent(100));
	const SUP_REFERENDUM_CANCELLER: Curve =
		Curve::make_reciprocal(12, 28, percent(1), percent(0), percent(50));
	const APP_REFERENDUM_KILLER: Curve = Curve::make_linear(17, 28, percent(50), percent(100));
	const SUP_REFERENDUM_KILLER: Curve =
		Curve::make_reciprocal(12, 28, percent(1), percent(0), percent(50));
	const APP_SMALL_TIPPER: Curve = Curve::make_linear(10, 28, percent(50), percent(100));
	const SUP_SMALL_TIPPER: Curve = Curve::make_reciprocal(1, 28, percent(4), percent(0), percent(50));
	const APP_BIG_TIPPER: Curve = Curve::make_linear(10, 28, percent(50), percent(100));
	const SUP_BIG_TIPPER: Curve = Curve::make_reciprocal(8, 28, percent(1), percent(0), percent(50));
	const APP_SMALL_SPENDER: Curve = Curve::make_linear(17, 28, percent(50), percent(100));
	const SUP_SMALL_SPENDER: Curve =
		Curve::make_reciprocal(12, 28, percent(1), percent(0), percent(50));
	const APP_MEDIUM_SPENDER: Curve = Curve::make_linear(23, 28, percent(50), percent(100));
	const SUP_MEDIUM_SPENDER: Curve =
		Curve::make_reciprocal(16, 28, percent(1), percent(0), percent(50));
	const APP_BIG_SPENDER: Curve = Curve::make_linear(28, 28, percent(50), percent(100));
	const SUP_BIG_SPENDER: Curve = Curve::make_reciprocal(20, 28, percent(1), percent(0), percent(50));
	const APP_WHITELISTED_CALLER: Curve =
		Curve::make_reciprocal(16, 28 * 24, percent(96), percent(50), percent(100));
	const SUP_WHITELISTED_CALLER: Curve =
		Curve::make_reciprocal(1, 28, percent(20), percent(5), percent(50));
	
	// TODO: ceil for linear.

	#[test]
	#[should_panic]
	fn check_curves() {
		APP_ROOT.info(28u32, "Root Approval");
		SUP_ROOT.info(28u32, "Root Support");
		APP_STAKING_ADMIN.info(28u32, "Staking Approval");
		SUP_STAKING_ADMIN.info(28u32, "Staking Support");
		APP_TREASURER.info(28u32, "Treasurer Approval");
		SUP_TREASURER.info(28u32, "Treasurer Support");
		APP_FELLOWSHIP_ADMIN.info(28u32, "Fellowship Approval");
		SUP_FELLOWSHIP_ADMIN.info(28u32, "Fellowship Support");
		APP_GENERAL_ADMIN.info(28u32, "Admin Approval");
		SUP_GENERAL_ADMIN.info(28u32, "Admin Support");
		APP_AUCTION_ADMIN.info(28u32, "Auction Approval");
		SUP_AUCTION_ADMIN.info(28u32, "Auction Support");
		APP_LEASE_ADMIN.info(28u32, "Lease Approval");
		SUP_LEASE_ADMIN.info(28u32, "Lease Support");
		APP_REFERENDUM_CANCELLER.info(28u32, "Referendum Canceller Approval");
		SUP_REFERENDUM_CANCELLER.info(28u32, "Referendum Canceller Support");
		APP_REFERENDUM_KILLER.info(28u32, "Referendum Killer Approval");
		SUP_REFERENDUM_KILLER.info(28u32, "Referendum Killer Support");
		APP_SMALL_TIPPER.info(28u32, "Small Tipper Approval");
		SUP_SMALL_TIPPER.info(28u32, "Small Tipper Support");
		APP_BIG_TIPPER.info(28u32, "Big Tipper Approval");
		SUP_BIG_TIPPER.info(28u32, "Big Tipper Support");
		APP_SMALL_SPENDER.info(28u32, "Small Spender Approval");
		SUP_SMALL_SPENDER.info(28u32, "Small Spender Support");
		APP_MEDIUM_SPENDER.info(28u32, "Medium Spender Approval");
		SUP_MEDIUM_SPENDER.info(28u32, "Medium Spender Support");
		APP_BIG_SPENDER.info(28u32, "Big Spender Approval");
		SUP_BIG_SPENDER.info(28u32, "Big Spender Support");
		APP_WHITELISTED_CALLER.info(28u32, "Whitelist Approval");
		SUP_WHITELISTED_CALLER.info(28u32, "Whitelist Support");

		assert!(false);
	}

	#[test]
	fn insert_sorted_works() {
		let mut b: BoundedVec<u32, ConstU32<6>> = vec![20, 30, 40].try_into().unwrap();
		assert!(b.insert_sorted_by_key(10, |&x| x));
		assert_eq!(&b[..], &[10, 20, 30, 40][..]);

		assert!(b.insert_sorted_by_key(60, |&x| x));
		assert_eq!(&b[..], &[10, 20, 30, 40, 60][..]);

		assert!(b.insert_sorted_by_key(50, |&x| x));
		assert_eq!(&b[..], &[10, 20, 30, 40, 50, 60][..]);

		assert!(!b.insert_sorted_by_key(9, |&x| x));
		assert_eq!(&b[..], &[10, 20, 30, 40, 50, 60][..]);

		assert!(b.insert_sorted_by_key(11, |&x| x));
		assert_eq!(&b[..], &[11, 20, 30, 40, 50, 60][..]);

		assert!(b.insert_sorted_by_key(21, |&x| x));
		assert_eq!(&b[..], &[20, 21, 30, 40, 50, 60][..]);

		assert!(b.insert_sorted_by_key(61, |&x| x));
		assert_eq!(&b[..], &[21, 30, 40, 50, 60, 61][..]);

		assert!(b.insert_sorted_by_key(51, |&x| x));
		assert_eq!(&b[..], &[30, 40, 50, 51, 60, 61][..]);
	}

	#[test]
	fn translated_reciprocal_works() {
		let c: Curve = Curve::Reciprocal {
			factor: FixedI64::from_float(0.03125),
			x_offset: FixedI64::from_float(0.0363306838226),
			y_offset: FixedI64::from_float(0.139845532427),
		};
		c.info(28u32, "Test");

		for i in 0..9_696_969u32 {
			let query = Perbill::from_rational(i, 9_696_969);
			// Determine the nearest point in time when the query will be above threshold.
			let delay_needed = c.delay(query);
			// Ensure that it actually does pass at that time, or that it will never pass.
			assert!(delay_needed.is_one() || c.passing(delay_needed, query));
		}
	}

	#[test]
	fn stepped_decreasing_works() {
		fn pc(x: u32) -> Perbill {
			Perbill::from_percent(x)
		}

		let c =
			Curve::SteppedDecreasing { begin: pc(80), end: pc(30), step: pc(10), period: pc(15) };

		for i in 0..9_696_969u32 {
			let query = Perbill::from_rational(i, 9_696_969);
			// Determine the nearest point in time when the query will be above threshold.
			let delay_needed = c.delay(query);
			// Ensure that it actually does pass at that time, or that it will never pass.
			assert!(delay_needed.is_one() || c.passing(delay_needed, query));
		}

		assert_eq!(c.threshold(pc(0)), pc(80));
		assert_eq!(c.threshold(pc(15).less_epsilon()), pc(80));
		assert_eq!(c.threshold(pc(15)), pc(70));
		assert_eq!(c.threshold(pc(30).less_epsilon()), pc(70));
		assert_eq!(c.threshold(pc(30)), pc(60));
		assert_eq!(c.threshold(pc(45).less_epsilon()), pc(60));
		assert_eq!(c.threshold(pc(45)), pc(50));
		assert_eq!(c.threshold(pc(60).less_epsilon()), pc(50));
		assert_eq!(c.threshold(pc(60)), pc(40));
		assert_eq!(c.threshold(pc(75).less_epsilon()), pc(40));
		assert_eq!(c.threshold(pc(75)), pc(30));
		assert_eq!(c.threshold(pc(100)), pc(30));

		assert_eq!(c.delay(pc(100)), pc(0));
		assert_eq!(c.delay(pc(80)), pc(0));
		assert_eq!(c.delay(pc(80).less_epsilon()), pc(15));
		assert_eq!(c.delay(pc(70)), pc(15));
		assert_eq!(c.delay(pc(70).less_epsilon()), pc(30));
		assert_eq!(c.delay(pc(60)), pc(30));
		assert_eq!(c.delay(pc(60).less_epsilon()), pc(45));
		assert_eq!(c.delay(pc(50)), pc(45));
		assert_eq!(c.delay(pc(50).less_epsilon()), pc(60));
		assert_eq!(c.delay(pc(40)), pc(60));
		assert_eq!(c.delay(pc(40).less_epsilon()), pc(75));
		assert_eq!(c.delay(pc(30)), pc(75));
		assert_eq!(c.delay(pc(30).less_epsilon()), pc(100));
		assert_eq!(c.delay(pc(0)), pc(100));
	}
}
