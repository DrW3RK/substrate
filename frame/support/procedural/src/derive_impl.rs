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

//! Implementation of the `derive_impl` attribute macro.

use macro_magic::core::pretty_print;
use proc_macro2::TokenStream as TokenStream2;
use quote::{quote, ToTokens};
use std::collections::HashSet;
use syn::{parse2, parse_quote, Ident, ImplItem, ItemImpl, Path, Result};

fn impl_item_ident(impl_item: &ImplItem) -> Option<Ident> {
	match impl_item {
		ImplItem::Const(item) => Some(item.ident.clone()),
		ImplItem::Method(item) => Some(item.sig.ident.clone()),
		ImplItem::Type(item) => Some(item.ident.clone()),
		_ => None,
	}
}

fn combine_impls(local_impl: ItemImpl, foreign_impl: ItemImpl, foreign_path: Path) -> ItemImpl {
	let existing_local_keys: HashSet<Ident> = local_impl
		.items
		.iter()
		.filter_map(|impl_item| impl_item_ident(impl_item))
		.collect();
	let existing_unsupported_items: HashSet<ImplItem> = local_impl
		.items
		.iter()
		.filter(|impl_item| impl_item_ident(impl_item).is_none())
		.cloned()
		.collect();
	// // TODO: may not be accurate.
	// // source_crate_path = frame_system
	let source_crate_path = foreign_path.segments.first().unwrap().ident.clone();
	let mut final_impl = local_impl;
	final_impl.items.extend(
		foreign_impl
			.items
			.into_iter()
			.filter_map(|item| {
				if let Some(ident) = impl_item_ident(&item) {
					if existing_local_keys.contains(&ident) {
						// do not copy colliding items that have an ident
						None
					} else {
						if matches!(item, ImplItem::Type(_)) {
							// modify and insert uncolliding type items
							let modified_item: ImplItem = parse_quote! {
								type #ident = <#foreign_path as #source_crate_path::pallet::DefaultConfig>::#ident;
							};
							Some(modified_item)
						} else {
							// copy uncolliding non-type items that have an ident
							Some(item)
						}
					}
				} else {
					if existing_unsupported_items.contains(&item) {
						// do not copy colliding items that lack an ident
						None
					} else {
						// copy uncolliding items without an ident verbaitm
						Some(item)
					}
				}
			})
			.collect::<Vec<ImplItem>>(),
	);
	final_impl
}

pub fn derive_impl(
	foreign_path: TokenStream2,
	foreign_tokens: TokenStream2,
	local_tokens: TokenStream2,
) -> Result<TokenStream2> {
	println!("foreign_path: {}\n", foreign_path.to_string());
	println!("foreign_impl:");
	pretty_print(&foreign_tokens);
	println!("\nlocal_impl:");
	pretty_print(&local_tokens);

	let local_impl = parse2::<ItemImpl>(local_tokens)?;
	let foreign_impl = parse2::<ItemImpl>(foreign_tokens)?;
	let foreign_path = parse2::<Path>(foreign_path)?;

	let combined_impl = combine_impls(local_impl, foreign_impl, foreign_path);

	println!("combined_impl:");
	pretty_print(&combined_impl.to_token_stream());

	Ok(quote!(#combined_impl))
}
