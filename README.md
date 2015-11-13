# Federated Wiki - IpFs Plugin

This plugin, type: ipfs, extends the functionalities of Federated Wiki allowing to interface it with https://github.com/ipfs/ipfs using https://github.com/ipfs/node-ipfs-api

## Roadmap

* **Implement ipfs' cat method to obtain binary data from assets and embed it on the plugin's paragraph.**

  status: Implementing

* **Implement ipfs' add method to push an asset from FedWiki ( optimally per dra-and-drop) into ipfs.**

  status: Planned

## Build

```
npm install
grunt build
```

## Develop

```
npm install
grunt build; grunt watch;
```

## Install

  Follow guides on http://plugins.fed.wiki.org/view/welcome-visitors/view/about-plugins

## License

MIT
