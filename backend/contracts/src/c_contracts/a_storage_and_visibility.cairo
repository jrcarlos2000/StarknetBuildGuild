%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin

# In our previous exercises, we have walked through some of the basic syntaxes and workings
# of Cairo. I know they are boring but now we will build on those concepts that we have learned
# and start writing our smart contract in Cairo! (Finally right)

# In a the previous exercises, all functions are declared to be private (why is that so?)
# How can we change it to make it callable? What are the different types of modifier in Cairo?


### We will be storing a simple value in our variable
### How would we store a felt into our `simple_storage` variable?
### (https://www.cairo-lang.org/docs/hello_starknet/more_features.html#storage-variable-with-multiple-values)


### TODO : ADD STORAGE HERE

### Unlike in Solidity, getter function will not be created automatically.
### Create a function with the name 'get_simple_storage' to read the value of simple storage
### Be mindful on the modifier that we will be using for visibility

@view
func get_simple_storage{syscall_ptr:felt*, range_check_ptr, pedersen_ptr: HashBuiltin*}() -> (res:felt):
    ### Add logic here
    let (res) = simple_storage.read()
    return (res=res)
end

### It doesn't make sense to read a value without actually storing something into it
### Can we implement the logic to store something to `simple_storage`?
### Again, be mindful on the type of modifier that we will be using

@external
func set_simple_storage{syscall_ptr:felt*, range_check_ptr, pedersen_ptr: HashBuiltin*}(
    val:felt
):
    simple_storage.write(val)
    return ()
end

### Normally we will set a value at the time of deployment (By default, felts are 0)
### How can be do that?
### We normally create this function first, but for the sake of this tutorial, we do it at the end

@constructor
func constructor{syscall_ptr:felt*, range_check_ptr, pedersen_ptr: HashBuiltin*}(
    val:felt
):
    simple_storage.write(val)
    return ()
end
