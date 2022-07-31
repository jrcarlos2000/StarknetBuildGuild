%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from src.b_operations.a_loops import factorial, get_factorial_of_7
from starkware.cairo.common.alloc import alloc

### DELETE THIS!!! this is the test for the answer
@view
func test_factorial{syscall_ptr:felt*, range_check_ptr, pedersen_ptr: HashBuiltin*}():

    let (nums) = alloc()

    assert nums[0] = 1
    assert nums[1] = 2
    assert nums[2] = 3
    assert nums[3] = 4
    assert nums[4] = 5
    assert nums[5] = 6
    assert nums[6] = 7

    let nums_len = 7

    let (res) = factorial(nums_len=nums_len, nums=nums)
    assert res = 5040

    return ()
end

@view
func test_get_factorial_of_7{syscall_ptr:felt*, range_check_ptr, pedersen_ptr: HashBuiltin*}():
    let (res) = get_factorial_of_7()
    assert res = 5040

    return ()
end