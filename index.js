const fs = require("fs");
const { type } = require("os");

function testFileRead() {
  const callBackFileRead = (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    // console.log(`The Shape of Data ${ data} \n The data as below : `)

    // const rows = data
    //   .split("\n")
    //   .map((row) => row.trim().split("\s+"))
    //   .filter((row) => row != "");
    //   console.log(rows)

    const rows = data.split("\n")


    function test_String(num, characters, row) {
        for(let i = 0; i < num.length; i++){
            if(characters.some((element) => element == row.substring(0, num[i]), row)) {
                return true;
            }
        }
         return false 
    }

    let obj ={};
    let key = [];
    let value = [];
    
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        // return row
        if (row) {
            if(!test_String([4,5,6], ["Ext:", "Name:", "SYNTEL", "----"], row)) {
                console.log(row)
            }
            // row.some(["Ext:", "Name:", "SYNTEL", "Flags"] == row.substring(0, num[i]), characters)
            // if (row.substr(0, 4) != 'Ext:') {
            //     if (row.substr(0, 5) != 'Name:') {
            //         if (row.substr(0, 6) != 'SYNTEL') {
            //             if (row.substr(0, 5) != 'Flags') {
            //                 console.log(row)
            //             }
            //         }
            //     }
            // }
        }
      }

    // for( let i = 0; i < keys.length; i++ ) {
    //     r[keys[i]] = values[i]
    // }

    // console.log("remove no string", cleanData())
    // console.log(rows);
  };
  fs.readFile("0912.TXT", "utf8", callBackFileRead);
}

testFileRead();
