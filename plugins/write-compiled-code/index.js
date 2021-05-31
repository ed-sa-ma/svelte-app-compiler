const { compile } = require('svelte/compiler');
const fs = require('fs');
const path = require('path');

function replaceTabs(source) {
	return source.replace(/\t/g, '    ');
}

function addEntryToIndex(componentName, code) {
	let importStatement = `import ${componentName} from './${componentName}.js'`;

	if (code.includes(importStatement)) return code;
	if (!code) {
		return `${importStatement}\n\nexport{ ${componentName} };\n`;
	}

	let lines = code.split('\n');

	// Add the new component to the exports object.
	lines[lines.length - 2] = lines[lines.length - 2].replace(
		/{ ((?:[^ ])+(?:, (?:[^ ])+)*) }/,
		function (_, group) {
			let componentsList = group;
			let extended = `${componentsList}, ${componentName}`;

			return `{ ${extended} }`;
		}
	);

	// Add import statement.
	lines.splice(lines.length - 3, 0, importStatement);

	return lines.join('\n');
}

function updateIndex(componentName) {
	let indexPath = path.resolve(__dirname, `../../compiled/index.js`);
	let indexContent = fs.existsSync(indexPath)
		? fs.readFileSync(indexPath, { encoding: 'utf-8' })
		: '';

	let updatedIndex = addEntryToIndex(componentName, indexContent);

	fs.writeFileSync(indexPath, updatedIndex);
}

function writeComponentFile(componentName, code) {
	let compiled = compile(code);
	let compiledJs = replaceTabs(compiled.js.code);
	let fileContent = `export default ${JSON.stringify(compiledJs)}\n`;

	fs.writeFileSync(path.resolve(__dirname, `../../compiled/${componentName}.js`), fileContent);
}

module.exports = function () {
	let cache = new Map();

	return {
		buildStart() {
			let compiledPath = path.resolve(__dirname, `../../compiled`);

			// If compiled folder doesn't exists fs.readFileSync calls fail.
			if (!fs.existsSync(compiledPath)) {
				fs.mkdirSync(compiledPath);
			}

			let fileList = fs.readdirSync(path.resolve(__dirname, '../../src/sample'));

			for (let file of fileList) {
				let componentName = file.split('.')[0];
				let code = fs.readFileSync(path.resolve(__dirname, `../../src/sample/${file}`), {
					encoding: 'utf-8'
				});

				if (!cache.has(componentName)) {
					// New component.

					updateIndex(componentName);
					writeComponentFile(componentName, code);
					cache.set(componentName, code);
				} else if (cache.get(componentName) !== code) {
					// Updated existing component.

					writeComponentFile(componentName, code);
					cache.set(componentName, code);
				}
			}
		}
	};
};
