---
title: "Functional Programming Concepts"
type: "WRITING"
date: "2016-00-00" #idk what this should be
---

## What this is

This is a 10,000 foot view of functional programming. It is not a hello world walkthrough, but it is also not a programming systems or math class. It is a plain English overview of some of the simplest concepts in functional programming. If that sounds good to you, keep reading. If you're looking for something more complicated, here's a paper on [lambda calculus](http://www.inf.fu-berlin.de/lehre/WS03/alpi/lambda.pdf).

Disclaimer: I'm secretly writing this to make sure I actually know and can explain these concepts. So don't go betting your job or future on anything I say here. Do your homework 😉.

## Intro

The world of imperative and object-oriented programming is bliss. Unless of course you've written more than a "Hello World" program. Then you're probably aware of things like side effects, and program state. At least when they go wrong.

Functional programming aims to take a very mathematical approach to writing programs. It uses many concise, deliberate, and reusable functions to replace larger, more abstract ones.

This makes code more testable, accurate, and reliable. It's not all fun and games, but I'll withhold the bad news until later as to not scare you off 😎.

## One sentence definition

> Programming using only pure, deterministic functions.

Summarizing an entire programming paradigm in a single sentence doesn't do it much justice though, so I'll break it down into a few main ideas.

## Determinism

Determinism is fun. And pretty easy to understand (in theory). A few key points here:

**What goes in determines what you get out.**

Meaning if you run a function with the same arguments twice, there's no way you'll get two different results.

If you like math, this is just like how 5 + 5 returns 10 every time. No surprises 🙌.

Hint: Functions like these are also called _pure_ functions.

**Functions don't change their input arguments.**

They just give you new things as an output. Functions can do just about anything they want with the arguments. Unless that includes changing them.

Since you loved my previous math: squaring 5 doesn't change the value of 5, it gives you a _new_ value as an output: 25.

**Function side effects don't exist.**

Functions don't access or change anything outside of their scope. Meaning no access to global variables, and no changing state somewhere else (mostly because state doesn't exist). If you need something in a function, you have to pass it in directly.

This is good news though! Because side effects are near impossible to test. And testing is your friend.

## Immutability

Once something is set, you can't change it. Just think about using constants all over the place (and not the Javascript constants that you can change). You can use a variable all you want, but changing it is a no-go. You have to create something new.

The beauty in this is that you can rely on variables. Even if you're writing parallel code that relies on shared memory. No more mutexes or semaphores.

This idea behind why we use immutability makes more sense when you think about it like it's just mathematical expressions. Let's say we have an expression `x = 5`. That makes sense. Some variable `x` has a value of 5. But `x = x + 1` is invalid. If you're evaluating mathematical expressions and you arrive to a result like this, you've done something wrong. In math, the values are _already_ set from the beginning. You're just trying to solve for them. There is no concept of _setting_ variables. `=` is more similar to what we see in programming as `==` or `===`. If we're making a deterministic system for programming, it makes sense to follow this style.

Not being able to change variables also has a really interesting side effect (pun intended) on loops which I'll discuss later.

## Functions as first class citizens

_Javascript developers rejoice_

What does this mean? It means that functions can be variables. If you're not familiar with that, it may take some getting used to. Why? Because those variables can be passed to other functions. Leading us swiftly into...

## Higher-order functions

This is a fun one. Essentially, a higher-order function is a function that takes a function as an argument or returns a new function.

_Okay. So what does that mean?_

Well it's a way of changing a function to be able to do different things. Some common functions that use this idea are map, reduce, and filter.

For the sake of brevity (and keeping away from code), I won't explain this here. Instead I'll just link to [this video](https://www.youtube.com/watch?v=BMUiFMZr7vk) if you want to learn more about this.

## Some implications of all this

**No loops**

Loops normally have some variable that you change and check repeatedly to determine when to stop. If you can't change variables, then you can't loop. So what do you do instead?

**You use recursion**

Or functions calling themselves repeatedly until they don't anymore. The good news is that any algorithm that uses iteration can be rewritten to use recursion.

## Why use it?

I'll keep this short, I promise.

**It's safe(r)**: Since there are no side effects or mutability, you never need to worry about these things changing unexpectedly. This also makes debugging a bit easier.

**It's testable**: Since everything is a pure function, you can easily test all normal, incorrect, edge cases.

**It's concise**: There's often less code (2-10x less some say) because of things like reuse, no state checks, and the short nature of recursive algorithms.

**It's strict**: writing functional programs forces you to think about function contracts. Meaning you have to clearly define what a function expects as arguments and what it returns. Functional languages are also _really_ good at enforcing this.

## Why not use it?

**It's different**: Unless you love mathematical proofs, thinking about functions without things like loops or mutability may take some getting used to.

**Its efficiency**: Memory efficiency, specifically. Calling recursive functions all over the place can lead to stack overflows. Immutability also causes you to initialize new variables quite often, which could get expensive. Some languages have optimizations (e.g. tail-call optimization) to manage these issues, and can make functional code faster than imperative code in some cases.

**Its speed**: Once again, this is a language specific issue, but generally mutation is faster than duplication. Changing an already existing object or structure is usually quicker than duplicating said object and changing what you need to.

## Conclusion

I'm not going to provide an end-all solution or claim everyone should use one paradigm or another here, because there is no cookie cutter solution to these problems. Most large applications can't be possible without side effects, and refactoring code to match one programming paradigm or another is expensive and can lead to introducing new bugs.

However, many of the concepts of functional programming (e.g. pure functions) can be used alongside imperative code. Figuring out how to best use some functional concepts in your development can offer many of the benefits, without a major change.
