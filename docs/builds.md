# Builds

You can see all available builds at [here](https://cdn.jsdelivr.net/npm/remount/dist).
Each version ships with three variants:

| Version  | Description                  |
| -------- | ---------------------------- |
| `umd`    | Universal version. *(default)* |
| `legacy` | An ES5 build for legacy browsers (IE) |
| `esm`    | es modules .mjs build        |

Each build also comes with minified versions, putting the total to 6 builds.

## What do I use?

**Use the `umd` build, which is the default.** The other builds are provided for special cases:

- The `legacy` build is required if you plan to support IE.
- The `esm` build is used for within `<script type='module'>` scripts.
