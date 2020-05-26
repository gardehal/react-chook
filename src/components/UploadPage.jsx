import React from "react";
import { connect } from "react-redux";

// Redux imports
import { getRecipeData, setRecipeError } from "../actions/RecipeActions";
import { getIngredientData, setIngredientData } from "../actions/IngredientActions";
import { renderLoading, renderError, setTitle, getRandomString } from "../resources/Shared";

// Variable imports
import { UPLOAD, WIP, GENERAL_UPLOAD_INFORMATION, UPLOAD_FORM, UPLOAD_FILE, UPLOAD_QUEUE, OVERVIEW, UPLOAD_CHOOSE_FILE, TITLE, TYPE, 
    GRADE, RATING, PORTIONS, PREP_TIME, TOTAL_TIME, COOKING_METHOD, COOKING_METHOD_TEMPERATURE, COOKING_METHOD_TEMPERATURE_UNIT, 
    INGREDIENTS, INSTRUCTIONS, TIPS_NOTES, FILE_UPLOAD_ERROR, NO_FILE_ERROR, FILE_SELECTED, VALIDATE_UPLOAD_DATA, NO_VALID_ITEMS_IN_FILE,
    INGREDIENT, FAILED, PRICE, NOT_VALID_NAME, NOT_A_NUMBER, NUMBER_BELOW_ZERO, NOT_AN_INGREDIENTTYPE, FAILED_ITEMS, RECIPES, MORE_INFORMATION, 
    FREETEXT_INFO, FREETEXT_INPUT_INFO, FREETEXT_SYNTAX_START, FREETEXT_SYNTAX_DELIM, FREETEXT_SYNTAX_NAME, FREETEXT_SYNTAX_TYPE, FREETEXT_SYNTAX_PRICE, 
    FREETEXT_SYNTAX_COMMON, FREETEXT_SYNTAX_EXAMPLE_START, SEASALT, SPICE, FREETEXT_SYNTAX_EXAMPLE_PRICE, TRUE, 
    FREETEXT_SYNTAX_INFO_EXCLAMATION, FREETEXT_SYNTAX_INFO_TYPES, FREETEXT_SYNTAX_INFO_PRICE, FREETEXT_SYNTAX_INFO_COMMON, FREETEXT_SYNTAX_INFO_KOLONIAL, 
    FREETEXT_SYNTAX_INFO_OVERVIEW, ELEMENT, SIMILAR_IN_DB } from "../resources/language";
import { getBackgroundColor, getTextColor, getLightBackgroundColor, RED } from "../resources/colors";

// Component imports
import { Button } from "./common/Button";
import { Panel } from "./common/Panel";
import { Ingredient } from "../models/Ingredient";
import { IngredientType } from "../models/enums/IngredientType";

// Create a list of measurement units to check for later // TODO move to enums
const temperaturesUnits = ["k", "c", "f"];
const siUnitsWeight = ["mg", "milligram", "g", "gram", "dag", "decagram", "hg", "hekto", "hektogram", "kg", "kilogram"];
const siUnitsLength = ["cm", "centimeter"];
const siUnitsVolume = ["ml", "milliliter", "cl", "centiliter", "dl", "deciliter", "l", "liter"];
const impUnitsWeight = ["gr", "grain", "oz", "ounce", "ib", "pound", "st", "stone", "qt", "qr", "kvart"];
const impUnitsLength = ["\"", "inch", "inches", "tommer", "\'", "fot", "feet"];
const impUnitsVolume = ["oz", "ounce", "pt", "pint", "qt", "kvart", "gal", "gallon"];
const toolUnits = ["ts", "teskje", "ss", "spiseskje", "c", "kopp"];
const miscUnits = ["fedd", "klype", "neve", "never", "litt", "dråpe", "dram", "blad", "blader", "terning", "porsjon", "porsjoner", "skiver", "stilk", "stilker", "kuler"];
const wholeUnits = ["hel", "hele", "pakke", "enhet", "mye", "masse", "bunt", "bunter", "flaske", "boks", "bokser"];
const allUnits = toolUnits.concat(miscUnits, wholeUnits, siUnitsWeight, siUnitsLength, siUnitsVolume, impUnitsWeight, impUnitsLength, impUnitsVolume);

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
                if(IngredientType[type] === undefined)
                {
                    failedItems.push(INGREDIENT + " " + i + " (" + name + "): " + NOT_AN_INGREDIENTTYPE + ": \"" + type + "\"");
                    continue;
                }
                // Int index of IngredientType? 
                else
                    type = IngredientType[type];

                // price must be a number, 0 or more
                if(isNaN(parseFloat(price)))
                {
                    failedItems.push(INGREDIENT + " " + i + " (" + name + "): " + NOT_A_NUMBER + ": " + PRICE);
                    continue;
                }
                else if(parseFloat(price) < 0)
                {
                    failedItems.push(INGREDIENT + " " + i + " (" + name + "): " + NUMBER_BELOW_ZERO + ": " + PRICE);
                    continue;
                }
                else
                    price = parseFloat(price);

                // common must be "1" or "true" (faux-parse boolean)
                if(lines[3] != null && (lines[3] === "1" ||  lines[3] === "true"))
                    common = true;

                ingredients.push(new Ingredient(getRandomString(), name, type, price, common));
            }

            // Recipe has 10 mandatory lines, potentially infinite
            // Accepted number of lines for ingredient: 10+
            else if(nLines > 9)
            {
                console.log("Reciepe");

            }

            else
                failedItems.push(ELEMENT + " " + i + " (" + "?" + "): " + FAILED);
        }

        console.log("\nEnqueueing items...");
        this.setState({ filename: "", freetext: "", ingredientQueue: ingredients, recipeQueue: recipes, errorsQueue: failedItems });
    }

    // TODO Upload entity should use ID given, not auto set
    upload()
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
                    if(getIngredientData("name", i.name).length > 0)
                        failedUploads.push(INGREDIENT + " \"" + i.name + "\": " + SIMILAR_IN_DB);
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
        let textAreaStyle = { resize: "vertical", width: "calc(100% - 0.9em)", paddingLeft: "0.5em" };
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