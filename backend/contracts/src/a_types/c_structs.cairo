%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.alloc import alloc

# We are able to group a bunch of felts together to form a struct. Structs are
# similar to class in the OOP world minus the ability to have methods.
# It is a nice convenient way to group a bunch of related information together
# eg. :
# struct UserScore {
#   username: felt,
#   score: felt
# }
# Here we see that the username and scores are related info and hence we bunch them together
# to form a simple entity

# https://www.cairo-lang.org/docs/reference/syntax.html#syntax-structs

struct MyFirstStruct:
    member name: felt
    member age: felt
    member items_len: felt
    member items: felt*
end

# note external/view functions cannot return Struct with pointers
func my_first_struct{syscall_ptr: felt* , range_check_ptr, pedersen_ptr: HashBuiltin*}(
    name: felt,
    age:felt,
    items_len: felt,
    items: felt*
) -> (res: MyFirstStruct):

    ### declare your struct so that it contains the information passed in from the params
    let my_first_struct = MyFirstStruct(name=name, age=age, items_len=items_len, items=items)

    return (res=my_first_struct)
end

@external
func read_struct{syscall_ptr: felt* , range_check_ptr, pedersen_ptr: HashBuiltin*}():
    ### now that you have created your struct, how would you read from its member?
    let (arr) = alloc()
    assert arr[0] = 1
    assert arr[1] = 3

    let (my_struct) = my_first_struct(name=1, age=1, items_len = 2, items=arr)

    ### uncomment and modify assert statments here
    assert my_struct.name = 1
    assert my_struct.age = 1
    assert my_struct.items_len = 2
    assert my_struct.items[1] = 3

    return ()

end

@view
func test_init_struct{syscall_ptr:felt*, range_check_ptr, pedersen_ptr: HashBuiltin*}():
    let (arr) = alloc()
    assert arr[0] = 1
    assert arr[1] = 2
    assert arr[2] = 3
    assert arr[3] = 4

    let arr_len = 4

    let (my_struct) = my_first_struct(name=1, age=1, items_len=arr_len, items=arr)

    assert my_struct.name = 1
    assert my_struct.age = 1
    assert my_struct.items[2] = 3 
    assert my_struct.items_len = 4

    return ()
end