%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from src.b_operations.b_conditional import fix_this, fix_this2

@view 
func test_fix_this_1{syscall_ptr: felt*, range_check_ptr, pedersen_ptr:HashBuiltin*}():
    let (res) = fix_this(0)
    assert res = 5

    return()
end

@view 
func test_fix_this_2{syscall_ptr: felt*, range_check_ptr, pedersen_ptr:HashBuiltin*}():
    let (res) = fix_this2(2)
    assert res = 10

    return()
end

@view 
func test_fix_this2_1{syscall_ptr: felt*, range_check_ptr, pedersen_ptr:HashBuiltin*}():
    let (res) = fix_this2(0)
    assert res = 5

    return()
end

@view 
func test_fix_this2_2{syscall_ptr: felt*, range_check_ptr, pedersen_ptr:HashBuiltin*}():
    let (res) = fix_this(2)
    assert res = 10

    return()
end