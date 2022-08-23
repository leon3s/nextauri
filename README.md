<div align="center">
  <h1>NEXTAURI</h1>
  <h3>❤️ nextjs + tauri = nextauri ❤️</h3>

<p>


[![stars](https://img.shields.io/github/stars/leon3s/nextauri?style=social)](https://github.com/leon3s/nextauri)
[![Build With](https://img.shields.io/badge/built_with-Rust-dca282.svg)](https://github.com/leon3s/nextauri)
[![Build With](https://img.shields.io/badge/built_with-Typescript-3178C6.svg)](https://github.com/leon3s/nextauri)
[![Chat on Discord](https://img.shields.io/discord/1011267493114949693?label=chat&logo=discord)](https://discord.gg/WV4Aac8uZg)


</p>
<img src="https://download.next-hat.com/ressources/images/nextauri.png" />
</div>

## ❓ What is nextauri ?

Nextauri for now is a small template to generate tauri project with nextjs along typescript.
</br>
But it may become a CLI writen in rust to blazing fastly install any kind of nextjs template with tauri.


## 📦 Installation


1.  Clone or fork this repository
    ```sh
    git clone https://github.com/leon3s/nextauri
    cd nextauri
    ```
2.  Install node dependencies
    ```sh
    npm install
    ```


## 🎨 Developing


To develop with nextauri you need to run 2 commands
One to start nextjs in development mode and one to start tauri in development mode.
It's will enable live reload for both.


1.  First start nextjs in development

    ```sh
    npm run next dev
    ```

2.  Then start tauri in development mode

    ```sh
    npm run tauri dev
    ```

<blockquote>
Note that tauri is waiting for an http server to be alive on localhost:3000

You have to start npm run next dev first.
</blockquote>

### Source structure

Next.js frontend source files are located in `src-next/` while Tauri Rust application source
files are located in `src-tauri/`.
</br>
Please consult the Next.js and Tauri documentation
respectively for questions pertaining to either technology.

## ⚡Production


To build nextauri in production mode you can do it in a single command.
This will build and export nextjs and build tauri for current environement.

```sh
npm run render-all
```

Look into `src-tauri/tauri.conf.json` to tweak the settings,
and refer to tauri documentation for more information.

## 🔧 Advanced usage


1.  If you just want render next you can use

    ```sh
    npm run render-next
    ```

2.  If you just want render tauri

    ```sh
    npm run render-tauri
    ```

## ⚠️ Caveats

### Static Site Generation / Pre-rendering

Next.js is a great React frontend framework which supports server-side rendering (SSR)
as well as static site generation (SSG or pre-rendering). For the purposes of creating a
Tauri frontend, only SSG can be used since SSR requires an active Node.js server.

Using Next.js and SSG helps to provide a quick and performant single-page-application
(SPA) frontend experience. More information regarding this can be found here:
https://nextjs.org/docs/basic-features/pages#pre-rendering

### `next/image`

The [`next/image` component](https://nextjs.org/docs/basic-features/image-optimization)
is an enhancement over the regular `<img>` HTML element with additional optimizations
built in. However, because we are not deploying the frontend onto Vercel directly, some
optimizations must be disabled to properly build and export the frontend via SSG.
As such, the
[`unoptimized` property](https://nextjs.org/docs/api-reference/next/image#unoptimized)
is set to true for the `next/image` component in the `next.config.js` configuration.
This will allow the image to be served as-is from source, without
changes to its quality, size, or format.

### error[E0554]: `#![feature]` may not be used on the stable release channel

If you are getting this issue when trying to run `yarn tauri dev`, it may be that you
have a newer version of a Rust dependency that uses an unstable feature.
`yarn tauri build` should still work for production builds, but to get the dev command
working, either downgrade the dependency or use Rust nightly via
`rustup override set nightly`.

### ReferenceError: navigator is not defined

If you are using Tauri's `invoke` function or any OS related Tauri function from within
JavaScript, you may encounter this error when importing the function in a global,
non-browser context. This is due to the nature of Next.js' dev server effectively
running a Node.js server for SSR and hot module replacement (HMR), and Node.js does not
have a notion of `window` or `navigator`.

#### Solution 1 - Dependency Injection (may not always work)

Make sure that you are calling these functions within the browser context, e.g. within a
React component inside a `useEffect` hook when the DOM actually exists by then. If you
are trying to use a Tauri function in a generalized utility source file, a workaround is
to use dependency injection for the function itself to delay the actual importing of the
real function (see example below for more info).

Example using Tauri's `invoke` function:

`next-src/lib/some_tauri_functions.ts` (problematic)

```typescript
// Generalized file containing all the invoke functions we need to fetch data from Rust
import { invoke } from "@tauri-apps/api/tauri"

const loadFoo = (): Promise<string> => {
  return invoke<string>("invoke_handler_foo")
}

const loadBar = (): Promise<string> => {
  return invoke<string>("invoke_handler_bar")
}

const loadBaz = (): Promise<string> => {
  return invoke<string>("invoke_handler_baz")
}

// and so on ...
```

`next-src/lib/some_tauri_functions.ts` (fixed)

```typescript
// Generalized file containing all the invoke functions we need to fetch data from Rust
//
// We apply the idea of dependency injection to use a supplied invoke function as a
// function argument, rather than directly referencing the Tauri invoke function.
// Hence, don't import invoke globally in this file.
//
// import { invoke } from "@tauri-apps/api/tauri"  <-- remove this!
//

import { InvokeArgs } from "@tauri-apps/api/tauri"
type InvokeFunction = <T>(cmd: string, args?: InvokeArgs | undefined) => Promise<T>

const loadFoo = (invoke: InvokeFunction): Promise<string> => {
  return invoke<string>("invoke_handler_foo")
}

const loadBar = (invoke: InvokeFunction): Promise<string> => {
  return invoke<string>("invoke_handler_bar")
}

const loadBaz = (invoke: InvokeFunction): Promise<string> => {
  return invoke<string>("invoke_handler_baz")
}

// and so on ...
```

Then, when using `loadFoo`/`loadBar`/`loadBaz` within your React components, import the
invoke function from `@tauri-apps/api` and pass `invoke` into the loadXXX function as
the `InvokeFunction` argument. This should allow the actual Tauri API to be bundled
only within the context of a React component, so it should not be loaded by Next.js upon
initial startup until the browser has finished loading the page.

#### Solution 2: Wrap Tauri API behind dynamic `import()`

Since the Tauri API needs to read from the browser's `window` and `navigator` object,
this data does not exist in a Node.js and hence SSR environment. One can create an
exported function that wraps the Tauri API behind a dynamic runtime `import()` call.

Example: create a `next-src/lib/tauri.ts` to re-export `invoke`

```typescript
import type { InvokeArgs } from "@tauri-apps/api/tauri"

const isNode = (): boolean =>
  Object.prototype.toString.call(typeof process !== "undefined" ? process : 0) ===
  "[object process]"

export async function invoke<T>(
  cmd: string,
  args?: InvokeArgs | undefined,
): Promise<T> {
  if (isNode()) {
    // This shouldn't ever happen when React fully loads
    return Promise.resolve(undefined as unknown as T)
  }
  const tauriAppsApi = await import("@tauri-apps/api")
  const tauriInvoke = tauriAppsApi.invoke
  return tauriInvoke(cmd, args)
}
```

Then, instead of importing `import { invoke } from "@tauri-apps/api/tauri"`, use invoke
from `import { invoke } from "@/lib/tauri"`.

## 📙 Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and
  API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

And to learn more about Tauri, take a look at the following resources:

- [Tauri Documentation - Guides](https://tauri.app/v1/guides/) - learn about the Tauri
  toolkit.
