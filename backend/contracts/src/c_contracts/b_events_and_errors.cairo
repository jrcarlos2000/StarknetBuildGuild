%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin

# We have seen how we can effectively store the data we want on a smart contract on starknet 
# in the EVM world, we have events that will tell us if a certain action has been performed successfully
# and errors that will notify us if we have made a mistake with our transaction.
# Starknet has the same concept. How would you emit an event or throw an error?
# https://starknet.io/docs/hello_starknet/events.html
# https://starknet.io/docs/hello_starknet/user_auth.html?highlight=error

# we will be modifying the code from our part a 

@storage_var
func simple_storage() -> (val: felt):
end

### Declare event here
### declare an event called 'set' that emits the value of the stored item

@constructor
func constructor{syscall_ptr:felt*, range_check_ptr, pedersen_ptr: HashBuiltin*}(
    val:felt
):
    simple_storage.write(val)
    return ()
end

@view
func get_simple_storage{syscall_ptr:felt*, range_check_ptr, pedersen_ptr: HashBuiltin*}() -> (res:felt):
    let (res) = simple_storage.read()
    return (res=res)
end


@external
func set_simple_storage{syscall_ptr:felt*, range_check_ptr, pedersen_ptr: HashBuiltin*}(
    val:felt
):

    simple_storage.write(val)

    ### add event here to output the val

    return ()
end

### you will need something here to help us

@external
func set_simple_storage_error{syscall_ptr:felt*, range_check_ptr, pedersen_ptr: HashBuiltin*}(
    val:felt
):
    ### for some reason, we want our input value to NOT be 100
    ### output an error message 'Input Val cannot be 100' when the user inputs a value that is 100

    simple_storage.write(val)

    return ()
end