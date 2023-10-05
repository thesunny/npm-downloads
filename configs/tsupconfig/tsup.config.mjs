import { defineConfig } from "tsup"

const BASE_CONFIG = defineConfig({
  target: ["es2020"],
  outExtension: (context) => {
    // return { js: `.${context.format}.js` }
    return { js: `.js` }
  },
  sourcemap: true,
  splitting: true,
  /**
   * This is relative to the importing `tsup.config.ts` file and not this file.
   *
   * NOTE: It can't find `tsconfig/tsconfig.tsup.json` so we need to add
   * `tsconfig.tsup.json` to the workspace directory and configure that to
   * extend `tsconfig/tsconfig.tsup.json`.
   *
   * I tried this both by adding `tsconfig` to the `devDependencies` of the
   * workspace and also to this `tsupconfig` package. Neither worked.
   */
  tsconfig: "tsconfig.tsup.json",
})

/**
 * TypeScript types
 */
const DTS_CONFIG = {
  ...BASE_CONFIG,
  outDir: ".dist/types",
  dts: { only: true },
}

/**
 * build for Node platform with `cjs` output
 */
const NODE_CJS_CONFIG = {
  ...BASE_CONFIG,
  format: ["cjs"],
  outDir: ".dist/node/cjs",
  platform: "node",
}

/**
 * build for Node platform with `esm` output
 */
const NODE_ESM_CONFIG = {
  ...BASE_CONFIG,
  format: ["esm"],
  outDir: ".dist/node/esm",
  platform: "node",
}

export default defineConfig(() => {
  console.log(`Building using tsup`)
  console.log(`TYPE=${process.env.TYPE}`)
  switch (process.env.TYPE) {
    /**
     * Command line interface
     */
    case "cli":
      return [NODE_CJS_CONFIG]
    /**
     * Node.js library
     */
    case "node":
      return [DTS_CONFIG, NODE_CJS_CONFIG, NODE_ESM_CONFIG]
    /**
     * React library for Node.js and Browser
     */
    case "react":
      return [
        DTS_CONFIG,
        /**
         * build for Node platform with `esm` and `cjs` output
         */
        {
          ...BASE_CONFIG,
          format: ["cjs"],
          outDir: ".dist/node/cjs",
          platform: "node",
          inject: ["./react-shim-for-tsup.js"],
        },
        {
          ...BASE_CONFIG,
          format: ["esm"],
          outDir: ".dist/node/esm",
          platform: "node",
          inject: ["./react-shim-for-tsup.js"],
        },
        /**
         * build for browser platform
         */
        {
          ...BASE_CONFIG,
          format: ["cjs"],
          outDir: ".dist/browser/cjs",
          /**
           * The JSX files here assume that React is available as a global variable.
           * To make this work, we need to inject a shim that makes it available.
           *
           * https://github.com/egoist/tsup/issues/792
           */
          inject: ["./react-shim-for-tsup.js"],
          platform: "browser",
        },
        {
          ...BASE_CONFIG,
          format: ["esm"],
          outDir: ".dist/browser/esm",
          /**
           * The JSX files here assume that React is available as a global variable.
           * To make this work, we need to inject a shim that makes it available.
           *
           * https://github.com/egoist/tsup/issues/792
           */
          inject: ["./react-shim-for-tsup.js"],
          platform: "browser",
        },
        {
          ...BASE_CONFIG,
          format: ["iife"],
          outDir: ".dist/browser/iife",
          /**
           * The JSX files here assume that React is available as a global variable.
           * To make this work, we need to inject a shim that makes it available.
           *
           * https://github.com/egoist/tsup/issues/792
           */
          inject: ["./react-shim-for-tsup.js"],
          platform: "browser",
          external: ["react", "react-dom"],
        },
      ]
  }
  throw new Error(`TYPE=${process.env.TYPE} is not supported`)
})
