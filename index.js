const fs = require("fs");
const { type } = require("os");
// const { parse, jsontocsv } = require("jsontocsv")

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
        if (
          !test_String(
            [4, 5, 6],
            ["Ext:", "Name:", "SYNTEL", "----", "Flags"],
            row
          )
        ) {
          console.log(row);
          if (row.startsWith("Sr No")) {
            const keys = row.split("|").map((key) => key.trim());
            for (let j = 0; j < keys.length; j++) {
              result[keys[j]] = [];
            }
          } else if (/^\d+$/.test(row.substring(0, row.indexOf(" ")))) {
            const values = row.split(/ +/).map((value) => value.trim());
            for (let j = 0; j < values.length; j++) {
              result[Object.keys(result)[j]].push(values[j]);
            }
          } else if (row.startsWith("TOTAL(Rs.)")) {
            break;
          }
        }
      }
    }
    console.log(result);

    function convertToCSV(result) {
      const header = `${Object.keys(result[0]).join("|")}\n`;
      const rows = result.map(obj => Object.values(obj).join("|")).join("\n");
      return header + rows;
    }
    
    const csv = convertToCSV(result);
    console.log(csv);
  };
  fs.readFile("0912.TXT", "utf8", callBackFileRead);
}

testFileRead();
