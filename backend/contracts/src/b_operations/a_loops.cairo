%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.alloc import alloc


# Loops (for, while) are something that we are familiar with in our traditional coding language
# However things doesnt work quite the same in Cairo. The unusualness often leads to
# people agreeing that Cairo is hard to learn.
# Cairo uses a slightly different way of writing loops (https://www.cairo-lang.org/docs/hello_cairo/intro.html#recursion-instead-of-loops)
# The reason why Cairo does this is not to make our lifes difficult, rather it is due to
# how the lower level operations work in Cairo. We will not go through
# the lower level stuff here, perhaps in some future more advance tutorial
@view
func get_factorial_of_7{syscall_ptr: felt*, range_check_ptr, pedersen_ptr: HashBuiltin*}(
) -> (res: felt):

    let (nums) = alloc()

    assert nums[0] = 1
    assert nums[1] = 2
    assert nums[2] = 3
    assert nums[3] = 4
    assert nums[4] = 5
    assert nums[5] = 6
    assert nums[6] = 7

    let nums_len = 7

    ### implement the factorial function herer
    let (res) = factorial(nums_len=nums_len, nums=nums)

    return (res=res)
end
@view
func factorial{syscall_ptr: felt*, range_check_ptr, pedersen_ptr: HashBuiltin*}(
    nums_len:felt, nums:felt*
    ) -> (res: felt):

    ### logic of the factorial function

    if nums_len == 0:
        return (res=0)
    end

    if nums_len == 1:
        return (res=nums[0])
    end

    let (temp) = factorial(nums_len=nums_len-1, nums=&nums[1])

    let res = temp * nums[0]
    return (res=res)
end