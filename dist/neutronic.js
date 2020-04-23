"use strict";
const isType = (value) => value === "string" || value === "number";
const isName = (name) => !/^[0-9]/gm.test(name) && !name.includes(" ");
const isString = (string) => string[0] === '\"' && string[string.length - 1] === '\"';
const isNum = (string) => Number(string).toString() === string;
const getName = (line) => line.split("=")[0].trim();
const getValue = (line) => {
    let value = line.split("=")[1].trim();
    return isString(value) ? value.substring(1, value.length - 1) :
        isNum(value) ? Number(value) : undefined;
};
const parseVars = (vars) => {
    let varsFound = [];
    for (const varTag of vars) {
        let content = varTag.innerText.split(";");
        varTag.remove();
        for (let variable of content) {
            variable = variable.trim();
            if (variable !== "") {
                let newVar = { type: "unkown", name: "", value: "" };
                // syntax check
                if (!variable.includes("=")) {
                    console.log(`[ERROR] variable does not have "="\n${variable}`);
                }
                // get name
                newVar.name = getName(variable);
                // validate name
                if (!isName(newVar.name)) {
                    console.log(`[ERROR] illegal variable name "${newVar.name}"\n${variable}`);
                    continue;
                }
                // get and validate value
                let val = getValue(variable);
                if (val === undefined) {
                    console.log(`[ERROR] cannot infer value \n${variable}`);
                    continue;
                }
                newVar.value = val;
                // get type
                typeof newVar.value == "string" ? newVar.type = "string" : newVar.type = "number";
                varsFound.push(newVar);
            }
        }
    }
    return varsFound;
};
const identifyMustaches = () => {
    let content = document.body.innerHTML;
    console.log(content);
    let inMustache = false;
    let varname = "";
    let indexFound = 0;
    for (let char = 0; char < content.length - 1; char++) {
        if (!inMustache && content[char] === '{' && content[char + 1] === '{') {
            char++;
            indexFound = char;
            inMustache = true;
        }
        else if (inMustache && content[char] === '}' && content[char + 1] === '}') {
            inMustache = false;
            content = content.slice(0, indexFound - 1) + `<span class="neutronic-variable neutronic-${varname.trim()}"></span>` + content.slice(indexFound + varname.length + 3);
            varname = "";
        }
        else if (inMustache) {
            varname += content[char];
        }
    }
    document.body.innerHTML = content;
};
let state = {
    vars: [],
};
window.onload = () => {
    state.vars = parseVars(document.getElementsByTagName("vars"));
    identifyMustaches();
    for (const variable of state.vars) {
        console.log(variable);
    }
};
// 106
