# Federated Wiki - IpFs Plugin

This plugin, type: ipfs, extends the functionalities of Federated Wiki allowing to interface it with https://github.com/ipfs/ipfs using https://github.com/ipfs/node-ipfs-api

## Configure

Specify connection data to a running IPFS instance on ```lib/config``` first.

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

## Roadmap

* **Implement ipfs' cat method to obtain binary data from assets and embed it on the plugin's paragraph.**

  status: Implementing

  Paste the hash of a resource stored on IPFS into a box of type **Ipfs** and the contents will be shown. Currently wiki-plugin-ipfs just **cats** the binary contents of the asset in the markup so HTML or plain text assets will be shown properly but other, such as images, videos, etc... would just spit out unreadable characters.

* **Implement ipfs' add method to push an asset from FedWiki ( optimally per drag-and-drop) into ipfs.**

  status: Planned

  The idea is to allow the user to drag-and-drop a file (image, video, zip) into the **Ipfs** box and it will be added to Ipfs via the instance specified in ```lib/config```

## License

MIT
