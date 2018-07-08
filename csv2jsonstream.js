#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const Papa = require("papaparse");

let state = {
	inputPath: process.argv[2],
	inputStream: null,
	get hasInputPath() {
		return !!this.inputPath;
	},

	// stats
	outLines: 0,
	get notFirstLine() {
		return this.outLines > 0;
	},
};

if (state.hasInputPath) {
	// normalize input path
	if (!path.isAbsolute(state.inputPath)) {
		state.inputPath = path.resolve(process.cwd(), state.inputPath);
	}

	state.inputStream = fs.createReadStream(state.inputPath, {
		encoding: "utf8"
	});
} else {
	process.stdin.setEncoding("utf8");
	state.inputStream = process.stdin;
}

// open output array
console.log("[");

// output a "]" before exiting
function exitHandler() {
	console.log("]");
	console.error(`Processed Lines: ${state.outLines}`);
	process.exit();
}

process.on("SIGINT", function() {
	console.error("Exiting because of SIGKILL...");
	exitHandler();
});

// configure and start the csv parser
Papa.parse(state.inputStream, {
	header: true,
	dynamicTyping: true,
	step: row => {
		console.log(
			(state.notFirstLine ? "," : "") + JSON.stringify(row.data[0])
		);

		state.outLines++;
	},
	complete: exitHandler,
});
