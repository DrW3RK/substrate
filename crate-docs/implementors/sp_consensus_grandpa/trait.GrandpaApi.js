(function() {var implementors = {
"kitchensink_runtime":[["impl&lt;__SR_API_BLOCK__:&nbsp;<a class=\"trait\" href=\"sp_runtime/traits/trait.Block.html\" title=\"trait sp_runtime::traits::Block\">BlockT</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.RefUnwindSafe.html\" title=\"trait core::panic::unwind_safe::RefUnwindSafe\">RefUnwindSafe</a>, RuntimeApiImplCall:&nbsp;<a class=\"trait\" href=\"sp_api/trait.CallApiAt.html\" title=\"trait sp_api::CallApiAt\">CallApiAt</a>&lt;__SR_API_BLOCK__&gt; + 'static&gt; <a class=\"trait\" href=\"sp_consensus_grandpa/trait.GrandpaApi.html\" title=\"trait sp_consensus_grandpa::GrandpaApi\">GrandpaApi</a>&lt;__SR_API_BLOCK__&gt; for <a class=\"struct\" href=\"kitchensink_runtime/struct.RuntimeApiImpl.html\" title=\"struct kitchensink_runtime::RuntimeApiImpl\">RuntimeApiImpl</a>&lt;__SR_API_BLOCK__, RuntimeApiImplCall&gt;<span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;RuntimeApiImplCall::<a class=\"associatedtype\" href=\"sp_api/trait.CallApiAt.html#associatedtype.StateBackend\" title=\"type sp_api::CallApiAt::StateBackend\">StateBackend</a>: <a class=\"trait\" href=\"sp_state_machine/backend/trait.Backend.html\" title=\"trait sp_state_machine::backend::Backend\">StateBackend</a>&lt;<a class=\"type\" href=\"sp_runtime/traits/type.HashFor.html\" title=\"type sp_runtime::traits::HashFor\">HashFor</a>&lt;__SR_API_BLOCK__&gt;&gt;,<br>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;'static </a>RuntimeApiImplCall: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"type\" href=\"sp_consensus_grandpa/type.AuthorityList.html\" title=\"type sp_consensus_grandpa::AuthorityList\">AuthorityList</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.RefUnwindSafe.html\" title=\"trait core::panic::unwind_safe::RefUnwindSafe\">RefUnwindSafe</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"type\" href=\"sp_consensus_grandpa/type.SetId.html\" title=\"type sp_consensus_grandpa::SetId\">SetId</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.RefUnwindSafe.html\" title=\"trait core::panic::unwind_safe::RefUnwindSafe\">RefUnwindSafe</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"struct\" href=\"sp_consensus_grandpa/struct.EquivocationProof.html\" title=\"struct sp_consensus_grandpa::EquivocationProof\">EquivocationProof</a>&lt;&lt;__SR_API_BLOCK__ as <a class=\"trait\" href=\"sp_runtime/traits/trait.Block.html\" title=\"trait sp_runtime::traits::Block\">BlockT</a>&gt;::<a class=\"associatedtype\" href=\"sp_runtime/traits/trait.Block.html#associatedtype.Hash\" title=\"type sp_runtime::traits::Block::Hash\">Hash</a>, <a class=\"type\" href=\"sp_runtime/traits/type.NumberFor.html\" title=\"type sp_runtime::traits::NumberFor\">NumberFor</a>&lt;__SR_API_BLOCK__&gt;&gt;: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.RefUnwindSafe.html\" title=\"trait core::panic::unwind_safe::RefUnwindSafe\">RefUnwindSafe</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"struct\" href=\"sp_consensus_grandpa/struct.OpaqueKeyOwnershipProof.html\" title=\"struct sp_consensus_grandpa::OpaqueKeyOwnershipProof\">OpaqueKeyOwnershipProof</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.RefUnwindSafe.html\" title=\"trait core::panic::unwind_safe::RefUnwindSafe\">RefUnwindSafe</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.unit.html\">()</a>&gt;: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.RefUnwindSafe.html\" title=\"trait core::panic::unwind_safe::RefUnwindSafe\">RefUnwindSafe</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"type\" href=\"sp_consensus_grandpa/type.SetId.html\" title=\"type sp_consensus_grandpa::SetId\">SetId</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.RefUnwindSafe.html\" title=\"trait core::panic::unwind_safe::RefUnwindSafe\">RefUnwindSafe</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"type\" href=\"sp_consensus_grandpa/type.AuthorityId.html\" title=\"type sp_consensus_grandpa::AuthorityId\">GrandpaId</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.RefUnwindSafe.html\" title=\"trait core::panic::unwind_safe::RefUnwindSafe\">RefUnwindSafe</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;<a class=\"struct\" href=\"sp_consensus_grandpa/struct.OpaqueKeyOwnershipProof.html\" title=\"struct sp_consensus_grandpa::OpaqueKeyOwnershipProof\">OpaqueKeyOwnershipProof</a>&gt;: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.RefUnwindSafe.html\" title=\"trait core::panic::unwind_safe::RefUnwindSafe\">RefUnwindSafe</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;__SR_API_BLOCK__::<a class=\"associatedtype\" href=\"sp_runtime/traits/trait.Block.html#associatedtype.Header\" title=\"type sp_runtime::traits::Block::Header\">Header</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.RefUnwindSafe.html\" title=\"trait core::panic::unwind_safe::RefUnwindSafe\">RefUnwindSafe</a>,</span>"]],
"node_template_runtime":[["impl&lt;__SR_API_BLOCK__:&nbsp;<a class=\"trait\" href=\"sp_runtime/traits/trait.Block.html\" title=\"trait sp_runtime::traits::Block\">BlockT</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.RefUnwindSafe.html\" title=\"trait core::panic::unwind_safe::RefUnwindSafe\">RefUnwindSafe</a>, RuntimeApiImplCall:&nbsp;<a class=\"trait\" href=\"sp_api/trait.CallApiAt.html\" title=\"trait sp_api::CallApiAt\">CallApiAt</a>&lt;__SR_API_BLOCK__&gt; + 'static&gt; <a class=\"trait\" href=\"sp_consensus_grandpa/trait.GrandpaApi.html\" title=\"trait sp_consensus_grandpa::GrandpaApi\">GrandpaApi</a>&lt;__SR_API_BLOCK__&gt; for <a class=\"struct\" href=\"node_template_runtime/struct.RuntimeApiImpl.html\" title=\"struct node_template_runtime::RuntimeApiImpl\">RuntimeApiImpl</a>&lt;__SR_API_BLOCK__, RuntimeApiImplCall&gt;<span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;RuntimeApiImplCall::<a class=\"associatedtype\" href=\"sp_api/trait.CallApiAt.html#associatedtype.StateBackend\" title=\"type sp_api::CallApiAt::StateBackend\">StateBackend</a>: <a class=\"trait\" href=\"sp_state_machine/backend/trait.Backend.html\" title=\"trait sp_state_machine::backend::Backend\">StateBackend</a>&lt;<a class=\"type\" href=\"sp_runtime/traits/type.HashFor.html\" title=\"type sp_runtime::traits::HashFor\">HashFor</a>&lt;__SR_API_BLOCK__&gt;&gt;,<br>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;'static </a>RuntimeApiImplCall: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"type\" href=\"sp_consensus_grandpa/type.AuthorityList.html\" title=\"type sp_consensus_grandpa::AuthorityList\">AuthorityList</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.RefUnwindSafe.html\" title=\"trait core::panic::unwind_safe::RefUnwindSafe\">RefUnwindSafe</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"type\" href=\"sp_consensus_grandpa/type.SetId.html\" title=\"type sp_consensus_grandpa::SetId\">SetId</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.RefUnwindSafe.html\" title=\"trait core::panic::unwind_safe::RefUnwindSafe\">RefUnwindSafe</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"struct\" href=\"sp_consensus_grandpa/struct.EquivocationProof.html\" title=\"struct sp_consensus_grandpa::EquivocationProof\">EquivocationProof</a>&lt;&lt;__SR_API_BLOCK__ as <a class=\"trait\" href=\"sp_runtime/traits/trait.Block.html\" title=\"trait sp_runtime::traits::Block\">BlockT</a>&gt;::<a class=\"associatedtype\" href=\"sp_runtime/traits/trait.Block.html#associatedtype.Hash\" title=\"type sp_runtime::traits::Block::Hash\">Hash</a>, <a class=\"type\" href=\"sp_runtime/traits/type.NumberFor.html\" title=\"type sp_runtime::traits::NumberFor\">NumberFor</a>&lt;__SR_API_BLOCK__&gt;&gt;: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.RefUnwindSafe.html\" title=\"trait core::panic::unwind_safe::RefUnwindSafe\">RefUnwindSafe</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"struct\" href=\"sp_consensus_grandpa/struct.OpaqueKeyOwnershipProof.html\" title=\"struct sp_consensus_grandpa::OpaqueKeyOwnershipProof\">OpaqueKeyOwnershipProof</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.RefUnwindSafe.html\" title=\"trait core::panic::unwind_safe::RefUnwindSafe\">RefUnwindSafe</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.unit.html\">()</a>&gt;: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.RefUnwindSafe.html\" title=\"trait core::panic::unwind_safe::RefUnwindSafe\">RefUnwindSafe</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"type\" href=\"sp_consensus_grandpa/type.SetId.html\" title=\"type sp_consensus_grandpa::SetId\">SetId</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.RefUnwindSafe.html\" title=\"trait core::panic::unwind_safe::RefUnwindSafe\">RefUnwindSafe</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"type\" href=\"sp_consensus_grandpa/type.AuthorityId.html\" title=\"type sp_consensus_grandpa::AuthorityId\">GrandpaId</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.RefUnwindSafe.html\" title=\"trait core::panic::unwind_safe::RefUnwindSafe\">RefUnwindSafe</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;<a class=\"struct\" href=\"sp_consensus_grandpa/struct.OpaqueKeyOwnershipProof.html\" title=\"struct sp_consensus_grandpa::OpaqueKeyOwnershipProof\">OpaqueKeyOwnershipProof</a>&gt;: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.RefUnwindSafe.html\" title=\"trait core::panic::unwind_safe::RefUnwindSafe\">RefUnwindSafe</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;__SR_API_BLOCK__::<a class=\"associatedtype\" href=\"sp_runtime/traits/trait.Block.html#associatedtype.Header\" title=\"type sp_runtime::traits::Block::Header\">Header</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.RefUnwindSafe.html\" title=\"trait core::panic::unwind_safe::RefUnwindSafe\">RefUnwindSafe</a>,</span>"]],
"substrate_test_runtime":[["impl&lt;__SR_API_BLOCK__:&nbsp;<a class=\"trait\" href=\"sp_runtime/traits/trait.Block.html\" title=\"trait sp_runtime::traits::Block\">BlockT</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.RefUnwindSafe.html\" title=\"trait core::panic::unwind_safe::RefUnwindSafe\">RefUnwindSafe</a>, RuntimeApiImplCall:&nbsp;<a class=\"trait\" href=\"sp_api/trait.CallApiAt.html\" title=\"trait sp_api::CallApiAt\">CallApiAt</a>&lt;__SR_API_BLOCK__&gt; + 'static&gt; <a class=\"trait\" href=\"sp_consensus_grandpa/trait.GrandpaApi.html\" title=\"trait sp_consensus_grandpa::GrandpaApi\">GrandpaApi</a>&lt;__SR_API_BLOCK__&gt; for <a class=\"struct\" href=\"substrate_test_runtime/struct.RuntimeApiImpl.html\" title=\"struct substrate_test_runtime::RuntimeApiImpl\">RuntimeApiImpl</a>&lt;__SR_API_BLOCK__, RuntimeApiImplCall&gt;<span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;RuntimeApiImplCall::<a class=\"associatedtype\" href=\"sp_api/trait.CallApiAt.html#associatedtype.StateBackend\" title=\"type sp_api::CallApiAt::StateBackend\">StateBackend</a>: <a class=\"trait\" href=\"sp_state_machine/backend/trait.Backend.html\" title=\"trait sp_state_machine::backend::Backend\">StateBackend</a>&lt;<a class=\"type\" href=\"sp_runtime/traits/type.HashFor.html\" title=\"type sp_runtime::traits::HashFor\">HashFor</a>&lt;__SR_API_BLOCK__&gt;&gt;,<br>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;'static </a>RuntimeApiImplCall: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"type\" href=\"sp_consensus_grandpa/type.AuthorityList.html\" title=\"type sp_consensus_grandpa::AuthorityList\">AuthorityList</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.RefUnwindSafe.html\" title=\"trait core::panic::unwind_safe::RefUnwindSafe\">RefUnwindSafe</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"type\" href=\"sp_consensus_grandpa/type.SetId.html\" title=\"type sp_consensus_grandpa::SetId\">SetId</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.RefUnwindSafe.html\" title=\"trait core::panic::unwind_safe::RefUnwindSafe\">RefUnwindSafe</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"struct\" href=\"sp_consensus_grandpa/struct.EquivocationProof.html\" title=\"struct sp_consensus_grandpa::EquivocationProof\">EquivocationProof</a>&lt;&lt;__SR_API_BLOCK__ as <a class=\"trait\" href=\"sp_runtime/traits/trait.Block.html\" title=\"trait sp_runtime::traits::Block\">BlockT</a>&gt;::<a class=\"associatedtype\" href=\"sp_runtime/traits/trait.Block.html#associatedtype.Hash\" title=\"type sp_runtime::traits::Block::Hash\">Hash</a>, <a class=\"type\" href=\"sp_runtime/traits/type.NumberFor.html\" title=\"type sp_runtime::traits::NumberFor\">NumberFor</a>&lt;__SR_API_BLOCK__&gt;&gt;: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.RefUnwindSafe.html\" title=\"trait core::panic::unwind_safe::RefUnwindSafe\">RefUnwindSafe</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"struct\" href=\"sp_consensus_grandpa/struct.OpaqueKeyOwnershipProof.html\" title=\"struct sp_consensus_grandpa::OpaqueKeyOwnershipProof\">OpaqueKeyOwnershipProof</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.RefUnwindSafe.html\" title=\"trait core::panic::unwind_safe::RefUnwindSafe\">RefUnwindSafe</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.unit.html\">()</a>&gt;: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.RefUnwindSafe.html\" title=\"trait core::panic::unwind_safe::RefUnwindSafe\">RefUnwindSafe</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"type\" href=\"sp_consensus_grandpa/type.SetId.html\" title=\"type sp_consensus_grandpa::SetId\">SetId</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.RefUnwindSafe.html\" title=\"trait core::panic::unwind_safe::RefUnwindSafe\">RefUnwindSafe</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"type\" href=\"sp_consensus_grandpa/type.AuthorityId.html\" title=\"type sp_consensus_grandpa::AuthorityId\">AuthorityId</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.RefUnwindSafe.html\" title=\"trait core::panic::unwind_safe::RefUnwindSafe\">RefUnwindSafe</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;<a class=\"struct\" href=\"sp_consensus_grandpa/struct.OpaqueKeyOwnershipProof.html\" title=\"struct sp_consensus_grandpa::OpaqueKeyOwnershipProof\">OpaqueKeyOwnershipProof</a>&gt;: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.RefUnwindSafe.html\" title=\"trait core::panic::unwind_safe::RefUnwindSafe\">RefUnwindSafe</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;__SR_API_BLOCK__::<a class=\"associatedtype\" href=\"sp_runtime/traits/trait.Block.html#associatedtype.Header\" title=\"type sp_runtime::traits::Block::Header\">Header</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/panic/unwind_safe/trait.RefUnwindSafe.html\" title=\"trait core::panic::unwind_safe::RefUnwindSafe\">RefUnwindSafe</a>,</span>"]]
};if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()