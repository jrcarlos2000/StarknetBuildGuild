%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from src.a_types.a_str_felt import a_string

@external
func test_str{syscall_ptr: felt*, range_check_ptr, pedersen_ptr: HashBuiltin*}():
    let (res) = a_string()
    assert res = 35731471704748879005021009015

    return ()
end