<div align="center">
  <h1>NEXTAURI</h1>
  <h4>nextjs + tauri = ❤️</h4>

<p>

[![stars](https://img.shields.io/github/stars/leon3s/nextauri?style=social)](https://github.com/leon3s/nextauri)
[![Build With](https://img.shields.io/badge/built_with-Rust-dca282.svg)](https://github.com/nxthat/nanocld)
[![Chat on Discord](https://img.shields.io/discord/1011267493114949693?label=chat&logo=discord)](https://discord.gg/WV4Aac8uZg)

</p>
</div>


## Installation


1.  Clone or fork this repository
    ```sh
    git clone https://github.com/leon3s/nextauri
    cd nextauri
    ```
2.  Install node dependencies
    ```sh
    npm install
    ```

## ❓ What is nextauri ?

Nextauri for now is a small template to generate tauri project with nextjs along typescript and styled-components.
</br>
It doesn't come with linting and other stuff would you like to ?
</br>
But it may become a CLI writen in rust to blazing fastly install any kind of nextjs template with tauri. 

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


## ⚡Production


To build nextauri in production mode you can do it in a single command.

```sh
npm run render-all
```

This will build and export nextjs and build tauri for current environement.

## 🔧 Advanced usage

1.  If you just want render next you can use

    ```sh
    npm run render-next
    ```

2.  If you just want render tauri

    ```sh
    npm run render-tauri
    ```

    Look into `src-tauri/tauri.conf.json` to tweak the settings,
    and refer to both nextjs and tauri documentation.
