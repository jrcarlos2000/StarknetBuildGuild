%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin

# Everything in cairo is a felt (field element) including strings
# Cairo supports shortstrings https://www.cairo-lang.org/docs/how_cairo_works/consts.html#short-string-literals
# Find out the appropriate string that will make `test_a_str_felt.cairo` pass
@external
func a_string{syscall_ptr:felt*, range_check_ptr, pedersen_ptr: HashBuiltin*}() -> (res: felt):
    ### change this string so that it outputs a felt of 35731471704748879005021009015
    ### use only string. Don't cheat
    return (res='Replace here')
end