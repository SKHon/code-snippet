## 使用

### 介绍
在代码检测中，如果检测出某行代码某列有问题，则需要标记出来。code-snippet就是将代码中的目标代码标记出来，并返回指定行数的代码片段。

### 安装
```bash
$ npm i skhon-code-snippet
```

### 使用
```javascript
const getSnippet = require('skhon-code-snippet').default;
const code = `const { SyncHook } = require("tapable");
const accelerate = new SyncHook(["newSpeed"]);
accelerate.tap("OverspeedPlugin", (newSpeed) => {
  if (newSpeed > 120) {
    console.log("OverspeedPlugin", "您已超速！！");
  }
});
accelerate.tap("DamagePlugin", (newSpeed) => {
  if (newSpeed > 300) {
    console.log("DamagePlugin", "速度实在太快，车子快散架了。。。");
  }
});
accelerate.call(500);`;

const snippet = getSnippet(code, 9, 3);
console.log(snippet);
```