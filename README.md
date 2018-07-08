# csv2jsonstream

the cheapest csv to json-array converter EVER!

* uses [papaparse](https://www.papaparse.com/)
* assumes csv header rows
* outputs rows in a streaming manner

### installation

`npm i -g @erdii/csv2jsonstream`

### usage

* Read csv from file: `csv2jsonstream input.csv > output.json`
* Read csv from stdin: `cat input.csv | csv2jsonstream > output.json`
