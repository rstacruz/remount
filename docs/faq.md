# Frequently Asked Questions

## The `x-` prefix

> Q: Why are all your example tags prefixed with `x-`?

The `x-` prefix is *not* required. However, it's featured in a lot of Remount's examples for a few reasons:

- All custom elements require a `-` in the name ([source](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#High-level_view)). Prefixing with `x-` makes it easy to use single-word elements, which most the examples feature (eg, `x-tooltip`).

- One early proposal for custom elements was from Mozilla, in the form of [x-tag](https://wiki.mozilla.org/Apps/x-tag). It required custom elements to be prefixed with `x-`. While the x-tag proposal is dead now, I think the convention has merit.

## Comparison to prior art

> Q: Why should I use Remount, and not `$another_library`?

See [Comparison](comparison.md).

## Remount in React

> Q: Can I use Remount to put React components in React components?

Yes, but it'd be better if you just use React. You're sure to have better performance that way.

## Happy face

> Q: Who's that guy in the README cover photo?

I stole [@rem](https://twitter.com/rem)'s avatar from [uifaces.com](https://uifaces.com/).
