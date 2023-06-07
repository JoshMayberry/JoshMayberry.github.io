/**
 * GPT4 Prompt
 *     I want another file like "./templates/compile.js" that can be used to compile all my scss files in teh folder "styles".
 * 
 * 
 *     `node-sass` is not installing correctly.
 *     Can you use another package? If it helps, I have sass installed on the command line and run it like this: `sass $file $file_path/$file_base_name.css`
 */

const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const folderPath = ((require.main === module) ? "." : "./styles");

const files = fs.readdirSync(folderPath)
files.forEach(file => {
	if (path.extname(file) === ".scss") {
		const filePath = path.join(folderPath, file);
		const outFile = filePath.replace(".scss", ".css");

		console.log(`Compiling SCSS ${path.basename(file, ".scss")}`);
		exec(`sass ${filePath} ${outFile}`, (err, stdout, stderr) => {
			if (err) {
				console.error(`exec error: ${err}`);
				return;
			}

			if (stdout) console.log(`${file} stdout: ${stdout}`);
			if (stdout) console.log(`${file} stderr: ${stderr}`);
		});
	}
});
