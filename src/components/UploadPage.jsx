import React from "react";
import { connect } from "react-redux";

// Redux imports
import { getRecipeData, setRecipeError } from "../actions/RecipeActions";
import { getIngredientData, setIngredientData } from "../actions/IngredientActions";
import { renderLoading, renderError, setTitle, getRandomString } from "../resources/Shared";

// Variable imports
import { UPLOAD, WIP, GENERAL_UPLOAD_INFORMATION, UPLOAD_FORM, UPLOAD_FILE, UPLOAD_QUEUE, OVERVIEW, UPLOAD_CHOOSE_FILE, TITLE, TYPE, 
    GRADE, RATING, PORTIONS, PREP_TIME, TOTAL_TIME, COOKING_METHOD, COOKING_METHOD_TEMPERATURE, COOKING_METHOD_TEMPERATURE_UNIT, 
    INGREDIENTS, INSTRUCTIONS, TIPS_NOTES, FILE_UPLOAD_ERROR, NO_FILE_ERROR, VALIDATE_UPLOAD_DATA, NO_VALID_ITEMS_IN_FILE,
    INGREDIENT, RECIPE, FAILED, PRICE, NOT_VALID_NAME, NOT_A_NUMBER, NUMBER_BELOW_ZERO, NOT_AN_INGREDIENTTYPE, INVALID_TYPE, FAILED_ITEMS, RECIPES, MORE_INFORMATION, 
    FREETEXT_INFO, FREETEXT_INPUT_INFO, FREETEXT_SYNTAX_START, FREETEXT_SYNTAX_DELIM, FREETEXT_SYNTAX_NAME, FREETEXT_SYNTAX_TYPE, FREETEXT_SYNTAX_PRICE, 
    FREETEXT_SYNTAX_COMMON, FREETEXT_SYNTAX_EXAMPLE_START, SEASALT, SPICE, FREETEXT_SYNTAX_EXAMPLE_PRICE, TRUE, 
    FREETEXT_SYNTAX_INFO_EXCLAMATION, FREETEXT_SYNTAX_INFO_TYPES, FREETEXT_SYNTAX_INFO_PRICE, FREETEXT_SYNTAX_INFO_COMMON, FREETEXT_SYNTAX_INFO_KOLONIAL, 
    FREETEXT_SYNTAX_INFO_OVERVIEW, ELEMENT, SIMILAR_IN_DB, SECTION_MISSING, MAX_INGREDIENTS_IN_RECIPE, MAX_INSTRUCTIONS_IN_RECIPE, MAX_NOTES_IN_RECIPE, ERROR,
    INGREDIENT_NOT_FOUND_FILE, INGREDIENT_NOT_FOUND_DB, OUT_OF_BOUNDS } from "../resources/language";
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
        return (
            <div style={{ ...getLightBackgroundColor(this.props.contrastmode) }}> 
            <textarea cols='60' rows='8'></textarea>
                <Button onClick={this.selectFile} contrastmode={this.props.contrastmode} text={UPLOAD_CHOOSE_FILE}/>
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

    // TODO move parse ingredients and recipe to functions
    parseIngredient()
    {

    }

    parseRecipe()
    {

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
        if(enumCollection[value] === undefined)
        {
            messageArray.push(parentType + " " + index + " (" + itemName + "): " + INVALID_TYPE + ": \"" + value + "\"");
            return null;
        }
        
        return enumCollection[value];
    }

    parseFreetext()
    {
        this.setState({ ingredientQueue: [], recipeQueue: [], errorsQueue: [] });
        // Split text on exclamation marks. First instance ([0]) in items should be empty because an item starts with !, i.e. the data is after.
        let ingredients = [];
        let recipes = [];
        let failedItems = [];
        let items = this.state.freetext.split("!");

        if(items.length <= 1)
        {
            this.setState({ errorsQueue: [NO_VALID_ITEMS_IN_FILE] });
            return;
        }

        forItemsLoop: for (let i = 1; i < items.length; i++)
        {
            let lines = items[i].split(/\r?\n/).filter(e => e);
            let nLines = lines.length;

            console.log(i + ": nLines: " + nLines);
            console.log(items[i]);

            // Ingredient has 3 mandatory lines, 1 optional
            // Accepted number of lines for ingredient: 3, 4
            if(nLines === 3 || nLines === 4)
            {
                let name = lines[0].replace("\t", "").toString();
                let type = String(lines[1]).toUpperCase().replace("\t", "").toString();
                let price = lines[2];
                let common = false;

                // name cannot be empty or a just a number
                if((name === null || name.length < 1) && isNaN(parseFloat(name)))
                {
                    failedItems.push(INGREDIENT + " " + i + " (" + name + "): " + NOT_VALID_NAME + ": \"" + name + "\"");
                    continue;
                }

                // type must be parsable to IngredientType
                type = this.parseEnum(failedItems, type, IngredientType, INGREDIENT, i, name);
                if(type === null)
                    continue;

                // price must be a number, 0 or more
                price = this.parseNumberFloat(failedItems, price, PRICE, INGREDIENT, i, name, 0, 9999);
                console.log("price: " + price);
                if(price === null)
                    continue;

                // common must be "1" or "true" (faux-parse boolean)
                if(lines[3] != null && (lines[3] === "1" ||  lines[3] === "true"))
                    common = true;

                ingredients.push(new Ingredient(getRandomString(), name, type, price, common));
            }

            // Recipe has 10 mandatory lines, potentially infinite
            // Accepted number of lines for ingredient: 10+
            else if(nLines > 9)
            {
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
                let recipeIngredients = [];
                let instructions = [];
                let notes = [];

                // Control metadata
                console.log("Gathering metadata...");

                // title cannot be empty or a just a number
                if((title === null || title.length < 1) && isNaN(parseFloat(title)))
                {
                    failedItems.push(RECIPE + " " + i + " (" + title + "): " + NOT_VALID_NAME + ": \"" + title + "\"");
                    continue;
                }

                // Should be numbers: portions, timePrep, timeTotal, rating, cookingMethodTemp
                // Should be enumns: type, difficulty, cookingMethod, cookingMethodTempUnit, protein
                {
                    console.log("Checking numbers...");

                    portions = this.parseNumberFloat(failedItems, portions, RECIPE, i, PORTIONS, title, 0, 32);
                    if(portions === null)
                        continue;

                    timePrep = this.parseNumber(failedItems, timePrep, RECIPE, i, PREP_TIME, title, 0, 9999);
                    if(timePrep === null)
                        continue;

                    timeTotal = this.parseNumber(failedItems, timeTotal, RECIPE, i, TOTAL_TIME, title, timePrep, 9999);
                    if(timeTotal === null)
                        continue;
                        
                    rating = this.parseNumberFloat(failedItems, rating, RECIPE, i, RATING, title, 0, 10);
                    if(rating === null)
                        continue;
                        
                    cookingMethodTemp = this.parseNumber(failedItems, cookingMethodTemp, RECIPE, i, COOKING_METHOD_TEMPERATURE, title, 0, 500);
                    if(cookingMethodTemp === null)
                        continue;
                } // Recipe metadata parse numbers (the extra parentheses are so this section can be collapsed and make code more readable)
                   
                {
                    console.log("Checking enums...");
                    if(RecipeType[type] === undefined)
                    {
                        console.log("Error parsing: type");
                        failedItems.push(RECIPE + " " + i + " (" + title + "): " + INVALID_TYPE + ": \"" + type + "\"");
                        continue;
                    }
                    else
                        type = RecipeType[type];

                    if(difficulty != null && Difficulty[difficulty] === undefined)
                    {
                        console.log("Error parsing: difficulty");
                        failedItems.push(RECIPE + " " + i + " (" + title + "): " + INVALID_TYPE + ": \"" + difficulty + "\"");
                        continue;
                    }
                    else
                        difficulty = Difficulty[difficulty];

                    if(cookingMethod != null && CookingMethod[cookingMethod] === undefined)
                    {
                        console.log("Error parsing: cookingMethod");
                        failedItems.push(RECIPE + " " + i + " (" + title + "): " + INVALID_TYPE + ": \"" + cookingMethod + "\"");
                        continue;
                    }
                    else
                        cookingMethod = CookingMethod[cookingMethod];

                    if(cookingMethodTempUnit != null && TempratureUnit[cookingMethodTempUnit] === undefined)
                    {
                        console.log("Error parsing: cookingMethodTempUnit");
                        failedItems.push(RECIPE + " " + i + " (" + title + "): " + INVALID_TYPE + ": \"" + cookingMethodTempUnit + "\"");
                        continue;
                    }
                    else
                        cookingMethodTempUnit = TempratureUnit[cookingMethodTempUnit];

                    if(protein != null && Protein[protein] === undefined)
                    {
                        console.log("Error parsing: protein");
                        failedItems.push(RECIPE + " " + i + " (" + title + "): " + INVALID_TYPE + ": \"" + protein + "\"");
                        continue;
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
                        continue forItemsLoop;
                    }
                    j++;
                }

                // TODO sub-recipes, find ingredients in db
                // Gather ingredients for recipe
                console.log("Gathering ingredients...");
                let l = j;
                while(lines[l].trim() !== sectionDelim)
                {
                    if(l > maxArrayItems)
                    {
                        failedItems.push(RECIPE + " " + i + " (" + title + "): " + MAX_INGREDIENTS_IN_RECIPE);
                        break;
                    }

                    let ingredientLine = lines[l].toString().split(" ");
                    let quantity = 1;
                    let quantityUnit = null;
                    let recipeIngredient = null;
                    let preparation = null;

                    {
                        let recipeIngredientIndex = 0;
                        let hasPreparation = false;

                        // Quantity will always be the first entry
                        if(!isNaN(parseFloat(ingredientLine[0])) && parseFloat(ingredientLine[0]) > 0)
                        {
                            quantity = Number(ingredientLine[0]);
                            recipeIngredientIndex++;
                        }

                        // Quantity unit is always second if not null
                        if(recipeIngredientIndex === 1 && QuantityUnit[ingredientLine[1]] !== undefined)
                        {
                            quantityUnit = QuantityUnit[quantityUnit];
                            recipeIngredientIndex++;
                        }

                        // Preparation will always be the last entry
                        if(Preparation[ingredientLine[ingredientLine.length - 1]] !== undefined)
                        {
                            quantityUnit = Preparation[quantityUnit];
                            hasPreparation = true;
                        }
                        
                        let ingredientTitle = lines.slice(recipeIngredientIndex, (ingredientLine.length - (hasPreparation ? 1 : 0)))

                        if(ingredientTitle === null)
                        {
                            failedItems.push(RECIPE + " " + i + " (" + title + "): " + INGREDIENT_NOT_FOUND_FILE);
                            continue forItemsLoop;
                        }

                        let recipeIngredient = getIngredientData("title", ingredientTitle)

                        if(recipeIngredient === null)
                        {
                            failedItems.push(RECIPE + " " + i + " (" + title + "): " + INGREDIENT_NOT_FOUND_DB);
                            continue forItemsLoop;
                        }
                    } // Recipe recipe ingredients numbers and enums (the extra parentheses are so this section can be collapsed and make code more readable)

                    recipeIngredients.push(new RecipeIngredient(quantity, recipeIngredient, quantityUnit, preparation));
                    l++;
                }
                
                //TODO Errors getting values, all goes to notes
                // Gather instructions
                console.log("Gathering instructions...");
                let m = l;
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
                let n = m;
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

                let recipeObject = new Recipe(getRandomString(), 
                title, 
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
                instructions, 
                notes);

                console.log(recipeObject);
                recipes.push(recipeObject);
            }

            else
                failedItems.push(ELEMENT + " " + i + " (" + "?" + "): " + FAILED); // Unknown entity
        }

        console.log("\nEnqueueing items...");
        this.setState({ filename: "", freetext: "", ingredientQueue: ingredients, recipeQueue: recipes, errorsQueue: failedItems });
    }

    // TODO Upload entity should use ID given, not auto set
    async upload()
    {
        if(this.state.errorsQueue.length > 0)
        {
            this.state.errorsQueue.forEach(f => {
                console.log(f);
            });
        }

        if(this.state.ingredientQueue.length === 0 && this.state.recipeQueue.length === 0)
        {
            console.log("No ingredients or recipes in queue to upload");
        }
        else
        {
            this.setState({ errorsQueue: [] });

            if(this.state.ingredientQueue.length > 0)
            {
                let toUpload = [];
                let failedUploads = [];
                this.state.ingredientQueue.forEach(i => 
                {
                    // Same/similar name? hash?
                    console.log("\nUploading ingredient: " + i.name);
                    console.log(getIngredientData("name", i.name).result.name != undefined);
                    
                    if(getIngredientData("name", i.name)..name != undefined)
                        failedUploads.push(INGREDIENT + " \"" + i.name + "\": " + SIMILAR_IN_DB + ": " + i.name);
                    else if(getIngredientData("id", i.id).length > 0)
                        failedUploads.push(INGREDIENT + " \"" + i.name + "\": " + SIMILAR_IN_DB + ", ID: " + i.id);
                    else
                        toUpload.push(i);
                });
                
                setIngredientData(toUpload);
                this.setState({ errorsQueue: failedUploads, ingredientQueue: [] });
            }

            if(this.state.recipeQueue.length > 0)
            {
                // setIngredientData(this.state.recipeQueue);
                console.log("TODO: upload recipes");
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
                <Panel title={UPLOAD_FILE} contrastmode={this.props.contrastmode}>
                    {this.renderUploadFile()}
                    {/* {this.renderUploadFreetextArea()} */}
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
    const { contrastmode } = state.settings;
    const { recipeError, recipeLoading, recipeResult } = state.recipe;
    const { ingredientError, ingredientLoading, ingredientResult } = state.ingredient;
    return { contrastmode, 
        recipeError, recipeLoading, recipeResult, 
        ingredientError, ingredientLoading, ingredientResult };
};
  
export default connect(
    mapStateToProps, { getRecipeData, getIngredientData }
)(UploadPage);