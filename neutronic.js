"use strict";
const isType = (value) => value === "string" || value === "number";
const isName = (name) => !/^[0-9]/gm.test(name) && !name.includes(" ");
const isString = (string) => string[0] === '\"' && string[string.length - 1] === '\"';
const isNum = (string) => Number(string).toString() === string;
const getType = (line) => {
    const word = line.split(" ")[0];
    return isType(word) ? word : "unkown";
};
const getName = (line) => {
    let name = line.split("=")[0].split(" ");
    name.shift();
    name = name.join(" ").trim();
    return name;
};
const getValue = (line, type) => {
    if (type === "string") {
        console.log(line.split("=")[1].trim());
    }
    else {
        console.log(line.split("=")[1].trim());
    }
    return 0;
};
const parseVars = (vars) => {
    for (const varTag of vars) {
        let content = varTag.innerText.split(";");
        varTag.remove();
        for (let variable of content) {
            variable = variable.trim();
            if (variable !== "") {
                let newVar = { type: "unkown", name: "", value: "" };
                if (!variable.includes("=")) {
                    console.log(`[ERROR] variable does not have "="\n${variable}`);
                }
                // get type
                newVar.type = getType(variable);
                // validate type
                if (newVar.type === "unkown") {
                    console.log(`[ERROR] unknown type\n${variable}`);
                    continue;
                }
                // get name
                newVar.name = getName(variable);
                // validate name
                if (!isName(newVar.name)) {
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
};
let state = {
    vars: []
};
window.onload = () => {
    parseVars(document.getElementsByTagName("vars"));
    for (const variable of state.vars) {
        console.log(variable);
    }
};
