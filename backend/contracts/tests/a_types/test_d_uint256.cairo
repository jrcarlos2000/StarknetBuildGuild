%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.uint256 import Uint256, uint256_add
from src.a_types.d_uint256 import operator_uint256, compare_uint256

@view
func test_add_uint256{syscall_ptr:felt*, range_check_ptr, pedersen_ptr: HashBuiltin*}():
    let (max,a) = operator_uint256()
    # %{
    #     print(f"low: {ids.max.low}")
    #     print(f"high: {ids.max.high}")
    # %}

    assert a.low = 5
    assert a.high = 0

    assert max.low = 340282366920938463463374607431768211452
    assert max.high = 9

    return ()
end

@view 
func test_compare_uint256{syscall_ptr:felt*, range_check_ptr, pedersen_ptr: HashBuiltin*}():
    let(res,a,b) = compare_uint256()
    assert res = 1
    assert a.low = 100
    assert a.high = 0

    assert b.low = 101
    assert b.high = 0

    return ()
end