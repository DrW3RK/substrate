(function() {var implementors = {
"sc_finality_grandpa":[["impl&lt;BE, Block:&nbsp;<a class=\"trait\" href=\"sp_runtime/traits/trait.Block.html\" title=\"trait sp_runtime::traits::Block\">BlockT</a>, Client, SC&gt; <a class=\"trait\" href=\"sc_consensus/block_import/trait.JustificationImport.html\" title=\"trait sc_consensus::block_import::JustificationImport\">JustificationImport</a>&lt;Block&gt; for <a class=\"struct\" href=\"sc_finality_grandpa/struct.GrandpaBlockImport.html\" title=\"struct sc_finality_grandpa::GrandpaBlockImport\">GrandpaBlockImport</a>&lt;BE, Block, Client, SC&gt;<span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"type\" href=\"sp_runtime/traits/type.NumberFor.html\" title=\"type sp_runtime::traits::NumberFor\">NumberFor</a>&lt;Block&gt;: <a class=\"trait\" href=\"sc_finality_grandpa/trait.BlockNumberOps.html\" title=\"trait sc_finality_grandpa::BlockNumberOps\">BlockNumberOps</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;BE: Backend&lt;Block&gt;,<br>&nbsp;&nbsp;&nbsp;&nbsp;Client: <a class=\"trait\" href=\"sc_finality_grandpa/trait.ClientForGrandpa.html\" title=\"trait sc_finality_grandpa::ClientForGrandpa\">ClientForGrandpa</a>&lt;Block, BE&gt;,<br>&nbsp;&nbsp;&nbsp;&nbsp;SC: <a class=\"trait\" href=\"sp_consensus/select_chain/trait.SelectChain.html\" title=\"trait sp_consensus::select_chain::SelectChain\">SelectChain</a>&lt;Block&gt;,</span>"]],
"sc_network_test":[["impl <a class=\"trait\" href=\"sc_consensus/block_import/trait.JustificationImport.html\" title=\"trait sc_consensus::block_import::JustificationImport\">JustificationImport</a>&lt;<a class=\"struct\" href=\"sp_runtime/generic/block/struct.Block.html\" title=\"struct sp_runtime::generic::block::Block\">Block</a>&lt;<a class=\"struct\" href=\"sp_runtime/generic/header/struct.Header.html\" title=\"struct sp_runtime::generic::header::Header\">Header</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.u64.html\">u64</a>, <a class=\"struct\" href=\"sp_runtime/traits/struct.BlakeTwo256.html\" title=\"struct sp_runtime::traits::BlakeTwo256\">BlakeTwo256</a>&gt;, <a class=\"enum\" href=\"sc_network_test/enum.Extrinsic.html\" title=\"enum sc_network_test::Extrinsic\">Extrinsic</a>&gt;&gt; for <a class=\"struct\" href=\"sc_network_test/struct.ForceFinalized.html\" title=\"struct sc_network_test::ForceFinalized\">ForceFinalized</a>"]]
};if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()