%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin

@contract_interface 
namespace IContract:
    func get_simple_storage() -> (res:felt):
    end

    func set_simple_storage(val:felt):
    end

end

const INIT_VALUE = 12345678


@view
func __setup__():
    %{ 
        context.contract_address = deploy_contract("./src/c_contracts/a_storage_and_visibility.cairo", [ids.INIT_VALUE]).contract_address 
    %}
    return ()
end

@view
func test_init_correctly{syscall_ptr:felt*, range_check_ptr, pedersen_ptr: HashBuiltin*}():
    tempvar contract_address
    %{ 
        ids.contract_address = context.contract_address 
    %}

    let (res) = IContract.get_simple_storage(contract_address=contract_address)
    assert res = INIT_VALUE

    return ()
end

@view
func test_set_and_get{syscall_ptr:felt*, range_check_ptr, pedersen_ptr: HashBuiltin*}():
    return ()
end