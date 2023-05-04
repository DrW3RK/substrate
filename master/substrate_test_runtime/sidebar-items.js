window.SIDEBAR_ITEMS = {"constant":[["VERSION","Test runtime version."],["WASM_BINARY",""],["WASM_BINARY_BLOATY",""]],"enum":[["AllowedSlots","Types of allowed slots."],["BalancesCall","Contains one variant per dispatchable that can be called by an extrinsic."],["OriginCaller",""],["RuntimeCall",""],["RuntimeEvent",""],["RuntimeFreezeReason","A reason for placing a freeze on funds."],["RuntimeHoldReason","A reason for placing a hold on funds."],["RuntimeLockId","An identifier for each lock placed on funds."],["RuntimeSlashReason","A reason for slashing funds."]],"fn":[["native_version","Native version."],["wasm_binary_logging_disabled_unwrap","Wasm binary unwrapped. If built with `SKIP_WASM_BUILD`, the function panics."],["wasm_binary_unwrap","Wasm binary unwrapped. If built with `SKIP_WASM_BUILD`, the function panics."]],"mod":[["api",""],["currency",""],["extrinsic","Provides utils for building the `Extrinsic` instances used with `substrate-test-runtime`."],["genesismap","Tool for creating the genesis block."],["storage_key_generator","Some tests require the hashed keys of the storage. As the values of hashed keys are not trivial to guess, this small module provides the values of the keys, and the code which is required to generate the keys."],["substrate_test_pallet","substrate-test pallet"],["wasm_binary_logging_disabled",""]],"struct":[["BabeEpochConfiguration","Configuration data used by the BABE consensus engine that may change with epochs."],["BlockHashCount",""],["CheckSubstrateCall",""],["EpochDuration",""],["ExistentialDeposit",""],["GenesisConfig",""],["H256","Fixed-size uninterpreted hash type with 32 bytes (256 bits) size."],["MaxLocks",""],["MaxReserves",""],["PalletInfo","Provides an implementation of `PalletInfo` to provide information about the pallet setup in the runtime."],["Runtime",""],["RuntimeApi",""],["RuntimeApiImpl","Implements all runtime apis for the client side."],["RuntimeBlockLength",""],["RuntimeBlockWeights",""],["RuntimeOrigin","The runtime origin type representing the origin of a call."],["SessionKeys",""],["Slot","Unit type wrapper that represents a slot."],["TransferData","Transfer data extracted from Extrinsic containing `Balances::transfer_allow_death`."],["Version",""]],"trait":[["TestAPI",""]],"type":[["AccountId","An identifier for an account on this system."],["Address","The address format for describing accounts."],["AllPallets","All pallets included in the runtime as a nested tuple of types."],["AllPalletsReversedWithSystemFirst","All pallets included in the runtime as a nested tuple of types in reversed order. With the system pallet first."],["AllPalletsWithSystem","All pallets included in the runtime as a nested tuple of types."],["AllPalletsWithSystemReversed","All pallets included in the runtime as a nested tuple of types in reversed order."],["AllPalletsWithoutSystem","All pallets included in the runtime as a nested tuple of types. Excludes the System pallet."],["AllPalletsWithoutSystemReversed","All pallets included in the runtime as a nested tuple of types in reversed order. Excludes the System pallet."],["AuraId",""],["AuthorityId","A Babe authority identifier. Necessarily equivalent to the schnorrkel public key used in the main Babe module. If that ever changes, then this must, too."],["Babe",""],["BabeConfig",""],["Balance","Balance of an account."],["Balances",""],["BalancesConfig",""],["Block","A test block."],["BlockNumber","The block number type used in this runtime."],["Digest","The digest of a block."],["DigestItem","The item of a block digest."],["Executive",""],["Extrinsic","Unchecked extrinsic type as expected by this runtime."],["Hash","A simple hash type for all our hashing."],["Hashing","The hashing algorithm used."],["Header","A test block’s header."],["Index","Index of a transaction."],["Pair",""],["Signature",""],["SignedExtra","The SignedExtension to the basic transaction logic."],["SignedPayload","The payload being signed in transactions."],["SubstrateTest",""],["SubstrateTestConfig",""],["System",""],["SystemConfig",""]]};