---
title: "More Testable React Components"
type: "WRITING"
date: "2016-00-00" #idk what this should be
description: "Some simple lessons I learned while refactoring components for unit testing"
---

Testing code is not easy. At least not at first. Learning to test logic for any faults can be a painful process. Especially if you weren't the one to write it.

Luckily, I love the challenge. I enjoy trying to break code down into these chunks and, well... trying to break it. Finding a fault in something I wrote is actually pretty enjoyable to me (unless I find it in production).

Here are some things I've learned in the process that have made my (and hopefully will make your) job a little easier.

**Disclaimer**: Much of what I'm about to write has come as a result of learning the functional programming paradigm, and will reflect that. If you disagree with anything, that's okay too. I'm just here to learn and share my experiences 😃

## Move your logic

This may be a controversial move, but I've found it quite useful. If you take the functions that you inevitably declare inside of your component class and move them outside you unlock the full magical powers of Javascript exports, namely being able to separately export your helper functions and test them in isolation.

so...

```
class Adder extends Component {
  printDate() { ... do some stuff here}
    render(){
      <div>
        {this.printDate()}
      </div>
    }
}
```

becomes...

```
export const printDate = () => { ... do some stuff here}

class Adder extends Component {
  render(){
    <div>
      {printDate()}
    </div>
  }
}
```

## Pass in dependencies as arguments

**Dependency injection is your friend.** [Here's](http://krasimirtsonev.com/blog/article/Dependency-injection-in-JavaScript) a quick description.

But seriously, when testing React components, you may find yourself mocking _a lot_ (at least if you're anything like me).

One way to alleviate this pain (and make your code a little more stable at the same time 😉) is a little thing called dependency injection. Instead of importing something at the top of the file and using it haphazardly all around like a global, try passing it as an argument to a function.

If done right, you can end up with completely deterministic pure functions (which are a dream to test).

Code that looks like...

```
import moment from "moment";

export const isEvenOrOddTime = () => {
  const time = Number(moment().format("ss"));
  if (time % 2 == 0) return "even";
  return "odd";
};
```

suddenly looks like

```
import moment from "moment";

export const isEvenOrOddTime = (dateUtil) => {
  const time = Number(dateUtil().format("ss"));
  if (time % 2 == 0) return "even";
  return "odd";
};
```

This will make testing that function a _lot_ easier. Instead of mocking the entire imported library, you only need to mock the functionality that the function relies on.

It's a small change, but it may just have a huge impact later.

Bonus: it can make swapping out utilities as simple as a one line change later on. 💯💯💯

## Limit dependency on data shape

This one is a bit simpler than the last. In Javascript, you may feel like it's just easiest sometimes to pass in a single object to your functions and parse the object to get the information you need.

Sometimes you need to do that. Others you don't. When you don't _need_ to do it, I encourage you not to.

1.  undefined is not a function
2.  cannot access property x on undefined

These are two errors I'm more than familiar with, and both can be a result of relying on data shape in your functions. Instead of trying to parse complicated objects in your functions, move that logic to the caller. It will make testing your functions _much_ easier. And if it doesn't seem like that's the case now, try coming back to that same code 6 months after you wrote it.

The same ideas apply for React component props. It may seem easy and beautiful to call a component with a single prop containing all the data, but It also may come back to bite you.

As an example, something like this (without checking to make sure the values exist)...

```
const printAuthor = (content) => {
  const author = content.author.firstName;
  const date = content.publishedDate;

  // this would error if no publication 😎
  const publication = content.publication.name;
  return publication
    ? `Written on ${date} by ${author} in ${publication}`
    : `Written on ${date} by ${author}`
}
```

can be as beautiful as

```
const printAuthor = (author, date, publication) => (
  publication
    ? `Written on ${date} by ${author} in ${publication}`
    : `Written on ${date} by ${author}`
)
```

**To be fair**, the logic of parsing these objects must live somewhere, and I'm not suggesting muddying up your `render` functions with these checks (ew). I would instead suggest that you move this logic to a helper function outside your components so you can manually and extensively test this process.

## Break apart logic

It probably won't come as a surprise but long, complicated functions are hard to test. Much of the benefits of pure functions that don't rely on data shape are lost if your function logic is impossible to follow. If you have to write more than a dozen or two tests for a function to test all possible branches of code, it might be wise to split up that function into two (or more).

Some people make recommendations for the max number of lines a function should have. I'm not going to do that here, as each person has their own preference and writing style. Just keep this in mind when designing your logic paths.

## Some caveats...

Not everything here is as simple as it sounds. For example, there is lifecycle logic that may be more difficult to split apart, and other functions rely on `this` being intact that you may have to think twice about.

Like `setState`. Upon first glance, I realized that moving setState outside of the React class would cause some problems, as it needs to be in the scope of a react class to work. In other words, I can't just do:

```
export const doSomeStuff = (setter) => {
  setter({key: "value"});
};

class Adder extends Component {
  componentWillMount() {
    setter(this.setState);
  }

  render(){ ... }
}
```

But what I didn't think about at first was that setState takes another argument: a reducer function that takes a previous state and props and returns the state to set [(more here)](https://facebook.github.io/react/docs/react-component.html#setstate).

So instead of moving the _call_ to setState outside of the component, I could just move the _logic_ like so...

```
export const determineNextState = (prevState, props) =>
  ({ key: "value" });

class Adder extends Component {
  componentWillMount() {
    this.setState(determineNextState);
  }

  render(){ ... }
}
```

That way the _call_ to `this.setState` still has the correct scope, and the logic of the call is testable.

## Conclusion

React is a complicated beast, and testing components is not an exact science. This article leaves out some important notes on testing interaction with components, but I believe applying some of these principles to components could have major impacts on reasonability, stability, and testability of your code. I know it has for mine.
