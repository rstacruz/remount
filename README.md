# react-web-components

> I'll explain later, as soon as I have a name

## Usage

Given this React component:

```js
const Greeter = ({ name }) => {
  return <div>Hello, {name}!</div>
}
```

Define it with:

```js
import { define } from 'react-web-components'

define({
  'x-greeter': Greeter
})
```

Use it:

```html
<x-greeter name='John'></x-greeter>
```
