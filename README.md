# VentrOS Launcher for Automotive Dashboard

This is an example of VentrOS launcher which specificly designed for automotive dashboard, like Tesla. The launcher has been bootstraped with [create-react-app](https://github.com/facebook/create-react-app).

## Install Dependencies

With NPM:

```sh
npm install
```

With Yarn:

```sh
yarn install
```

## Compile the Source Code

With NPM:

```sh
npm run build
```

With Yarn:

```sh
yarn run build
```

## Try it on Your PC

With NPM:

```sh
npm run start
```

With Yarn:

```sh
yarn run start
```

## Deploy to VentrOS Machine

1. Install dependencies and compile the source code first
2. Copy everything inside `./build` directory into `<sdcard_mountpoint>/launcher` directory.
3. That's it, now you can use the launcher
