# Developer notes

## Running tests

```sh
yarn watch
# This opens your browser
```

- <http://localhost:10049/> - Tests
- <http://localhost:10049/?polyfill> - Tests + enable CustomElements polyfill
- <http://localhost:10049/?debug> - Tests + Debug mode
- <http://localhost:10049/?polyfill,debug> - Both
- `yarn run jest` - Run test via Puppeteer

## CI tests

`yarn test` will will spawn a headless browser in your CLI to check if the browser tests pass or fail. This is only useful in CI; just use `yarn watch` locally.

Custom Elements aren't supported by Jsdom yet, so running tests with Jest isn't the most ideal scenario at the moment.

## Creating Codepen/JSFiddle

Add these URL's:

```html
<script src='https://cdnjs.cloudflare.com/ajax/libs/react/16.4.2/umd/react.production.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.4.2/umd/react-dom.production.min.js'></script>
<script src='https://cdn.jsdelivr.net/npm/remount@0.7.2'></script>
```

## Testing browser support

I often publish the latest test suite at <https://ricostacruz.com/remount/dist/> (via `yarn deploy`). You can use this URL to check if your browser supports Remount.

## Contacting me

I'm on Twitter as [@rstacruz](https://twitter.com/rstacruz), hit me up for any questions at all. I'm happy to help!
