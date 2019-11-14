<p align="center"><img width="143px" height="130px" src="https://raw.githubusercontent.com/tyankatsu0105/types-gridsome/master/assets/logo.png" alt="Types for gridsome.server.js and gridsome.client.js"></p>

<h2 align="center">Types Gridsome</h2>
<p align="center">
  💙Types for <code>gridsome.server.js</code>, <code>gridsome.client.js</code> and <code>gridsome.config.js</code>. <br> <a href="https://gridsome.org/" rel="nofollow">Gridsome</a>
</p>
<p align="center">
  <a title="Current version" href="https://www.npmjs.com/package/@tyankatsu0105/types-gridsome" rel="nofollow">
    <img src="https://badge.fury.io/js/%40tyankatsu0105%2Ftypes-gridsome.svg">
  </a>
  <a title="Deploy with shipjs" href="https://github.com/algolia/shipjs" rel="nofollow">
    <img src="https://img.shields.io/badge/Deploy-shipjs-orange.svg">
  </a>
  <a title="MIT License" href="[LICENSE](https://opensource.org/licenses/MIT)" rel="nofollow">
    <img src="https://img.shields.io/badge/License-MIT-green.svg">
  </a>
  <br>
  <br>
</p>

![demo](https://raw.githubusercontent.com/tyankatsu0105/types-gridsome/master/assets/demo.png)

Support Gridsome `v.0.7.10`.  
Please PR when Gridsome is updated✌️

## Usage

```bash
npm install @tyankatsu0105/types-gridsome -D
```

```js
// gridsome.server.js
/** @type import('@tyankatsu0105/types-gridsome').Server */

module.exports = api => {
  // ...
};
```

Please check [example](https://github.com/tyankatsu0105/types-gridsome/tree/develop/example).

> 💁‍♂️Anntention:  
> If Gridsome was refactored with TypeScript, this package is unnecessary for you :)
