exports.default = function getSnippet(code, lineNumber, colNumber, marker = '^', numbers = 7) {
  const lines = code.split('\n');
  let codes = '';
  let topLines = [];
  let bottomLines = [];

  const halfLineNumber = Math.floor(numbers/2);
  try {
    
    let topSetp = 0;
    for(let i = 1; i <= halfLineNumber; i++) {
      if (lineNumber - i > 0) {
        topSetp++;
        topLines.push(`${lineNumber - i}: ${lines[lineNumber - i - 1]}`);
      }
    }
    topLines.reverse().forEach(code => codes+=`${code}\n`)
  
    // Get the specific line
    const targetLine = lines[lineNumber - 1];

    // Create a new line with the marker
    const markerLine = Array(colNumber).join(' ') + marker;
    console.log(lineNumber, lines.length, lines)
    codes+= (lineNumber === lines.length) ? `${lineNumber}: ${targetLine}\n    ${markerLine}` : `${lineNumber}: ${targetLine}\n    ${markerLine}\n`;

    let bottomSetp = 0;
    for(let i = 1; i <= halfLineNumber; i++) {
      if (lineNumber + i <= lines.length) {
        bottomSetp++;
        bottomLines.push(`${lineNumber + i}: ${lines[lineNumber + i - 1]}`);
      }
    }
 
    bottomLines.forEach((code, index) => {
      if (index === (bottomLines.length - 1)) {
        codes+=`${code}`
      } else {
        codes+=`${code}\n`
      }
    })

    return codes;
  } catch(e) {
    throw new Error('The provided line and/or column number is out of range');
  }
}

// const code = `const { SyncHook } = require("tapable");
// const accelerate = new SyncHook(["newSpeed"]);
// accelerate.tap("OverspeedPlugin", (newSpeed) => {
//   if (newSpeed > 120) {
//     console.log("OverspeedPlugin", "您已超速！！");
//   }
// });
// accelerate.tap("DamagePlugin", (newSpeed) => {
//   if (newSpeed > 300) {
//     console.log("DamagePlugin", "速度实在太快，车子快散架了。。。");
//   }
// });
// accelerate.call(500);`;

// const snippet = getSnippet(code, 9, 1);
// console.log(snippet);