# Course-portal web client

## Project setup

```
yarn install
```

### Configuration

In production, the client assumes that the api is reachable at /api of the same host. E.g. If hosted on `tenta.dtek.se` the api is assumed to be located at `tenta.dtek.se/api` and the files to be served at `tenta.dtek.se/public`.

In development it instead assumes that the server is located at `localhost:8855`.

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```
