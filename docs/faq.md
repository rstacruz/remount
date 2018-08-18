# Frequently Asked Questions

## "Please use 'new' operator" error

> TypeError: Failed to construct 'HTMLElement': Please use the 'new' operator, this DOM object constructor cannot be called as a function.

Possible solutions:

- Try adding custom-elements-es5-adapter

- Disable class transforms in Babel

## The `x-` prefix

> Q: Why are all your example tags prefixed with `x-`?

The `x-` prefix is _not_ required. However, it's featured in a lot of Remount's examples for a few reasons:

- All custom elements require a `-` in the name ([source](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#High-level_view)). Prefixing with `x-` makes it easy to use single-word elements, which most the examples feature (eg, `x-tooltip`).

- One early proposal for custom elements was from Mozilla, in the form of [x-tag](https://wiki.mozilla.org/Apps/x-tag). It required custom elements to be prefixed with `x-`. While the x-tag proposal is dead now, I think the convention has merit.

## Comparison to prior art

> Q: Why should I use Remount, and not `$another_library`?

See [Comparison](comparison.md).

## Remount in React

> Q: Can I use Remount to put React components in React components?

Yes, but it'd be better if you just use React. You're sure to have better performance that way.

## create-react-app

> Q: How do I use it with create-react-app?

Use the `remount/es6` variant. See [builds](./builds.md) documentation on how.

## Codesandbox

> Q: How do I use Remount on Codesandbox?

The default Codesandbox React template is based on create-react-app. See the [answer above](#create-react-app). You can also fork [this Codesandbox template](https://codesandbox.io/s/yqqv0zz16x).

## Jsfiddle

> Q: How do I use Remount on Jsfiddle?

Fork [this template](http://jsfiddle.net/rstacruz/zjov6hdu/).

## Preact

> Q: Will it work with Preact?

Yes, try it with the `preact-compat` package. Make sure you set up your Webpack configuration as the preact-compat docs [suggests](https://www.npmjs.com/package/preact-compat#usage-with-webpack).

## Happy face

> Q: Who's that guy in the README cover photo?

I stole [@rem](https://twitter.com/rem)'s face from [uifaces.com](https://uifaces.com/).
