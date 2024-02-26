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

    codes+= (lineNumber === lines.length) ? `${lineNumber}: ${targetLine}\n   ${markerLine}` : `${lineNumber}: ${targetLine}\n   ${markerLine}\n`;

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
