%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from src.a_types.b_arrays import array

@external
func test_array{syscall_ptr: felt*, range_check_ptr, pedersen_ptr: HashBuiltin*}():
    let (res_len, res) = array()

    assert res_len = 5
    assert res[0] = 1
    assert res[1] = 2
    assert res[2] = 3
    assert res[3] = 4
    assert res[4] = 5

    return ()
end