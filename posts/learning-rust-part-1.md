---
title: "Learning Rust the Hard Way: Part 1"
subtitle: "Recreating the touch Linux Command"
blurb: 
 I'm trying to break into the industry, and I think knowing the memory-safe programming language Rust will
 set me apart from my peers. Let's begin this journey.
tags: rust
---
# Learning Rust the Hard Way, Part 1 - Recreating the touch Linux Command

Let's jump right in.

Rust is 
- memory-safe
- general purpose 
- notoriously strict (or safe, whatever you want to call it)

The whole point is to make durable programs and catch mistakes before
they're compiled. It's pretty nifty. My first forays into C were filled with leaks, so this part hits home.

## The ```touch``` Command
The ```touch``` command simple creates a file or updates the "Last Modified" timestamp in the file's metadata. It's an easy command that gets a lot of use. In fact, I find myself missing it when using Windows systems, so let's recreate it.

One important thing to note is that we are skipping the updating of metadata in this version of the program. So, if you `touch` a file that already exists, we're just going to crash the program. That functionality will come later.


## Getting Arguments
The normal `touch` command takes one argument: the file to be created.


```rust
use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();
    let args_container_length = args.len() as i32;
```

First, we grab the arguments using the cool, built-in method for collecting arguments in a Vector. That's this line here:

```rust 
let args: Vec<String> = env::args().collect(); 
```

Afterwards, we store the length. Typically, lengths are the datatype `usize`, and Rust has a strict type checking system,
so we'll cast the length is a 32-bit signed int for input validation later.

## Validating Input
We want to make sure that the user only puts in one argument. We can do this by comparing the length of `args` vector to our desired number of arguments.

One thing to note is that one argument is always passed when running a program, which is the file path of the program itself.

 This means that, while we want one argument when using our new `touch` command, we will need to check for the `args` vector to have a length of 2: 
- the file path that is always passed in
- the file path that user provides.

We'll accomplish this by using the Ordering library in the standard library.

```rust
use std::env;
use std::cmp::Ordering;

    -snip-

    // Validating input
    match 2.cmp(&args_container_length) {
        Ordering::Less => panic!("Too many arguments. Correct Usage: touch test.txt"),
        Ordering::Greater => panic!("Too Few Arguments. Correct Usage: touch test.txt"),
        Ordering::Equal => (),
    }
```

We do a match statement, comparing the results of comparing 2 against the `args` vector. If the number of arguments is too low or too great, we use the `panic!` macro to crash the program and give the user a simple error message.

## Storing the Target File Path for Easier Use
Now, we have our input validated and ready to move on to the actual functionality. We'll store our target file path in a variable for easier use.

```rust
let target = &args[1];
```

We set the `target` variable to the value located at the 2nd position in the args vector, which should be our file path to be created.

## Checking if the File Already Exists
Remember, we are skipping the functionality of `touch` that updates the file's "Last Updated" piece of metadata, so we need to check if the file already exists.

We can use the built-in Path library to do this. It's simple and elegant.

```rust
use std::env;
use std::path::Path;
use std::cmp::Ordering;

    -snip-

// Checks if a file already exists.
    if Path::new(target).exists(){
        panic!("File Already Exists.")
    }
```

Create a new path using the `target` variable that we created earlier, and call the `exists()` function. This function returns a boolean, which, if it's true, we should `panic!` and crash the program.

## Creating the File
This part is a continuation on the `if` statement we created above. If we find that the file does *not* exist, let's move onto creating the file.

```rust
use std::env;
use std::path::Path;
use std::fs::File;
use std::cmp::Ordering;

    -snip-

    else{
            match File::create(target) {
                Ok(_file) => return,
                Err(e) => panic!("Could not create file. Error: {e:?}"),
            }
        }
```

We call the `create()` function from the File library, which returns a `Results` object that we need to deal with. We use a match statement to do this.

If the `Result` object returns `Ok`, we just exit the program with `return`. If there was an error for some reason, call `panic!` and print out the error.

## Wrapping Up!
That's it! We have created the most basic functionality of the `touch` command in Rust.

# The Full Code
Here's the entire codebase. It's pretty short, all things considered.

```rust 
use std::env;
use std::path::Path;
use std::fs::File;
use std::cmp::Ordering;

fn main() {
    let args: Vec<String> = env::args().collect();
    let args_container_length = args.len() as i32;

    // Validating input
    match 2.cmp(&args_container_length) {
        Ordering::Less => panic!("Too many arguments. Correct Usage: touch test.txt"),
        Ordering::Greater => panic!("Too Few Arguments. Correct Usage: touch test.txt"),
        Ordering::Equal => (),
    }

    let target = &args[1];

    // Checks if a file already exists.
    if Path::new(target).exists(){
        println!("File Already Exists.")
    }
    else{
        match File::create(target) {
            Ok(_file) => return,
            Err(e) => panic!("Could not create file. Error: {e:?}"),
        }
    }
}
```



