const getSnippet = require('./index').default;
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