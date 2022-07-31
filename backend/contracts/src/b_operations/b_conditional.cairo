%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin

# Again, due to how the low level operation works in Cairo, if statements or function calls
# sometimes suffer from an error 'Reference 'xxx' was revoked'. 
# (https://www.cairo-lang.org/docs/how_cairo_works/consts.html#revoked-references)
# (https://www.cairo-lang.org/docs/how_cairo_works/builtins.html?highlight=revoke%20reference#revoked-implicit-arguments)

@view
func fix_this{syscall_ptr: felt*, range_check_ptr, pedersen_ptr: HashBuiltin*}(
    input: felt
) -> (res: felt):

    tempvar temp 
    if input == 0:
        temp = 1
        ### for this exercise, lets assume that tempvar xx = 5 is absolutely necessary and must not be removed
        ### in our normal programming world, the code absolutely works, but why does it not?
        tempvar xx = 5
    else:
        temp = input

        ### what can we do over here to fix the problem?

        # adding a random ap instruction so that the 'steps' matches in each branch
        tempvar yy = 1
    end



    let output = temp * 5

    return(res=output)
end


### lets improve on our code. what can we do to avoid using the 'workaround' in the previous example
### hint: (https://www.cairo-lang.org/docs/how_cairo_works/consts.html?highlight=local#local-variables) 
@view
func fix_this2{syscall_ptr: felt*, range_check_ptr, pedersen_ptr: HashBuiltin*}(
    input: felt
) -> (res: felt):
    ### what can we do here?
    alloc_locals
    local temp
    if input == 0:
        temp = 1
        ### for this exercise, lets assume that tempvar xx = 5 is necessary
        ### in our normal programming world, the code absolutely work, but why does it not?
        tempvar xx = 5
    else:
        temp = input
    end



    let output = temp * 5

    return(res=output)
end