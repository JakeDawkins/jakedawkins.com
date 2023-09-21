---
external: false
title: 'Building an Accessible Input with a Floating Label'
description: 'Building an accessible input component with a floating label using React, Tailwind, React Input Mask, and Storybook'
date: 2023-09-20
---

## Introduction

Designers love inputs like the below image; with a label floating over the input
that moves out of the way for text input when a user focuses the input. Of course
they love it, though! [Inputs need labels](https://www.w3.org/WAI/tutorials/forms/labels/),
and labels take up space. Having a label live inside the bounds of an input makes
sense and helps maintain page flow, eliminating yet another item that could
clutter up an otherwise clean UI.

![text inputs in different states, like focused, errored, empty](/images/blog/input-designs.png)

There are a dozen tutorials all over the internet on how to build this style of
input, but I've yet to come across one focusing on the specific set of constraints
that this post will focus on:

1. Accessible first. It must be [perceivable, operable, understandable, and robust](https://www.w3.org/TR/UNDERSTANDING-WCAG20/intro.html#introduction-fourprincs-head)
2. Use Typescript, React, and Tailwind
3. Support error states gracefully

To make it a little more challenging, let's add in a couple more requirements:

1. Support input masks (don't worry, if you don't need this, it's easy to leave off)
2. Placeholders must still work

With these requirements in-place, let's get to work! Or, if you're just looking
for some code to copy/paste, you can jump [straight to the completed source code](#putting-it-all-together).

## Just my type

For the component types, we want this component to act very much like any other
`input`, with a couple additions; `label` and `mask`. Extending `React`'s native
`input` type makes passing along props later that much easier.

```typescript
import { InputHTMLAttributes } from 'react';

type FloatingLabelInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  mask?: string;
};
```

## A little bit of HTML

Next up, we'll set up a basic HTML input and label, all wrapped in a div that
helps us position everything right.

```jsx
function FloatingLabelInput({
  label,
  mask,
  ...inputProps
}: FloatingLabelInputProps) {
  // if there is a passed in id, use that. Otherwise, generate one from the label
  const id =
    inputProps.id ||
    label.toLowerCase().replace(/ /g, '-') +
      '-' +
      Math.random().toString(16).slice(2);
  return (
    <div className="relative flex items-center">
      <label
        // links label to the input
        htmlFor={id}
        className={'absolute text-darkGray ml-4 transition'}
      >
        {label}
      </label>
      <input
        {...inputProps}
        id={id}
        className={
          'px-4 pb-2 pt-6 border border-gray h-[60px] rounded-lg bg-lightestGray' +
          ' ' +
          inputProps.className
        }
      />
    </div>
  );
}
```

Here, we set up a few things:

1. We need an `id` to link the `input` and `label`. If the user passes in an `id` to the component, we'll use that for
   the input. If not, we'll generate one from the text of the label.
2. We then use that `id` in the `label`'s `htmlFor` prop to link the two.
3. Visually, we've centered the `label` inside the `input`

![A basic input with a label inside, in the middle of the input](/images/blog/basic-input.png)

## Moving the label around

There are a few states where we want the label to jump to the top of the input:

1. The input is focused
2. The input has a text value
3. The input has a placeholder

To track these cases, we can use the following:

```jsx
const [isFocused, setIsFocused] = useState(false);
const [isFilled, setIsFilled] = useState(false);

// should the label be raised to the top of the input
const elevateLabel =
  // for controlled inputs
  inputProps?.value?.toString()?.length ||
  // for uncontrolled inputs
  isFilled ||
  inputProps?.placeholder?.length ||
  isFocused;

const onFocus = useCallback(
  (e: any) => {
    setIsFocused(true);
    inputProps?.onFocus?.(e);
  },
  [inputProps],
);
const onBlur = useCallback(
  (e: any) => {
    setIsFocused(false);
    inputProps?.onBlur?.(e);
  },
  [inputProps],
);
const onChange = useCallback(
  (e: any) => {
    setIsFilled(!!e.target.value);
    inputProps?.onChange?.(e);
  },
  [inputProps],
);
```

Whenever `elevateLabel` here is `true`, we'll adjust the styles of the `label`
to push it upwards, to the top of the `input`. We'll also wire up the callbacks
we've just defined.

```jsx
<div className="relative flex items-center">
  <label
    htmlFor={id}
    className={
      'absolute text-darkGray ml-4 transition' +
      (elevateLabel
        ? ' text-[13px] leading-[20px] -translate-y-4 font-bold'
        : '') +
      (isFocused ? ' text-purple' : '')
    }
  >
    {label}
  </label>
  <input
    {...inputProps}
    id={id}
    className={
      'px-4 pb-2 pt-6 border border-gray h-[60px] rounded-lg bg-lightestGray' +
      ' ' +
      inputProps.className
    }
    onFocus={onFocus}
    onBlur={onBlur}
    onChange={onChange}
  />
</div>
```

![Input with a label that moves whenever focused](/images/blog/input-moving.gif)

## Input masking

Input masks are extremely useful when users need to enter a specific formatted
string like credit card numbers, expirations, security codes, and more.
[React Input Mask](https://github.com/sanniassin/react-input-mask) is a library
that does just this, and closely matches the API of a basic `input`, making it an
excellent drop-in replacement for a base `input` when needed.

In our case, we'll use `react-input-mask` whenever a `mask` is passed to our
component, and react's base `input` any other time. We can pull our `input`'s
props out into a memoized object to prevent recalculation as much as possible

```jsx
const inputCompProps = useMemo(
  () => ({
    ...inputProps,
    id: id,
    className:
      'px-4 pb-2 pt-6 border border-gray h-[60px] rounded-lg bg-lightestGray' +
      ' ' +
      inputProps.className,
    onFocus: onFocus,
    onBlur: onBlur,
    onChange,
  }),
  [id, inputProps, onBlur, onChange, onFocus],
);
```

```jsx
{
  mask ? (
    <ReactInputMask {...inputCompProps} mask={mask} maskPlaceholder={null} />
  ) : (
    <input {...inputCompProps} />
  );
}
```

![The input label moves when the user clicks into it, and an expiration date is automatically formatted with a / between the month and year](/images/blog/input-mask.gif)

With that, the input should work with a mask, no problem! Notice the `/`
that gets added automatically when the user types. This is accomplished by passing
in a `mask="99/99"` prop to the component.

## What about errors?

Once we've gotten the component setup and working in it's "happy path", we can add
an error state using [proper aria attributes for errors](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-errormessage)
using the `aria-errormessage` and `aria-invalid` props. We'll assume an added
`errorMessage: string` prop.

```jsx
// inputCompProps
'aria-errormessage': errorMessage ? `${id}-error` : undefined,
'aria-invalid': !!errorMessage,

// rendered error message
{errorMessage ? (
  <p
    className="ml-4 mt-2 text-darkerRed text-sm font-bold"
    id={`${id}-error`}
  >
    {errorMessage}
  </p>
) : null}
```

![Showing the input in its errored state with a red border, red label, and error message](/images/blog/input-error.png)
![Voiceover message "08/11, Insertion at end of text., Expiration Date, edit text"](/images/blog/input-error-voiceover.png)

## Putting it all together

With that, the componet is complete! For easier copying, here is the complete
source code:

```jsx
import { InputHTMLAttributes, useCallback, useMemo, useState } from 'react';
import ReactInputMask from 'react-input-mask';

type FloatingLabelInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string,
  mask?: string,
  containerClassName?: string,
  errorMessage?: string,
};

export default function FloatingLabelInput({
  label,
  mask,
  containerClassName = '',
  errorMessage,
  ...inputProps
}: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  // if there is a passed in id, use that. Otherwise, generate one from the label
  const id =
    inputProps.id ||
    label.toLowerCase().replace(/ /g, '-') +
      '-' +
      Math.random().toString(16).slice(2);
  const onFocus = useCallback(
    (e: any) => {
      setIsFocused(true);
      inputProps?.onFocus?.(e);
    },
    [inputProps],
  );
  const onBlur = useCallback(
    (e: any) => {
      setIsFocused(false);
      inputProps?.onBlur?.(e);
    },
    [inputProps],
  );
  const onChange = useCallback(
    (e: any) => {
      setIsFilled(!!e.target.value);
      inputProps?.onChange?.(e);
    },
    [inputProps],
  );

  // should the label be raised to the top of the input
  const elevateLabel =
    // for controlled inputs
    inputProps?.value?.toString()?.length ||
    // for uncontrolled inputs
    isFilled ||
    inputProps?.placeholder?.length ||
    isFocused;

  const inputCompProps = useMemo(
    () => ({
      ...inputProps,
      id: id,
      className:
        'flex flex-1 px-4 pb-2 pt-6 border border-gray h-[60px] rounded-lg bg-lightestGray' +
        ' ' +
        (inputProps.className || ' ') +
        (inputProps.disabled ? ' cursor-not-allowed' : '') +
        (errorMessage ? ' border-2 border-darkerRed' : ''),
      onFocus: onFocus,
      onBlur: onBlur,
      onChange,
      disabled: inputProps.disabled,
      'aria-errormessage': errorMessage ? `${id}-error` : undefined,
      'aria-invalid': !!errorMessage,
    }),
    [errorMessage, id, inputProps, onBlur, onChange, onFocus],
  );
  return (
    <>
      <div className={'relative flex items-center ' + containerClassName}>
        <label
          htmlFor={id}
          className={
            'absolute text-darkGray ml-4 transition' +
            (elevateLabel
              ? ' text-[13px] leading-[20px] -translate-y-4 font-bold'
              : '') +
            (isFocused ? ' text-purple' : '') +
            (errorMessage ? ' text-darkerRed' : '')
          }
        >
          {label}
        </label>
        {mask ? (
          <ReactInputMask
            {...inputCompProps}
            mask={mask}
            maskPlaceholder={null}
          />
        ) : (
          <input {...inputCompProps} />
        )}
      </div>
      {errorMessage ? (
        <p
          className="ml-4 mt-2 text-darkerRed text-sm font-bold"
          id={`${id}-error`}
        >
          {errorMessage}
        </p>
      ) : null}
    </>
  );
}
```

In addition to what was described above, In the final code, I've also added a
`disabled` state for the component, since we needed to change the cursor in that
state.

## Conclusion

We built this using only a few imports, a few tailwind classes, and a bit of React.
It's a component that is keyboard and screen-reader accessible by default, and
usable among a wide range of cases.

![Focused input with an "8/11" value](/images/blog/input-final.png)
![Screenshot of voiceover text saying "08/11, insertion at end of text., Expiration date, edit text"](/images/blog/input-final-voiceover.png)

You could easily extend this component to include custom styling or label logic
by adding more props, but I've left those out for the sake of focusing on the
requirements we defined earlier.

Did I leave something out? Could I have improved this or made it easier? Let me
know on [Threads](https://threads.net/@jakedawkins). Or give me a follow to stay
in the loop for future posts like this!
