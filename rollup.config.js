import ts from 'rollup-plugin-typescript2'
import uglify from 'rollup-plugin-uglify'

const pkg = require("./package.json");

export default {
	input: "src/index.ts",

	plugins: [
		ts({ verbosity: 2, abortOnError: false }),
		uglify() 
  ],

	output: [
		{
      name: "Konvas",
			format: "umd",
			file: "./dist/konvas.js",
			sourcemap: true,
		},
	],
}
