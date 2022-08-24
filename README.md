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

Nextauri is your minimal template for create cross platform application using tauri with nextjs.


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
</br>
Witch is the default nextjs port while running in development
</br>
That why you have to start npm run next dev first
</blockquote>

### Source structure

- `src-next/` are where Next files are located
- `src-tauri/` contain Tauri source files.

Please consult the [Next.js](https://nextjs.org/docs) and [Tauri](https://tauri.app/v1/guides/) documentation
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

3.  If you want to change port
    You can run next dev command as follow
    ```sh
    npm run next dev 8080
    ```
    Then you have to edit `src-tauri/tauri.conf.json` to use the new port
    ```json
    "devPath": "http://localhost:8080"
    ```

4.  Optionally add next dev and build command inside `src-tauri/tauri.conf.json`
    as follow:
    ```json
    "beforeBuildCommand": "npm run render-next"
    "beforeDevCommand": "npm run next dev"
    ```
    So you can use only tauri commands to run in development and to build
 
    -   For development
        ```sh
        npm run tauri dev
        ```
    -   For production build
        ```sh
        npm run tauri build
        ```
