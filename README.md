<div align="center">
  <h1>Nextauri</h1>
  <h3>❤️ Next.js + Tauri = Nextauri ❤️</h3>


<p>


[![Stars](https://img.shields.io/github/stars/leon3s/nextauri?style=social)](https://github.com/leon3s/nextauri)
[![Rust](https://img.shields.io/badge/built_with-Rust-dca282.svg)](https://github.com/leon3s/nextauri)
[![Typescript](https://img.shields.io/badge/built_with-Typescript-3178C6.svg)](https://github.com/leon3s/nextauri)
[![Discord](https://img.shields.io/discord/1011267493114949693?label=chat&logo=discord)](https://discord.gg/WV4Aac8uZg)


</p>

<p>

[![Eslint & Clippy](https://github.com/leon3s/nextauri/actions/workflows/eslint_clippy.yml/badge.svg)](https://github.com/leon3s/nextauri/actions/workflows/eslint_clippy.yml)
[![Build](https://github.com/leon3s/nextauri/actions/workflows/build.yml/badge.svg)](https://github.com/leon3s/nextauri/actions/workflows/build.yml)

<p>

<img src="https://download.next-hat.com/ressources/images/nextauri.png" />

</div>

## ❓ What is Nextauri ?

Nextauri is your favorite template for create cross-platform application using `Tauri` with `Next.js`. <br />
It came with minimal best practice setup so you can add anything fit your need. <br />
You can it use to develop `Windows`, `Linux` and `Mac` desktop application. <br />
But Tauri plan to have a mobile compatibility in the futur !

## 💡 Features

As recommanded by the community, Nextauri come with the best practice features such as :

-   Recommanded Eslint when working with Next.js
-   Recommanded Clippy when working with Tauri
-   Github workflow when pushing and creating pull request for :
    * Lint your Next.JS project with Eslint
    * Lint your Tauri project with Clippy
    * Build your application for `Linux`, `Windows` and `Mac`
-   Weekly dependencies update

## 💪 Motivation

Tauri is great to make secure cross platform application backed by `Rust` ! <br />
It will load an `HTML` page inside a `Webview` and give the ability to do system call with `IPC`. <br />
If you are familliar with `electron` or `nextron` you can see it as a very good replacement with smaller bundle size, smaller memory usage and more secure.

That make Next.js the perfect fit for bundle React application with Tauri since it comes with great Static-Site Generation `SSG` capability that will allow us to generates static files that will be included in the final binary.

The `benefit` of using Next.js `SSG` mode is pre-rendered React code in static HTML/JavaScript. <br /> This means your app will load faster. <br />
React doesn't have to render the `HTML` on the client-side but will hydrate it on the first load if needed.

The `downside` is that we cannot use `getServerSideProps` or use any type of `data fetching` for rendering our page for a request. <br />
Instead we will use `getStaticProps` to generate our page at build time. <br />

Note that if you still want the power of `Rust` for generate your page you may have a look at [Neon](https://neon-bindings.com). <br />
It will allow you to call `Rust` code from Node.js !

## 📦 Installation

Be sure you have [NodeJS](https://nodejs.org/en/) and [Rust](https://www.rust-lang.org/) installed on your system

1.  See Tauri [prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites/) to prepare your system to build `Tauri`

2.  Clone or fork this repository
    ```sh
    git clone https://github.com/leon3s/nextauri
    cd nextauri
    ```
3.  Install node dependencies
    ```sh
    npm install
    ```

## 🎨 Developing

To get started you only need one command

```sh
npm run dev
```

This will start both Tauri and Next.js in development mode.

> Note that tauri is waiting for an http server to be alive on localhost:3000. <br />
> It's the default Next.js `port` while running in development

You can modify the `port` by updating `src-tauri/tauri.conf.json`. <br />

```json
"beforeDevCommand": "npm run next dev -- -p 8080",
"devPath": "http://localhost:8080",
```

### Source structure

- `src-next/` are where Next.js files are located.
- `src-tauri/` contain Tauri source files.

## 🧪 Testing

To test your application we recommand you to use [Cypress](https://www.cypress.io) using Tauri [mocking technique](https://tauri.app/v1/guides/testing/mocking).

If you want me to add `Cypress` as part of the template react to this [discussion](https://github.com/leon3s/nextauri/discussions/19).

You may also want to take a look to pre-alpha [WebDriver Testing](https://tauri.app/v1/guides/testing/webdriver/introduction) from Tauri.

## ⚡Production

To build in production you can do it in a single command.
This will build and export Next.js and build Tauri for your current environnement.

```sh
npm run tauri build
```

Look into `src-tauri/tauri.conf.json` to tweak the settings,
and refer to [Tauri](https://tauri.app/v1/guides/building) building documentation for more information.


## ⚠️ Warning

If you are new to Next.js beware when working with it in development ! <br />
It will start a `Nodejs` server in background in order to have `HMR` (Hot Module Replacement) capability but also `SSR` (Server Side Rendering).
That mean your React/Typescript code have two execution context :

1.  On the `Server`
    - Code is executed by Node.js runtime.
    - There is no notion of `window` or `navigator` it's part of `Browser API`
    - You cannot call `Tauri API` in this context since Tauri injection happen in the `Browser` side

2.  On the `Browser`
    - Code is executed by the Tauri `Webview`
    - `Tauri API` will work fine and any other `Browser API` package `d3.js` for example

Note that your production code will alway be running in a `Browser` side context. <br />
Since we use the `SSG` feature from Next.js no Node.js server will be packaged in production.

```
referenceError: navigator is not defined
```

This error can orcur when importing `@tauri-apps/api` for example. <br />
There is 2 workarounds that you can use :

1.  Dynamic component method

    -   Create your component
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

    -   Import your component
        ```tsx
        import dynamic from "next/dynamic";

        const MyComponent = dynamic(() => import("./path/to/my/component"), {
          ssr: false,
        });

        ```

1.  Is browser method

    ```js
    import { invoke } from '@tauri-apps/api/tauri'

    const isBrowser = typeof window !== 'undefined'

    if (isBrowser) {
      /// Code will only execute on browser side
    }
    ```

In general to safely invoke `Tauri API` you should use it in `componentDidMount`, `useEffect` or on user based `events` that will be alway executed in client side.

## 📚 Documentation

To learn more about Tauri and Next.js, take a look at the following resources:

- [Tauri Guides](https://tauri.app/v1/guides/) - guide about Tauri.
- [Tauri API](https://tauri.app/v1/api/js) - discover javascript Tauri api.
- [Next.js Documentation](https://nextjs.org/docs) - learn more about Next.js.
- [Next.js Tutorial](https://nextjs.org/learn) - interactive Next.js tutorial.
