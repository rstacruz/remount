# Developer notes

To run tests, use:

```sh
yarn watch
open https://localhost:10001/
```

...Doing `yarn test` (or `npm test`) will spawn a headless browser in your CLI to check if the browser tests pass or fail. Custom Elements aren't supported by JSDOM, so this (at the moment) is the most practical option IMHO :\
