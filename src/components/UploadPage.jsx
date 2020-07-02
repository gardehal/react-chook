import React from "react";
import { connect } from "react-redux";

// Redux imports
import { getRecipeData, setRecipeError, setRecipeData } from "../actions/RecipeActions";
import { getIngredientData, setIngredientData } from "../actions/IngredientActions";
import { renderLoading, renderError, setTitle, getRandomString, toCamelCase, getKolonialItemWithCheerio } from "../resources/Shared";

// Variable imports
import { UPLOAD, WIP, GENERAL_UPLOAD_INFORMATION, UPLOAD_FORM, UPLOAD_FILE, UPLOAD_QUEUE, OVERVIEW, UPLOAD_CHOOSE_FILE, TITLE, TYPE, 
    GRADE, RATING, PORTIONS, PREP_TIME, TOTAL_TIME, COOKING_METHOD, COOKING_METHOD_TEMPERATURE, COOKING_METHOD_TEMPERATURE_UNIT, 
    INGREDIENTS, INSTRUCTIONS, TIPS_NOTES, FILE_UPLOAD_ERROR, NO_FILE_ERROR, VALIDATE_UPLOAD_DATA, NO_VALID_ITEMS_IN_FILE,
    INGREDIENT, RECIPE, FAILED, PRICE, NOT_VALID_NAME, NOT_A_NUMBER, NUMBER_BELOW_ZERO, NOT_AN_INGREDIENTTYPE, INVALID_TYPE, FAILED_ITEMS, RECIPES, MORE_INFORMATION, 
    FREETEXT_INFO, FREETEXT_INPUT_INFO, FREETEXT_SYNTAX_START, FREETEXT_SYNTAX_DELIM, FREETEXT_SYNTAX_NAME, FREETEXT_SYNTAX_TYPE, FREETEXT_SYNTAX_PRICE, 
    FREETEXT_SYNTAX_COMMON, FREETEXT_SYNTAX_EXAMPLE_START, SEASALT, SPICE, FREETEXT_SYNTAX_EXAMPLE_PRICE, TRUE, FREETEXT, FREETEXT_MISSING,
    FREETEXT_SYNTAX_INFO_EXCLAMATION, FREETEXT_SYNTAX_INFO_TYPES, FREETEXT_SYNTAX_INFO_PRICE, FREETEXT_SYNTAX_INFO_COMMON, FREETEXT_SYNTAX_INFO_KOLONIAL, 
    FREETEXT_SYNTAX_INFO_OVERVIEW, ELEMENT, SIMILAR_IN_DB, SECTION_MISSING, MAX_INGREDIENTS_IN_RECIPE, MAX_INSTRUCTIONS_IN_RECIPE, MAX_NOTES_IN_RECIPE, ERROR,
    INGREDIENT_NOT_FOUND_FILE, INGREDIENT_NOT_FOUND_DB, RECIPE_NOT_FOUND_DB, OUT_OF_BOUNDS } from "../resources/language";
import { getBackgroundColor, getTextColor, getLightBackgroundColor, RED } from "../resources/colors";

// Component imports
import { Button } from "./common/Button";
import { Panel } from "./common/Panel";
import { Ingredient } from "../models/Ingredient";
import { IngredientType } from "../models/enums/IngredientType";
import { Recipe } from "../models/Recipe";
import { RecipeIngredient } from "../models/RecipeIngredient";
import { RecipeType } from "../models/enums/RecipeType";
import { Difficulty } from "../models/enums/Difficulty";
import { CookingMethod } from "../models/enums/CookingMethod";
import { TempratureUnit } from "../models/enums/TempratureUnit";
import { QuantityUnit } from "../models/enums/QuantityUnit";
import { Preparation } from "../models/enums/Preparation";
import { Protein } from "../models/enums/Protein";

