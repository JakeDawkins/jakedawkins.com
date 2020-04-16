---
title: Unwrap and Expect in Rust
date: '2020-04-15'
description: 'Explaining how to use unwrap and expect in Rust project to handle Option and Result!'
---

A concept that I quickly came across when learning rust was that of the `Result` and `Option` types. Handling of these types is a bit different from my experience handling types in TypeScript, and I was quickly introduced to two useful functions: `unwrap` and `expect` to make my life a little easier. But before diving into `unwrap` and `expect`, I think it's useful to understand how these two types work to begin with. So hold on for a (not too long) introduction to `Option` and `Result` :)

## Option and Result

`Option` is Rust's way of expressing the lack of a value, similar to JavaScript's idea of `null` or `undefined`. Option tends to work similar to how enums work, but if enums had values _for their values_ (if that wording makes any sense at all). So `Option`s can have one of two values. `Some` or `None`. In other words, they have either `Some`thing in them, or nothing in them. Like a box. Now, `Some`'s value still has a type, it's not a free-for-all, but as for `Option` itself, it's always in one of those two states.

`Result` is similar in concept but built to handle a different case. In JavaScript, errors or failures in functions are generally handled with exception throwing. And if you're lucky, you may even have the forethought to wrap those functions in a `try`/ `catch` block to mitigate any errors that occur in the function call. Well luckily, in Rust, there's a nicer way to handle a function that can either do something successfully or not—the `Result` type. `Result` also exists in one of two states: `Ok` or `Err`. `Ok` is similar to the `Some` type—it wraps another type, while `Err` also wraps an error type that the internals of the function can throw (or return in this case).

But how do we handle these types? What do we do with `Option`s or `Result`s? Well that's where `unwrap` and `expect` come in! But first, let's look at how to use `Option` and `Result` _without_ these helpers:

```rust
fn get_status(username: &str) -> Option<&str> {
  // some user lookup code here...
  if(!user_exists) return None;
  // if user exists, fetch their status and return that...
  Some(found_status)
}

// now let's use that function
let result = get_status("jakedawkins");
match result {
  Some(status) => println!("{}", status),
  None => println!("couldn't find a status for jakedawkins"),
}
```

This simple use case shows a function that looks up a user and returns their status as a string (like looking up a user's most recent GitHub or Twitter status). In this case, I chose to have the function just return nothing if lookup failed, and return the status string if it succeeded. Using `match` we can check for each of those cases and print out the status or a friendly message.

Similarly, we can change this function to (probably more appropriately) use the `Result` type.

```rust
fn get_status(username: &str) -> Result<&str, String> {
  // some user lookup code here...
  if(!user_exists) return Err("couldn't find user!".to_string());
  // if user exists, fetch their status and return that...
  Ok(found_status)
}

// now let's use that function
let result = get_status("jakedawkins");
match result {
  Ok(status) => println!("{}", status),
  Err(e) => println!("{}", e),
}
```

This is really what the Result type was meant to be used for. A function `failed`, and rather than crashing out of the program (more on that in a minute), we can just return the error type with a message, and let the caller handle that. Or we can say everything is `Ok` and return a result wrapped by the `Ok` type.

## Unwrap

Finally, onto the good stuff! Now that we know what `Option`s and `Result`s are and how to handle them, we can look at our friends `unwrap` and `expect`.

Unwrap is for when you demand there be a value to continue running the program. If `Option` doesn't have `Some` value or `Result` contains an `Err`, then you want to crash out of the program entirely (_panic_ in Rust-speak). You _could_ do this using matching, but it's a bit verbose:

```rust
// The second version of the function which returns a `Result`
let status = match get_status("jakedawkins") {
  Ok(s) => s,
  Err(e) => panic!(),
}
```

Here, we're just panicking with no error message. We're just quitting the process and carrying on with our lives when lookup of a user's status fails. Which is fine, but for such a simple workflow, there should be an easier way. And if you've been following along, you can probably guess what it is.

    let status = get_status("jakedawkins").unwrap();

The `unwrap` function does exactly that! `unwrap` knows how to work with `Option` types and `Result` types out of the box. When called on a `Result`, `unwrap` will return the value if there _is_ one (i.e. the Result is `Ok`) and it will panic when there isn't one (an `Err`). Likewise with `Option`s, if the option has `Some` value, it will return that value, but if the value is `None`, it will panic.

The handling of the two types by `unwrap` is very similar with a slight difference. If `Result` returns an `Err`, then `unwrap` will panic with the `Err`'s original error message! But if an `Option` has no value, it will just panic—no helpful message included. That's where `expect` comes in handy!

## Expect

`expect` works _very_ similarly to `unwrap` with the addition of a custom panic message. If you're wanting a more friendly error message from an `Err` or a `None` value, you can use `expect` to get what you're looking for:

```rust
let status = get_status("jakedawkins").expect("status fetching");
```

If `get_status` returned an `Err`, then the program would panic with an error similar to the following:

```rust
thread 'main' panicked at 'status fetching', src/main.rs:5:27
```

We could do all this manually using `match` and `panic` just like we did above, but condensing all that to a single function call makes life a lot easier (and code easier to read).

## Conclusion

`expect` and `unwrap` are fairly simple utility functions to make working with `Option` and `Result` types a little more reasonable, and can prevent needing to write much longer `match` blocks, cleaning up code, allowing for better error handling, all while keeping your programs type-safe and easy to reason about!

Did I explain all this correctly? Did I get it completely wrong? Let me know! I'm new to this all, and am mostly writing for my own education!

Follow along as I learn or reach out to me [@jakedawkins](https://twitter.com/jakedawkins) on twitter!
