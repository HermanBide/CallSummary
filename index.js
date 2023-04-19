const fs = require("fs");
const { type } = require("os");

function testFileRead() {
  const callBackFileRead = (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    // console.log(`The Shape of Data ${ data} \n The data as below : `)
    const rows = data.split("\n");

    function test_String(num, characters, row) {
      for (let i = 0; i < num.length; i++) {
        if (
          characters.some((element) => element == row.substring(0, num[i]), row)
        ) {
          return true;
        }
      }
      return false;
    }
    let result = {};
    for (let i = 0; i < rows.length; i++) {
      let row = rows[i];
      if (row) {
        if (!test_String([4, 5, 6],["Ext:", "Name:", "SYNTEL", "----", "Flags"], row)) {
          console.log(row)
            if (row.startsWith('Sr No')) {
              const keys = row.split('|').map(key => key.trim());
              for (let j = 0; j < keys.length; j++) {
                result[keys[j]] = [];
              }
            } else if (/^\d+$/.test(row.substring(0, row.indexOf(' ')))) {
              const values = row.split(/ +/).map(value => value.trim());
              for (let j = 0; j < values.length; j++) {
                result[Object.keys(result)[j]].push(values[j]);
              }
            } else if (row.startsWith('TOTAL(Rs.)')) {
              break;
            }
          
        }
      }
    }
    console.log(result)

    let csvContent = "data:text/csv;charset=utf-8,";
    result.forEach(function(result) {
      let object = result.join(',');
      csvContent += object + "\r\n" ;
    });
    // console.log("keys to the object", keys)
  };
  fs.readFile("0912.TXT", "utf8", callBackFileRead);
}

testFileRead();