class UploadPage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = this.initState();

        this.parseFreetext = this.parseFreetext.bind(this);
        this.upload = this.upload.bind(this);
        this.selectFile = this.selectFile.bind(this);
    }

    initState()
    {
        return { freetext: "", filename: "", ingredientQueue: [], recipeQueue: [], errorsQueue: [] };
    }

    componentWillMount()
    {
        this.allRecipes = getRecipeData();
        this.allIngredients = getIngredientData();
        
        setTitle(UPLOAD);
    }

    renderGeneralInformation()
    {
        return (
            <div>
                <h3 style={{ ...getTextColor(this.props.contrastmode) }}>{UPLOAD}</h3>
                <h3 style={{ ...getTextColor(this.props.contrastmode) }}>{WIP}</h3>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{GENERAL_UPLOAD_INFORMATION}</p>
            </div>
        );
    }
    
    renderUploadForm()
    {
        return (
            <div style={{ ...getLightBackgroundColor(this.props.contrastmode) }}>
                <form ref="uploadForm" action="method">
                    {TITLE}<span key="requiredNotifierTitle" style={{ ...{ color: RED } }}>*</span> <input type="text" name="" required/> 
                    <br/>
                    {TYPE}<span key="requiredNotifierType" style={{ ...{ color: RED } }}>*</span> <input type="text" name="" required/>
                    <br/>
                    {GRADE}<span key="requiredNotifierGrade" style={{ ...{ color: RED } }}>*</span> <input type="text" name="" required/>
                    <br/>
                    {RATING}<span key="requiredNotifierRating" style={{ ...{ color: RED } }}>*</span> <input type="text" name="" required/>
                    <br/>
                    {PORTIONS}<span key="requiredNotifierPortions" style={{ ...{ color: RED } }}>*</span> <input type="text" name="" required/>
                    <br/>
                    {PREP_TIME}<span key="requiredNotifierPrepTime" style={{ ...{ color: RED } }}>*</span> <input type="text" name="" required/>
                    <br/>
                    {TOTAL_TIME}<span key="requiredNotifierTotalTime" style={{ ...{ color: RED } }}>*</span> <input type="text" name="" required/>
                    <br/>
                    {COOKING_METHOD} <input type="text" name=""/>
                    <br/>
                    {COOKING_METHOD_TEMPERATURE} <input type="text" name=""/>
                    <br/>
                    {COOKING_METHOD_TEMPERATURE_UNIT} <input type="text" name=""/>
                    <br/>
                    {INGREDIENTS}<span key="requiredNotifierIngredients" style={{ ...{ color: RED } }}>*</span>
                    {/* // Ingredient array, multiple input with option to add more ingredients */}
                    <br/>
                    {INSTRUCTIONS}<span key="requiredNotifierInstructions" style={{ ...{ color: RED } }}>*</span> <input type="text" name="" required/>
                    {/* // Consider textarea for large text fields */}
                    <br/>
                    {TIPS_NOTES} <input type="text" name=""/>
                    <br/>
                    {/* // Once all required fields are filled, validate with the button under  */}
                    {OVERVIEW}
                </form>
            </div>
        );
    }

    renderUploadFile()
    {
        // css-tricks.com/image-upload-manipulation-react/
        // www.w3schools.com/jsref/dom_obj_fileupload.asp
        return (
            <div style={{ ...getLightBackgroundColor(this.props.contrastmode) }}>
                {/* <input id="uploadFileId" ref="uploadFile" type="file"/> */}
                <input id="uploadFileId" ref="uploadFile" type="file" style={{ ...{ display: "none"} }}/>
                <Button onClick={this.selectFile} contrastmode={this.props.contrastmode} text={UPLOAD_CHOOSE_FILE}/> 
                <p>
                    {this.state.filename}
                </p>
            </div>
        );
    }    
    
    renderUploadFreetextArea()
    {
        let textAreaStyle = { resize: "vertical", width: "calc(100% - 0.8em)", paddingLeft: "0.5em" };
        return (
            <div style={{ ...getLightBackgroundColor(this.props.contrastmode) }}> 
                <textarea style={textAreaStyle} onChange={e => {this.setState({ freetext: e.target.value })}} 
                    id="freetextAreaId" ref="freetextArea" cols='60' rows='8'></textarea>
            </div>
        );
    }

    selectFile()
    {
        this.setState({ freetext: "", filename: "" });
        var fileElement = document.getElementById("uploadFileId");
        fileElement.click();

        fileElement.addEventListener("change", (event) =>
        {
            event.stopPropagation();
            event.preventDefault();
            const fileList = event.target.files;
            let file = fileList[0];

            if(!file)
            {
                setRecipeError(NO_FILE_ERROR);
                console.log("No file: " + fileElement.value);
                return;
            }

            let filename = file.name;
            
            // Setup a file reader
            let r = new FileReader();
            r.onload = e =>
            {
                console.log("File set");
                this.setState({ freetext: e.target.result, filename: filename });
                fileElement.value = null;
            };
            r.onerror = err =>
            {
                setRecipeError(FILE_UPLOAD_ERROR);
                console.log(err);
            }

            // Execute file reader
            r.readAsText(file);
        });

    }

    parseIngredient(lines, i, failedItems)
    {
        // let nLines = lines.length;
        let name = lines[0].replace("\t", "").toString().toLowerCase();
        let type = String(lines[1]).toUpperCase().replace("\t", "").toString();
        let price = lines[2];
        let common = false;

        // name cannot be empty or a just a number
        if((name === null || name.length < 1) && isNaN(parseFloat(name)))
        {
            failedItems.push(INGREDIENT + " " + i + " (" + name + "): " + NOT_VALID_NAME + ": \"" + name + "\"");
            return null;
        }

        // type must be parsable to IngredientType
        type = this.parseEnum(failedItems, type, IngredientType, INGREDIENT, i, name);
        if(type === null)
            return null;

        // price must be a number, 0 or more
        price = this.parseNumberFloat(failedItems, price, PRICE, INGREDIENT, i, name, 0, 9999);
        if(price === null)
            return null;

        // common must be "1" or "true" (faux-parse boolean)
        if(lines[3] != null && (lines[3] === "1" ||  lines[3] === "true"))
            common = true;

        return new Ingredient(getRandomString(), name, type, price, common);
    }

    async parseRecipe(lines, i, failedItems)
    {
        let nLines = lines.length;
        let sectionDelim = "+";
        let metaLinesMax = 6;
        let maxArrayItems = 64;

        // Metadata
        let title = lines[0].replace("\t", "").toString();
        let portions = lines[1];
        // let cuisine = lines[1];
        
        // time
        let timeLine = lines[2].toString().split(" ");
        let timePrep = timeLine[0];
        let timeTotal = timeLine[1];
        
        // type, difficulty, rating line. type is required, diff and rate is optional
        let typeDiffRate = lines[3].toString().split(" ");
        let type = typeDiffRate[0].toUpperCase().replace("\t", "");
        let difficulty = typeDiffRate.length > 1 ? typeDiffRate[1].toUpperCase().replace("\t", "") : null;
        let rating = typeDiffRate.length > 2 ? typeDiffRate[2] : null;
        
        // method++ line
        let methodLine = lines[4].toString().split(" ");
        let cookingMethod = methodLine[0].toUpperCase().replace("\t", "");
        let cookingMethodTemp = methodLine.length > 2 ? methodLine[1] : null;
        let cookingMethodTempUnit = methodLine.length > 1 ? methodLine[2].toUpperCase().replace("\t", "") : null;
        let protein = lines[5].toString().toUpperCase().replace("\t", "");

        // Arrays
        let subRecipes = [];
        let recipeIngredients = [];
        let instructions = [];
        let notes = [];

        // Control metadata
        console.log("Gathering metadata...");

        // title cannot be empty or a just a number
        if((title === null || title.length < 1) && isNaN(parseFloat(title)))
        {
            failedItems.push(RECIPE + " " + i + " (" + title + "): " + NOT_VALID_NAME + ": \"" + title + "\"");
            return null;
        }

        // Should be numbers: portions, timePrep, timeTotal, rating, cookingMethodTemp
        // Should be enumns: type, difficulty, cookingMethod, cookingMethodTempUnit, protein
        {
            console.log("Checking numbers...");

            portions = this.parseNumberFloat(failedItems, portions, RECIPE, i, PORTIONS, title, 0, 32);
            if(portions === null)
                return null;

            timePrep = this.parseNumber(failedItems, timePrep, RECIPE, i, PREP_TIME, title, 0, 9999);
            if(timePrep === null)
                return null;

            timeTotal = this.parseNumber(failedItems, timeTotal, RECIPE, i, TOTAL_TIME, title, timePrep, 9999);
            if(timeTotal === null)
                return null;
                
            rating = this.parseNumberFloat(failedItems, rating, RECIPE, i, RATING, title, 0, 10);
            if(rating === null)
                return null;
                
            cookingMethodTemp = this.parseNumber(failedItems, cookingMethodTemp, RECIPE, i, COOKING_METHOD_TEMPERATURE, title, 0, 500);
            if(cookingMethodTemp === null)
                return null;
        } // Recipe metadata parse numbers (the extra parentheses are so this section can be collapsed and make code more readable)
           
        {
            console.log("Checking enums...");
            if(RecipeType[type] === undefined)
            {
                console.log("Error parsing: type");
                failedItems.push(RECIPE + " " + i + " (" + title + "): " + INVALID_TYPE + ": \"" + type + "\"");
                return null;
            }
            else
                type = RecipeType[type];

            if(difficulty != null && Difficulty[difficulty] === undefined)
            {
                console.log("Error parsing: difficulty");
                failedItems.push(RECIPE + " " + i + " (" + title + "): " + INVALID_TYPE + ": \"" + difficulty + "\"");
                return null;
            }
            else
                difficulty = Difficulty[difficulty];

            if(cookingMethod != null && CookingMethod[cookingMethod] === undefined)
            {
                console.log("Error parsing: cookingMethod");
                failedItems.push(RECIPE + " " + i + " (" + title + "): " + INVALID_TYPE + ": \"" + cookingMethod + "\"");
                return null;
            }
            else
                cookingMethod = CookingMethod[cookingMethod];

            if(cookingMethodTempUnit != null && TempratureUnit[cookingMethodTempUnit] === undefined)
            {
                console.log("Error parsing: cookingMethodTempUnit");
                failedItems.push(RECIPE + " " + i + " (" + title + "): " + INVALID_TYPE + ": \"" + cookingMethodTempUnit + "\"");
                return null;
            }
            else
                cookingMethodTempUnit = TempratureUnit[cookingMethodTempUnit];

            if(protein != null && Protein[protein] === undefined)
            {
                console.log("Error parsing: protein");
                failedItems.push(RECIPE + " " + i + " (" + title + "): " + INVALID_TYPE + ": \"" + protein + "\"");
                return null;
            }
            else
                protein = Protein[protein];
        } // Recipe metadata parse enums (the extra parentheses are so this section can be collapsed and make code more readable)
        
        console.log("Preparing ingredients...");
        // Line after metadata should have a + that ends metadata section and starts ingredient section
        let j = (metaLinesMax - 3);
        while (lines[j].trim() !== sectionDelim)
        {
            if(j > metaLinesMax)
            {
                failedItems.push(RECIPE + " " + i + " (" + title + "): " + SECTION_MISSING);
                return null;
            }
            j++;
        }

        // Gather ingredients for recipe
        console.log("Gathering ingredients...");
        let l = j + 1;
        while(lines[l].trim() !== sectionDelim)
        {
            if(l > maxArrayItems)
            {
                failedItems.push(RECIPE + " " + i + " (" + title + "): " + MAX_INGREDIENTS_IN_RECIPE);
                break;
            }

            let recipeIngredientIndex = 0;
            let ingredientLine = lines[l].toString().split(" ");
            let quantity = null;
            let quantityUnit = null;
            let preparation = null;

            // Quantity will always be the first entry
            if(!isNaN(Number(ingredientLine[0])) && Number(ingredientLine[0]) > 0)
            {
                quantity = Number(ingredientLine[0]);
                recipeIngredientIndex++;
            }

            // Quantity unit is always second if not null
            if(recipeIngredientIndex === 1)
            {
                let parsedQUnit = QuantityUnit[ingredientLine[1].toUpperCase().trim()]
                quantityUnit = parsedQUnit === undefined ? null : parsedQUnit;
                if(quantityUnit)
                    recipeIngredientIndex++;
            }

            // Preparation will always be the last entry
            let parsedPrep = Preparation[ingredientLine[ingredientLine.length - 1].toUpperCase().trim()];
            preparation = parsedPrep === undefined ? null : parsedPrep;
            let hasPreparation = preparation === null ? false : true;
            
            let ingredientName = ingredientLine.slice(recipeIngredientIndex, (ingredientLine.length - (hasPreparation ? 1 : 0))).join(" ").toLowerCase();

            if(!ingredientName)
            {
                failedItems.push(RECIPE + " " + i + " (" + title + "): " + INGREDIENT_NOT_FOUND_FILE);
                return null;
            }

            // If the first character in the line is a "-", it's marked as a subrecipe. Find recipe in DB or fail.
            if(ingredientName[0] === "-")
            {
                let subRecipeName = toCamelCase(ingredientName.substring(1, ingredientName.length)).trim();
                let dbSubRecipes = await getRecipeData("title", subRecipeName);
                if(dbSubRecipes.length !== 1)
                {
                    failedItems.push(RECIPE + " " + i + " (" + subRecipeName + "): " + RECIPE_NOT_FOUND_DB);
                    return null;
                }

                subRecipes.push(new RecipeIngredient(dbSubRecipes[0].id, quantity, dbSubRecipes[0].title, quantityUnit, preparation, true));
            }
            else
            {
                let ingredientsDbRes = await getIngredientData("name", ingredientName, 1);
                let ingredient = null;

                if(ingredientsDbRes.length !== 1 && this.props.scraper)
                {
                    ingredient = await getKolonialItemWithCheerio(ingredientName);
                    console.log("upload i");
                    console.log(ingredient);
                    
                    // Would be nice to have a small list saying "added this (INPUTFIELD: name) (Accept button)" where user can change name in inputfield and upload ingredient with accept
                    // TODO Add specially rendered input field and button, should include original name from Kolonial, button triggers function to upload single ingredient
                    failedItems.push("<div className='rowStyle'>" + RECIPE + " " + i + " (" + ingredientName + "): " + INGREDIENT_NOT_FOUND_DB + "</div>"
                        + "<div className='rowStyle'>" + "Create new?: " + ingredient.original_name
                        + <Button onClick={() => window.open("https://kolonial.no")} contrastmode={this.props.contrastmode} text={"Kolonial"}/> + "</div>");
                    
                    return null;
                    // l++;
                    // continue;
                }
                else if(ingredientsDbRes.length !== 1)
                {
                    failedItems.push(RECIPE + " " + i + " (" + ingredientName + "): " + INGREDIENT_NOT_FOUND_DB);
                    return null;
                }
                else
                    ingredient = ingredientsDbRes[0];
                
                recipeIngredients.push(new RecipeIngredient(ingredient.id, quantity, ingredient.name, quantityUnit, preparation));
            }
            l++;
        }
        
        // Gather instructions
        console.log("Gathering instructions...");
        let m = l + 1;
        while(lines[m].trim() !== sectionDelim && m < nLines)
        {
            instructions.push(lines[m].toString());

            if(m > maxArrayItems)
            {
                failedItems.push(RECIPE + " " + i + " (" + title + "): " + MAX_INSTRUCTIONS_IN_RECIPE);
                break;
            }
            m++;
        }
        
        // Gather notes
        console.log("Gathering notes...");
        let n = m + 1;
        while(n < nLines)
        {
            notes.push(lines[n].toString());

            if(n > maxArrayItems)
            {
                failedItems.push(RECIPE + " " + i + " (" + title + "): " + MAX_NOTES_IN_RECIPE);
                break;
            }
            n++;
        }

        return new Recipe(getRandomString(), 
        toCamelCase(title), 
        type, 
        difficulty,
        rating, 
        portions, 
        timePrep, 
        timeTotal, 
        cookingMethod, 
        cookingMethodTemp, 
        cookingMethodTempUnit, 
        protein,
        recipeIngredients, 
        subRecipes,
        instructions, 
        notes);
    }

    parseNumber(messageArray, n, valueName, parentType, index, itemName, min, max)
    {
        if(isNaN(Number(n)))
        {
            messageArray.push(parentType + " " + index + " (" + itemName + "): " + NOT_A_NUMBER + ": " + valueName);
            return null;
        }
        else if(Number(n) < min || Number(n) > max)
        {
            messageArray.push(parentType + " " + index + " (" + itemName + "): " + OUT_OF_BOUNDS + ": " + valueName);
            return null;
        }
        
        return Number(n);
    }

    parseNumberFloat(messageArray, n, valueName, parentType, index, itemName, min, max)
    {
        if(isNaN(parseFloat(n)))
        {
            messageArray.push(parentType + " " + index + " (" + itemName + "): " + NOT_A_NUMBER + ": " + valueName);
            return null;
        }
        else if(parseFloat(n) < min || parseFloat(n) > max)
        {
            messageArray.push(parentType + " " + index + " (" + itemName + "): " + OUT_OF_BOUNDS + ": " + valueName);
            return null;
        }
        
        return parseFloat(n);
    }

    parseEnum(messageArray, value, enumCollection, parentType, index, itemName)
    {
        if(!isNaN(value) || enumCollection[value] === undefined)
        {
            messageArray.push(parentType + " " + index + " (" + itemName + "): " + INVALID_TYPE + ": \"" + value + "\"");
            return null;
        }
        
        return enumCollection[value];
    }

    async parseFreetext()
    {
        let freetext = this.state.freetext;
        if(freetext === "")
        {
            this.setState({ errorsQueue: [ FREETEXT_MISSING ] });
            return;
        }

        this.setState({ ingredientQueue: [], recipeQueue: [], errorsQueue: [] });
        // Split text on exclamation marks. First instance ([0]) in items should be empty because an item starts with !, i.e. the data is after.
        let ingredients = [];
        let recipes = [];
        let failedItems = [];
        let items = freetext.split("!");

        if(items.length <= 1)
        {
            this.setState({ errorsQueue: [NO_VALID_ITEMS_IN_FILE] });
            return;
        }

        for (let i = 1; i < items.length; i++)
        {
            let lines = items[i].split(/\r?\n/).filter(e => e);
            let nLines = lines.length;

            console.log(i + ": nLines: " + nLines);
            console.log(items[i]);

            // Ingredient has 3 mandatory lines, 1 optional
            // Accepted number of lines for ingredient: 3, 4
            if(nLines === 3 || nLines === 4)
            {
                let parsedIngredient = this.parseIngredient(lines, i, failedItems);
                if(parsedIngredient === null)
                    continue;
                
                ingredients.push(parsedIngredient);
            }

            // Recipe has 10 mandatory lines, potentially infinite
            // Accepted number of lines for ingredient: 10+
            else if(nLines > 9)
            {
                let parsedRecipe = await this.parseRecipe(lines, i, failedItems);
                if(parsedRecipe === null)
                    continue;
                
                recipes.push(parsedRecipe);
            }

            else
                failedItems.push(ELEMENT + " " + i + " (" + "?" + "): " + FAILED); // Unknown entity
        }

        console.log("\nEnqueueing items...");
        this.setState({ filename: "", freetext: "", ingredientQueue: ingredients, recipeQueue: recipes, errorsQueue: failedItems });
    }

    async upload()
    {
        if(this.state.errorsQueue.length > 0)
        {
            this.state.errorsQueue.forEach(e => {
                console.log(e);
            });
        }

        if(this.state.ingredientQueue.length === 0 && this.state.recipeQueue.length === 0)
            console.log("No ingredients or recipes in queue to upload");
        else
        {
            this.setState({ errorsQueue: [] });

            if(this.state.ingredientQueue.length > 0)
            {
                let failedUploads = [];
                
                // For each, look for ingredient with the same name, and ID.
                // If no duplicates, upload async.
                // TODO: Consider hash excluding name?,  name could look for 90% match? for similar, include hash? same hash for price and type only, with x% match on name?
                var iQueue = this.state.ingredientQueue;
                for (var j = 0; j < iQueue.length; j++) 
                {
                    const i = iQueue[j];
                    console.log("\nUploading ingredient: " + i.name);

                    let byNameData = await getIngredientData("name", i.name);
                    if(byNameData !== undefined && byNameData.length !== 0)
                    {
                        failedUploads.push(INGREDIENT + " \"" + i.name + "\": " + SIMILAR_IN_DB + ": " + byNameData[0].name);
                        this.setState({ errorsQueue: failedUploads });
                        continue;
                    }

                    let byIdData = await getIngredientData("id", i.id);
                    if(byIdData !== undefined && byIdData.length !== 0)
                    {
                        failedUploads.push(INGREDIENT + " \"" + i.id + "\": " + SIMILAR_IN_DB + ", ID: " + byIdData[0].id);
                        this.setState({ errorsQueue: failedUploads });
                        continue;
                    }
                    
                    console.log("Ingredients ok, will upload async.");
                    setIngredientData(i);
                }
                    
                this.setState({ ingredientQueue: [] });
            }

            if(this.state.recipeQueue.length > 0)
            {
                let failedUploads = [];
                
                var rQueue = this.state.recipeQueue;
                for (var j = 0; j < rQueue.length; j++) 
                {
                    const r = rQueue[j];
                    console.log("\nUploading recipes: " + r.title);

                    let byNameData = await getRecipeData("title", r.title);
                    if(byNameData !== undefined && byNameData.length !== 0)
                    {
                        failedUploads.push(RECIPE + " \"" + r.title + "\": " + SIMILAR_IN_DB + ": " + byNameData[0].title);
                        this.setState({ errorsQueue: failedUploads });
                        continue;
                    }

                    let byIdData = await getRecipeData("id", r.id);
                    if(byIdData !== undefined && byIdData.length !== 0)
                    {
                        failedUploads.push(RECIPE + " \"" + r.id + "\": " + SIMILAR_IN_DB + ", ID: " + byIdData[0].id);
                        this.setState({ errorsQueue: failedUploads });
                        continue;
                    }
                    
                    console.log("Recipe ok, will upload async.");
                    setRecipeData(r);
                }

                this.setState({ recipeQueue: [] });
            }
        }
    }

    renderUploadButtons()
    {
        if(this.props.ingredientLoading || this.props.recipeLoading)
            return renderLoading(false, this.props.contrastmode);

        if(this.props.ingredientError || this.props.recipeError)
            return renderError((this.props.ingredientError || this.props.recipeError), false, this.props.contrastmode);

        // Since components can be stubborn and refuse to re-render with new props, 
        // get a variable that chages (like ms) and set it as a key, this forces the component to re-render.
        let ms = new Date().getMilliseconds();
        
        return (
            <div style={{ ...getLightBackgroundColor(this.props.contrastmode) }}>
                {this.queue ? <p style={{ ...getTextColor(this.props.contrastmode) }}>{UPLOAD_QUEUE + ": " + this.queue}</p> : (null)}

                <div className="rowStyle">
                    <Button key={"validateButton" + ms} onClick={this.parseFreetext} contrastmode={this.props.contrastmode} text={VALIDATE_UPLOAD_DATA}/> 
                    
                    <Button key={"uploadButton" + ms} onClick={(this.state.ingredientQueue.length > 0 || this.state.recipeQueue.length > 0 ? this.upload : (null))} 
                    contrastmode={this.props.contrastmode} text={UPLOAD}/> 
                </div>
            </div>
        );
    }

    renderUploadSummary()
    {
        let textAreaStyle = { resize: "vertical", width: "calc(100% - 0.8em)", paddingLeft: "0.5em" };
        let rows = "8";

        let failedQueue = this.state.errorsQueue;
        let failedList = [];
        failedQueue.forEach(e => 
        {
            failedList.push(<li>{e}</li>);
        });
        let failedData = failedQueue.length === 0 ? null : <ul>{failedList}</ul>; // null, empty, "...", "nothing here yet", or "no fails"

        let ingredientQueue = this.state.ingredientQueue;
        let ingredientData = ingredientQueue.length === 0 ? null :
            <textarea style={textAreaStyle} rows={rows} disabled readonly>
                {JSON.stringify(ingredientQueue, null, 2).toString()}
            </textarea>;

        let recipeQueue = this.state.recipeQueue;
        let recipeData = recipeQueue.length === 0 ? null :
            <textarea style={textAreaStyle} rows={rows} disabled readonly>
                {JSON.stringify(recipeQueue, null, 2).toString()}
            </textarea>;

        return (
            <div style={{ ...getLightBackgroundColor(this.props.contrastmode) }}>
                <h2 style={{ ...getTextColor(this.props.contrastmode) }}>{FAILED_ITEMS}</h2>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{failedData}</p>
                <h2 style={{ ...getTextColor(this.props.contrastmode) }}>{INGREDIENTS}</h2>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{ingredientData}</p>
                <h2 style={{ ...getTextColor(this.props.contrastmode) }}>{RECIPES}</h2>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{recipeData}</p>
            </div>
        );
    }

    renderContent()
    {
        return (
            <div>
                {this.renderGeneralInformation()}
                <hr/>
                {/* In debth nformation about how to upload */}
                <Panel title={MORE_INFORMATION} contrastmode={this.props.contrastmode}>
                    <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_INFO}</p>
                    <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_INPUT_INFO}</p>
                    <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_START}</p>
                    <hr/>
                    <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_DELIM}</p>
                    <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_NAME}</p>
                    <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_TYPE}</p>
                    <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_PRICE}</p>
                    <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_COMMON}</p>
                    <hr/>
                    <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_EXAMPLE_START}</p>
                    <hr/>
                    <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_DELIM}</p>
                    <p style={{ ...getTextColor(this.props.contrastmode) }}>{SEASALT}</p>
                    <p style={{ ...getTextColor(this.props.contrastmode) }}>{SPICE}</p>
                    <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_EXAMPLE_PRICE}</p>
                    <p style={{ ...getTextColor(this.props.contrastmode) }}>{TRUE}</p>
                    <hr/>
                    <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_INFO_EXCLAMATION}</p>
                    <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_INFO_TYPES}</p>
                    <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_INFO_PRICE}</p>
                    <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_INFO_COMMON}</p>
                    <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_INFO_KOLONIAL}</p>
                    <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_INFO_OVERVIEW}</p>
                </Panel>

                {/* <hr/> */}
                {/* Option to upload using a html input form */}
                {/* <Panel title={UPLOAD_FORM} contrastmode={this.props.contrastmode}>
                    {this.renderUploadForm()}
                </Panel> */}

                <hr/>
                {/* Upload ingredients though freetext
                    -> Submit files buttons/ drag+drop area */}
                <Panel title={FREETEXT} contrastmode={this.props.contrastmode}>  {/* Should be freetext not file */}
                    {this.renderUploadFreetextArea()}
                    {this.renderUploadFile()}
                </Panel>

                <hr/>
                <Panel title={OVERVIEW} contrastmode={this.props.contrastmode} startExpanded>
                    {/* Buttons to validate input
                    Specific info about what's about to be uploaded (number of items, name/title of items)
                    Upload buttons (if validation successful) */}
                    {this.renderUploadButtons()}

                    {/* Render a log or summary for uplodaing queues. */}
                    {this.renderUploadSummary()}
                </Panel>

            </div>);
    }

    render()
    {
        return (
            <div style={getBackgroundColor(this.props.contrastmode)}>
                <div className="pageRootContainer">
                    <div style={{ ...getBackgroundColor(this.props.contrastmode) }}>
                        {this.renderContent()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => 
{
    const { contrastmode, scraper } = state.settings;
    const { recipeError, recipeLoading, recipeResult } = state.recipe;
    const { ingredientError, ingredientLoading, ingredientResult } = state.ingredient;
    return { contrastmode, scraper,
        recipeError, recipeLoading, recipeResult, 
        ingredientError, ingredientLoading, ingredientResult };
};
  
export default connect(
    mapStateToProps, { getRecipeData, getIngredientData }
)(UploadPage);