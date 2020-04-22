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

const getName = (line:string): string => line.split("=")[0].trim();

const getValue = (line:string) => {
	let value = line.split("=")[1].trim();
	return isString(value) ? value.substring(1, value.length-1) : 
	isNum(value) ? Number(value): undefined;
}

const parseVars = (vars:HTMLCollectionOf<HTMLElement>) => {
	for (const varTag of vars){
		let content = varTag.innerText.split(";");
		varTag.remove()

		for (let variable of content){
			variable = variable.trim();
			if (variable !== ""){
				let newVar:Variable = {type:"unkown", name:"", value:""}
				
				// syntax check
				if (!variable.includes("=")){
					console.log(`[ERROR] variable does not have "="\n${variable}`);
				}

				// get name
				newVar.name = getName(variable);

				// validate name
				if (!isName(newVar.name)){
					console.log(`[ERROR] illegal variable name "${newVar.name}"\n${variable}`);
					continue;
				}

				// get and validate value
				let val = getValue(variable);
				if (val === undefined){
					console.log(`[ERROR] cannot infer value \n${variable}`);
					continue;
				}
				newVar.value = val;

				// get type
				typeof newVar.value == "string" ? newVar.type = "string": newVar.type = "number";
				
				state.vars.push(newVar);
			}
		}
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
// 106