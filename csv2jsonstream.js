#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const Papa = require("papaparse");

let state = {
	inputPath: process.argv[2],
	notFirstLine: false,
};

if (!path.isAbsolute(state.inputPath)) {
	state.inputPath = path.resolve(process.cwd(), state.inputPath);
}

state.inputFileStream = fs.createReadStream(state.inputPath);

console.log("[");

Papa.parse(state.inputFileStream, {
	header: true,
	dynamicTyping: true,
	step: row => {
		console.log(
			(state.notFirstLine ? "," : "") + JSON.stringify(row.data[0])
		);

		if (!state.notFirstLine) {
			state.notFirstLine = true;
		}
	},
	complete: () => {
		console.log("]");
	}
});
