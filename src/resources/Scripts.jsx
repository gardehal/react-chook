
// Update ingredients from Kolonial where neutritinal information is not complete
export const updateKolonialIngredients = () =>
{
    // TODO
}

// Finish writing Enum code for Enum, given that the enum values are all present and they have a display valude called "ENUM_[Enum name]".
// (I can't be bothered writing all this by hand it's gonna take hours) 
export const createEnumFunctions = (enumClass, enumClassName) =>
{
    let name = enumClassName;
    let keys = Object.keys(enumClass);
    let keysString = keys.filter(k => !Number.parseInt(k) && k != "0");
    let keysNumber = keys.filter(k => Number.parseInt(k) || k == "0");
    let stringFunctions = "";

    console.log("Enum creating function");
    console.log(enumClass);
    console.log(name);
    console.log(keys);
    console.log(keysString);
    console.log(keysNumber);

    stringFunctions += "export const " + name + "Display: { [index: number]: string } = {};\n";
    for (const i in keysString) 
    {
        let key = keysString[i];
        stringFunctions += name + "Display[" + name + "." + key + "] = ENUM_" + key + ";\n";
    }
    
    stringFunctions += "\n";
    stringFunctions += "export const " + name + "Value = (text: String) =>\n";
    stringFunctions += "{\n";
    stringFunctions += "\tswitch(text.toLowerCase())\n";
    stringFunctions += "\t{\n";
    
    for(let i = 0; i < keysString.length; i++)
    {
        let key = keysString[i];
        let index = keysNumber[i];
        
        stringFunctions += "\t\tcase \"" + index + "\":\n";
        stringFunctions += "\t\tcase \"" + key + "\".toLowerCase():\n";
        stringFunctions += "\t\tcase ENUM_" + key + ".toLowerCase():\n";
        stringFunctions += "\t\t\treturn " + name + "[" + name + "." + key + "];\n";   
    }

    stringFunctions += "\t\tdefault:\n";
    stringFunctions += "\t\t\treturn UNKNOWN_VALUE;\n";
    stringFunctions += "\t}\n";
    stringFunctions += "};\n";

    stringFunctions += "\n";

    stringFunctions += "export const " + name + "List = (translated: Boolean = false, join: Boolean = true, delim: string = \", \") =>\n";
    stringFunctions += "{\n";
    stringFunctions += "\tlet keys = Object.keys(" + name + ").filter(k => !Number.parseInt(k) && k != \"0\");\n";
    stringFunctions += "\tlet res: Array<String> = [];\n";
    stringFunctions += "\n";
    stringFunctions += "\tif(translated)\n";
    stringFunctions += "\t\tfor (const key in keys)\n";
    stringFunctions += "\t\t\tres.push(" + name + "Display[key]);\n";
    stringFunctions += "\telse\n";
    stringFunctions += "\t\tfor (const key in keys)\n";
    stringFunctions += "\t\t\tres.push(" + name + "[key]);\n";
    stringFunctions += "\n";
    stringFunctions += "\tif(join)\n";
    stringFunctions += "\t\treturn res.join(delim);\n";
    stringFunctions += "\n";
    stringFunctions += "\treturn res; \n";
    stringFunctions += "};\n";

    console.log(stringFunctions);
    return stringFunctions;
};