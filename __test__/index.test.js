const getSnippet = require('../index').default;
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
accelerate.call(500);`
describe('代码分割', () => {
  
  it('当目标代码为首行时', () => {
    const snippet = getSnippet(code, 1, 3);

    expect(snippet).toBe(`1: const { SyncHook } = require("tapable");
     ^
2: const accelerate = new SyncHook(["newSpeed"]);
3: accelerate.tap("OverspeedPlugin", (newSpeed) => {
4:   if (newSpeed > 120) {`);
  })

  it('当目标代码为中间行', () => {
    const snippet = getSnippet(code, 9, 3);

    expect(snippet).toBe(`6:   }
7: });
8: accelerate.tap("DamagePlugin", (newSpeed) => {
9:   if (newSpeed > 300) {
     ^
10:     console.log("DamagePlugin", "速度实在太快，车子快散架了。。。");
11:   }
12: });`);
  })

  it('当目标代码为末行时', () => {
    const snippet = getSnippet(code, 13, 3);

    expect(snippet).toBe(`10:     console.log("DamagePlugin", "速度实在太快，车子快散架了。。。");
11:   }
12: });
13: accelerate.call(500);
     ^`);
  })

  it('当执行有异常时', () => {
    expect(() => getSnippet(1, 13, 3)).toThrow();
  })

})
