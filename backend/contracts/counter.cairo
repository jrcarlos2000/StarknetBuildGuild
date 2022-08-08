%lang starknet
from starkware.cairo.common.math import assert_nn
from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.cairo_builtins import HashBuiltin

struct project_base:
    member owner : felt
    member cid : felt
end

@storage_var
func project_count() -> (count : felt):
end

@storage_var
func projecByIndex(index : felt) -> (project : project_base):
end

@storage_var
func balance() -> (res : felt):
end

@constructor
func constructor{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}():
    balance.write(0)
    return ()
end

@external
func increase_balance{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        amount : felt):
    with_attr error_message("Amount must be positive. Got: {amount}."):
        assert_nn(amount)
    end

    let (res) = balance.read()
    balance.write(res + amount)
    return ()
end

@view
func get_balance{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (
        res : felt):
    let (res) = balance.read()
    return (res)
end

@view
func get_all_projects{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (
        res_len : felt, res : project_base*):
    alloc_locals
    let (local curr_count) = project_count.read()
    let (local project_list : project_base*) = alloc()
    _write_to_array(array_len=curr_count,arr=project_list)
    return (curr_count,project_list)
end

func _write_to_array{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(array_len : felt, arr : project_base*):
    if array_len == 0:
        return ()
    end
    let (curr_project) = projecByIndex.read(array_len)
    assert [arr] = curr_project
    _write_to_array(array_len - 1, arr + 2)
    return ()
end
@external
func add_project{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}():
    let (curr_count) = project_count.read()
    let new_count = curr_count + 1
    let project_instance = project_base(
        owner=new_count,
        cid=new_count
    )
    projecByIndex.write(new_count,project_instance)
    project_count.write(new_count)
    return ()
end