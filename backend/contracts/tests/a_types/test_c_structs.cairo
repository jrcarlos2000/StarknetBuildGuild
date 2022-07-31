%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from src.a_types.c_structs import my_first_struct, read_struct
from starkware.cairo.common.alloc import alloc



@view
func test_read_struct{syscall_ptr:felt*, range_check_ptr, pedersen_ptr: HashBuiltin*}():
    read_struct()
    return ()
end