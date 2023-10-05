# Using `tsup` to build

Adjust `package.json` to something like...

```json
{
  "devDependencies": {
    "@types/node": "^20.4",
    "rimraf": "^5.0",
    "tsconfig": "workspace:*",
    "tsupconfig": "workspace:*",
    "tsup": "^7.1"
  },
  "scripts": {
    "build": "rimraf .dist && TYPE=cli tsup ./src/index.ts"
  }
}
```

And make sure you have `tsup.config.mjs` and `tsconfig.tsup.json` files in the package directory.

These simple re-export files from `tsupconfig` and `tsconfig` workspace packages.

```js
// tsup.config.mjs
export { default } from "tsupconfig/tsup.config.mjs"
```

```json
// tsconfig.tsup.json
{
  "extends": "tsconfig/tsconfig.tsup.json"
}
```

## CLI Arguments

- Must provide an `entry` argument which is given after `tsup`
- Must provide an environment variable `TYPE` which can be
  - `cli`
  - `node`
  - `react`

## How it works

- By default, `tsup` uses `tsup.config.mjs` if it exists.
- `tsup.config.mjs` specifies usage of `tsconfig.tsup.json`.
- The logic for what's included in each build type is in `tsup.config.mjs`
