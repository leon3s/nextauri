<div align="center">
  <h1>NEXTAURI</h1>
  <h3>❤️ Next.js + Tauri = Nextauri ❤️</h3>

<p>


[![stars](https://img.shields.io/github/stars/leon3s/nextauri?style=social)](https://github.com/leon3s/nextauri)
[![Build With](https://img.shields.io/badge/built_with-Rust-dca282.svg)](https://github.com/leon3s/nextauri)
[![Build With](https://img.shields.io/badge/built_with-Typescript-3178C6.svg)](https://github.com/leon3s/nextauri)
[![Chat on Discord](https://img.shields.io/discord/1011267493114949693?label=chat&logo=discord)](https://discord.gg/WV4Aac8uZg)


</p>
<img src="https://download.next-hat.com/ressources/images/nextauri.png" />
</div>

## ❓ What is Nextauri ?

Nextauri is your favorite template for create cross-platform application using Tauri with Next.js.
It came with minimal best practice setup so you can add anything fit your need.
You can it use to develop `Windows`, `Linux` and `Mac` desktop application.
But Tauri plan to have also a mobile compatibility in the futur.

## 💪 Motivation

Tauri is great to make cross platform application backed by `Rust`
It will load an `HTML` page and add native binding on his context.

Next.js is the perfect fit for bundle React application with Tauri it comes with both Server-Side Rendering (SSR) and Static-Site Generation (SSG) capabilities.

To make Next.js work with Tauri we are going to use the `SSG` mode since it generates static files that will be included in the final binary.

The `benefit` of using Next.js `SSG` mode is pre-rendered React code in static HTML/JavaScript. This means your app will load faster. React doesn't have to render the `HTML` on the client-side but will hydrate it on the first load if needed.

The `downside` is that we cannot use `getServerSideProps` or use any type of `data fetching` for rendering our page.
Instead we can use `getStaticProps` to generate our page at build time.

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

To get started you only need one command

```sh
npm run dev
```

> Note that tauri is waiting for an http server to be alive on localhost:3000.
> Tt's the default Next.js port while running in development

You can modify it by updating `src-tauri/tauri.conf.json`
```json
"beforeDevCommand": "npm run next dev -- -p 8080",
"devPath": "http://localhost:8080",
```

### Source structure

- `src-next/` are where Next.js files are located.
- `src-tauri/` contain Tauri source files.

Please consult the [Next.js](https://nextjs.org/docs) and [Tauri](https://tauri.app/v1/guides/) documentation
respectively for questions pertaining to either technology.

## ⚡Production

To build in production you can do it in a single command.
This will build and export Next.js and build Tauri for current the environement.

```sh
npm run tauri build
```

Look into `src-tauri/tauri.conf.json` to tweak the settings,
and refer to [Tauri](https://tauri.app/v1/guides/) documentation for more information.


## 👀 Look out

When working with Next.js in development
it will start a `Nodejs` server in background in order to have `HMR` (Hot Module Replacement) capability but also `SSR` (Server Side Rendering).
That mean your React/Typescript code have two execution context :
1.  On the server
    - There is no notion of `window` or `navigator` it's part of `Browser API`
    - You cannot call `Tauri API` in this context since Tauri do his injection on the `Browser` side
2.  On the client
    - `Tauri API` will work fine and any other `Browser API` package `d3.js` for example

```
referenceError: navigator is not defined
```
This error can orcur when importing `@tauri-apps/api` for example
There is 3 workaround that you can use:

1. Is client method

```js
import { invoke } from '@tauri-apps/api/tauri'

const isClient = typeof window !== 'undefined'

isClient &&
  invoke('greet', { name: 'World' }).then(console.log).catch(console.error)
```

2. Dynamic Component

`src-next/components/MyComponent.tsx`
```tsx
import React from 'react'

import { window } from '@tauri-apps/api';

const { appWindow } = window;

export default function MyComponent() {
  <div>
    {appWindow.label}
  </div>
}
```

`index.tsx`
```tsx
import dynamic from "next/dynamic";

const MyComponent = dynamic(() => import("../components/MyComponent"), {
  ssr: false,
});

```

In general to safely invoke `Tauri API` you should use it in `componentDidMount`, `useEffect` or on user based `events` that will be alway executed in client side.

## 📚 Documentation

To learn more about Tauri and Next.js, take a look at the following resources:

- [Tauri Guides](https://tauri.app/v1/guides/) - guide about Tauri.
- [Tauri API](https://tauri.app/v1/api/js) - discover javascript Tauri api.
- [Next.js Documentation](https://nextjs.org/docs) - learn more about Next.js.
- [Next.js Tutorial](https://nextjs.org/learn) - interactive Next.js tutorial.
