type allowedTypes = "string"|"number"|"unkown";

interface Variable{
	name: string,
	type: allowedTypes,
	value:string|number
}

interface State{
	vars:Array<Variable>
}

const isType = (value:string): value is allowedTypes => value === "string" || value === "number";
const isName = (name:string) => !/^[0-9]/gm.test(name) && !name.includes(" ");
const isString = (string:string) => string[0]==='\"' && string[string.length-1]==='\"';
const isNum = (string:string) => Number(string).toString() === string;

const getType = (line:string): allowedTypes => {
	const word = line.split(" ")[0];
	return isType(word) ? word : "unkown";
};

const getName = (line:string): string => {
	let name:string|string[] = line.split("=")[0].split(" ");
	name.shift();
	name = name.join(" ").trim();
	return name;
}

const getValue = (line:string, type:"string"|"number") => {
	if (type === "string"){
		console.log(line.split("=")[1].trim());
	}else{
		console.log(line.split("=")[1].trim());
	}
	return 0;
}

const parseVars = (vars:HTMLCollectionOf<HTMLElement>) => {
	for (const varTag of vars){
		let content = varTag.innerText.split(";");
		varTag.remove()

		for (let variable of content){
			variable = variable.trim();
			if (variable !== ""){
				let newVar:Variable = {type:"unkown", name:"", value:""}
				
				if (!variable.includes("=")){
					console.log(`[ERROR] variable does not have "="\n${variable}`);
				}

				// get type
				newVar.type = getType(variable);

				// validate type
				if (newVar.type === "unkown"){
					console.log(`[ERROR] unknown type\n${variable}`);
					continue;
				}

				// get name
				newVar.name = getName(variable);

				// validate name
				if (!isName(newVar.name)){
					console.log(`[ERROR] illegal variable name "${newVar.name}"\n${variable}`);
					continue;
				}

				//get value
				newVar.value = getValue(variable, newVar.type);

				state.vars.push(newVar);
			}
		}
		

		//console.log(content);
	}
}

let state:State = {
	vars: []
};

window.onload = () => {
	parseVars(document.getElementsByTagName("vars") as HTMLCollectionOf<HTMLElement>);
	for (const variable of state.vars){
		console.log(variable);
	}
};
