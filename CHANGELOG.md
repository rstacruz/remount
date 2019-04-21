## [v0.11.0]

> Apr 22, 2019

v0.11 brings improved create-react-app support!

- Deprecate the `remount/es6` build. Just use the default `remount` build, which is now compatible with create-react-app. ([#12])
- The bundles are now made a bit slimmer. ([#12])
- Add demos in the repo, so you can try Remount in a sandbox. ([#12])

[#12]: https://github.com/rstacruz/remount/pull/12
[v0.11.0]: https://github.com/rstacruz/remount/compare/v0.10.0...v0.11.0

## [v0.10.0]

> Apr 22, 2019

v0.10 brings improved Shadow DOM support, and Rails Webpacker support!

- Add a workaround for React elements in Shadow DOM mode. ([#8], [@rybon])
- Fix compatibility with Webpacker by making the main export `.js` instead of `.mjs`. ([#11])
- Deprecate importing using `import remount from 'remount/esm'` - just use `'remount'` instead. ([#11])

[#8]: https://github.com/rstacruz/remount/pull/8
[#11]: https://github.com/rstacruz/remount/pull/11
[@rybon]: https://github.com/rybon
[v0.10.0]: https://github.com/rstacruz/remount/compare/v0.9.5...v0.10.0

## v0.1 to v0.9

[v0.9.5]

- Fix issue when multiple components exist when Remount is booted after DOM is initialized. ([@paulovitin])

[@paulovitin]: https://github.com/paulovitin
[v0.9.5]: https://github.com/rstacruz/remount/compare/v0.9.4...v0.9.5

[v0.9.4]

- Add `module` entry point in package.json

[v0.9.4]: https://github.com/rstacruz/remount/compare/v0.9.3...v0.9.4

[v0.9.3]

- Add react-dom as a peer dependency

[v0.9.3]: https://github.com/rstacruz/remount/compare/v0.9.2...v0.9.3

[v0.9.2]

- Fix MutationObserver support for custom adapters

[v0.9.2]: https://github.com/rstacruz/remount/compare/v0.9.1...v0.9.2

[v0.9.1]

- Fix possible issue with mounting with MutationObserver

[v0.9.1]: https://github.com/rstacruz/remount/compare/v0.9.0...v0.9.1

[v0.9.0]

- Add support for custom adapters to support non-React setups

[v0.9.0]: https://github.com/rstacruz/remount/compare/v0.8.0...v0.9.0

[v0.8.0]

- Significant performance improvements for MutationObserver support

[v0.8.0]: https://github.com/rstacruz/remount/compare/v0.7.1...v0.8.0

[v0.7.1]

- Improve IE compatibility

[v0.7.1]: https://github.com/rstacruz/remount/compare/v0.7.0...v0.7.1

[v0.7.0]

- Significant refactor, and support MutationObserver fallback. This means IE9 support (hopefully)! :tada:

[v0.7.0]: https://github.com/rstacruz/remount/compare/v0.6.0...v0.7.0

[v0.6.0]

- Fix `remount/esm` module.

[v0.6.0]: https://github.com/rstacruz/remount/compare/v0.5.0...v0.6.0

[v0.5.0]

- Allow _define()_ to accept defaults as a second argument (eg, `define({...}, { quiet: true })`)
- Support the `quiet: true` option (supresses warnings)
- Support the `shadow: true` option (uses Shadow DOM)

[v0.5.0]: https://github.com/rstacruz/remount/compare/v0.4.1...v0.5.0

[v0.4.1]

- Fix for previous version.

[v0.4.1]: https://github.com/rstacruz/remount/compare/v0.4.0...v0.4.1

[v0.4.0]

- Publish `remount/es6` and `remount/esm` builds.

[v0.4.0]: https://github.com/rstacruz/remount/compare/v0.3.1...v0.4.0

[v0.3.1]

- Fix build files.

[v0.3.1]: https://github.com/rstacruz/remount/compare/v0.3.0...v0.3.1

[v0.3.0]

- Use the ES5 build by default.
- Rename the `legacy` build to `es5`.

[v0.3.0]: https://github.com/rstacruz/remount/compare/v0.2.0...v0.3.0

[v0.2.0]

- Update documentation.

[v0.2.0]: https://github.com/rstacruz/remount/compare/v0.1.0...v0.2.0

[v0.1.0] Aug 17, 2018

- Initial release.

[v0.1.0]: https://github.com/rstacruz/remount/tree/v0.1.0
