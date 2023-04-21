import fs from "fs";
import { createArrayCsvWriter } from 'csv-writer'

function testFileRead() {
  const callBackFileRead = (err, data) => {
    const header = [      "Sr No",      "Ext",      "Misc",      "Jun",      "Directory No",      "Date",      "Time",      "Duration",      "Bill Amt",      "Acc",      "Flag",    ];
    if (err) {
      console.log(err);
      return;
    }
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

    let result = [];
    for (let i = 0; i < rows.length; i++) {
      let row = rows[i];
      if (row) {
        if (
          !test_String(
            [4, 5, 6],
            ["Ext: ", "Name: ", "SYNTEL", "----", "Flags"],
            row
          )
        ) {
          if (row.startsWith("Sr No")) {
            const keys = row.split("|").map((key) => key.trim());
            for (let j = 0; j < keys.length; j++) {
              result.push({ [keys[j]]: [] });
            }
          } else if (/^\d+$/.test(row.substring(0, row.indexOf(" ")))) {
            const values = row.split(/ +/).map((value) => value.trim());
            for (let j = 0; j < values.length; j++) {
              result[j][Object.keys(result[j])[0]].push(values[j]);
            }
          } else if (row.startsWith("TOTAL(Rs.)")) {
            break;
          }
        }
      }
    }

    const tableRows = result[0]["Sr No"].map((_, i) => [      
      result[0]["Sr No"][i],
      result[1]["Ext"][i],
      result.length > 2 && result[2]["Misc"] ? result[2]["Misc"][i] : "",
      result[3]["Jun"][i],
      result[4]["Directory No"][i],
      result[5]["Date"][i],
      result[6]["Time"][i],
      result[7]["Duration"][i],
      result[8]["Bill Amt"][i],
      result[9]["Acc"][i],
      result[10]["Flag"][i],
    ]);

    const csvWriter = createArrayCsvWriter({
      header: header,
      path: "employees.csv",
    });

    csvWriter.writeRecords(tableRows)
      .then(() => console.log('CSV file has been created successfully!'));
  }
    fs.readFile("0912.TXT", "utf8", callBackFileRead);
}

testFileRead();