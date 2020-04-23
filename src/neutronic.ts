type allowedTypes = "string"|"number"|"unkown";

interface Variable{
	name: string,
	type: allowedTypes,
	value:string|number
}

interface State{
	vars:Array<Variable>,
}

const isType = (value:string): value is allowedTypes => value === "string" || value === "number";
const isName = (name:string) => !/^[0-9]/gm.test(name) && !name.includes(" ");
const isString = (string:string) => string[0]==='\"' && string[string.length-1]==='\"';
const isNum = (string:string) => Number(string).toString() === string;

const getName = (line:string): string => line.split("=")[0].trim();

const getValue = (line:string) => {
	let value = line.split("=")[1].trim();
	return isString(value) ? value.substring(1, value.length-1) : 
	isNum(value) ? Number(value): undefined;
}

const parseVars = (vars:HTMLCollectionOf<HTMLElement>) => {
	let varsFound: Array<Variable> = [];
	for (const varTag of vars){
		let content = varTag.innerText.split(";");
		varTag.remove()
		
		for (let variable of content){
			variable = variable.trim();
			if (variable !== ""){
				let newVar:Variable = {type:"unkown", name:"", value:""}
				
				// syntax check
				if (!variable.includes("=")){
					console.error(`[NEUTRONIC ERROR] Variable does not have "="\n${variable}`);
				}

				// get name
				newVar.name = getName(variable);

				// validate name
				if (!isName(newVar.name)){
					console.error(`[NEUTRONIC ERROR] Illegal variable name "${newVar.name}"\n${variable}`);
					continue;
				}

				// get and validate value
				let val = getValue(variable);
				if (val === undefined){
					console.error(`[NEUTRONIC ERROR] cannot infer value \n${variable}`);
					continue;
				}
				newVar.value = val;

				// get type
				typeof newVar.value == "string" ? newVar.type = "string": newVar.type = "number";
				
				varsFound.push(newVar);
			}
		}
	}
	return varsFound;
}

const identifyMustaches = () => {
	let content = document.body.innerHTML;
	let inMustache = false;
	let varname = "";
	let indexFound = 0;
	for (let char = 0; char < content.length-1; char++){
		if (!inMustache && content[char] === '{' && content[char+1] === '{'){
			char++;
			indexFound = char;
			inMustache = true;
		}else if(inMustache  && content[char] === '}' && content[char+1] === '}'){
			inMustache = false;
			content = content.slice(0, indexFound-1) + `<span class="neutronic-variable neutronic-bind-${varname.trim()}"></span>` + content.slice(indexFound+varname.length+3);
			varname = "";
		}else if(inMustache){
			varname += content[char];
		}
	}
	document.body.innerHTML = content;
};

const updateAllMustaches = () => {
	let mustaches = document.getElementsByClassName("neutronic-variable");
	for (const mustache of mustaches){
		let className = Array.from(mustache.classList).find(value => /neutronic-bind-/gm.test(value));
		if (className === undefined || className === "neutronic-bind-"){
			continue;
		}else{
			className = className.substring(15);
			let variable = state.vars.find(value => value.name === className);
			if (variable !== undefined){
				mustache.innerHTML = variable.value as string;
			}
		}
	}
};

const retrieveData = async (url:string) => {
	let response = await fetch(url);
	if (response.status !== 200){
		return undefined;
	}
	return await response.text();
};

const loadImports = async () => {
	const importTags = document.getElementsByTagName("import");
	for (const importTag of importTags){
		let pathAttr = Array.from(importTag.attributes).find(attr => attr.name == "src");

		if (pathAttr === undefined){
			console.error(`[NEUTRONIC ERROR] import tag without src`);
			continue;
		}

		let data = await retrieveData(`http://localhost:5000/testing/${pathAttr.value}`);
		if (data === undefined){
			console.error(`[NEUTRONIC ERROR] cannot find or open import: "${pathAttr.value}"`);
			continue;
		}
		importTag.innerHTML = data;

		console.log(importTag.innerHTML)
	}
}

let state:State = {
	vars: [],
};


window.onload = async () => {
	await loadImports();
	state.vars = parseVars(document.getElementsByTagName("vars") as HTMLCollectionOf<HTMLElement>);
	identifyMustaches();
	updateAllMustaches();
};