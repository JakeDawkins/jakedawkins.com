---
title: "Default Props in React"
type: "WRITING"
date: "2016-00-00" #idk what this should be
---

If you've been around React for any length of time, you're almost certainly aware of proptypes (or the equivalent in whatever type system you're using). I've been aware of these since one of my first tutorials.

I'm not sure why it took me so long to find defaultProps and realize how useful they are, but I'm here to make sure nobody else who reads this misses this little gem.

![holy weird riddles, batman!](https://media.giphy.com/media/1NiMpeyTrYA00/giphy.gif)

## The What

**defaultProps** is a property on a react class. Just like proptypes. It lets you assign (wait for it...) default values to your components' props like so:

```
class ContactCard extends Component {
  ...
  render () { ... }
}

ContactCard.defaultProps = {
  firstName: "",
  lastName: "",
  age: 0,
};
```

![unamused](https://media.giphy.com/media/TlK63EGn8YyRbiI6mBy/giphy.gif)

## The Why

**No more existence checks**

```
if ( this.props.person
  && this.props.person.phones
  && this.props.person.phones.mobile) {
  this.setState({ phone: this.props.person.phones.mobile });
}
```

If you've ever been hurt by code like this or `Uncaught ReferenceErrors` then fear not! Default props can help.

```
ContactCard.defaultProps = {
	person: {
		phones: {
			mobile: "",
		},
	},
};
```

That may look a little verbose, but it allows your conditional check to look like

```
if(this.props.person.phones.mobile !== "") {
  this.setState({ phone: this.props.person.phones.mobile });
}
```

And the best part: if you forget the `if` check, then your code won't fail. It will just set your state to an empty string (which is probably a little better).

![sure](https://media.giphy.com/media/3o6ZtqUX8nlGDD1e9i/giphy.gif)

There is one benefit to the verbosity of default props though...

#### Documentation 👏👏👏👏

![here we go](https://media.giphy.com/media/l0HlSi3AIOM3fAhX2/giphy.gif)

If you've ever tried to figure out what shape of data an undocumented component is looking for, then suffer no longer!

If you were to look at the source for this ContactCard component, it would be obvious very quickly what the component was looking for: a `person` object with a `phones` object with a `mobile` key that requires a `string`. Heck, you could even copy and paste the defaultProps to pass into the component.

## The Ultimatum

So what's your choice? Will you string together conditionals until the keys on your keyboard no longer show letters? Will you meticulously document props until you have been awarded the `czar` title?

Or will you use defaultProps?

![maybe... okay](https://media.giphy.com/media/l0Ex2ZerGEPohkIla/source.gif)
