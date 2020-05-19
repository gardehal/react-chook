import React from "react";
import { connect } from "react-redux";

// Redux imports
import { getRecipeData, setRecipeError } from "../actions/RecipeActions";
import { getIngredientData, setIngredientData } from "../actions/IngredientActions";
import { renderLoading, renderError, setTitle } from "../resources/Shared";

// Variable imports
import { UPLOAD, WIP, GENERAL_UPLOAD_INFORMATION, UPLOAD_FORM, UPLOAD_FILE, UPLOAD_QUEUE, OVERVIEW, UPLOAD_CHOOSE_FILE, TITLE, TYPE, GRADE, RATING, PORTIONS, PREP_TIME, TOTAL_TIME, COOKING_METHOD, COOKING_METHOD_TEMPERATURE, COOKING_METHOD_TEMPERATURE_UNIT, INGREDIENTS, INSTRUCTIONS, TIPS_NOTES, FILE_UPLOAD_ERROR, NO_FILE_ERROR, FILE_SELECTED } from "../resources/language";
import { getBackgroundColor, getTextColor, getLightBackgroundColor, RED } from "../resources/colors";

// Component imports
import { Button } from "./common/Button";
import { Panel } from "./common/Panel";
import { Ingredient } from "../models/Ingredient";
import { IngredientType } from "../models/IngredientType";

class UploadPage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = this.initState();

        this.upload = this.upload.bind(this);
        this.selectFile = this.selectFile.bind(this);
    }

    initState()
    {
        return { queue: [], filename: "", filecontent: "" };
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
                    // Ingredient array, multiple input with option to add more ingredients
                    <br/>
                    {INSTRUCTIONS}<span key="requiredNotifierInstructions" style={{ ...{ color: RED } }}>*</span> <input type="text" name="" required/>
                    // Consider textarea for large text fields
                    <br/>
                    {TIPS_NOTES} <input type="text" name=""/>
                    <br/>
                    // Once all required fields are filled, validate with the button under {OVERVIEW}
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

    // Smoother way?
    selectFile()
    {
        this.setState({ filename: "" });
        var fileElement = document.getElementById("uploadFileId");
        fileElement.click();

        fileElement.onchange = () =>
        {
            if(!fileElement.value) 
            {
                setRecipeError(NO_FILE_ERROR);
                console.log("No file: " + fileElement.value);
                return;
            }

            let filename = fileElement.value.split("\\");
            filename = filename[filename.length - 1];
            this.setState({ filename: FILE_SELECTED + ": \"" + filename + "\"" });
            
            // Setup a file reader
            const r = new FileReader();
            r.onload = e =>
            {
                console.log("File set"); // not resetting
                this.setState({ queue: ["file"], filecontent: e.target.result });
            };
            r.onerror = err =>
            {
                setRecipeError(FILE_UPLOAD_ERROR);
                console.log(err);
            }
            // Execute file reader
            r.readAsText(fileElement.files[0]);
        };

    }

    uploadFromFile(text)
    {
        // Split text on exclamation marks. First instance ([0]) in items should be empty because an item starts with !, i.e. the data is after.
        let items = text.split("!");
        let ingredients = [];
        let recipes = [];
        let failedItems = [];

        for (let i = 1; i < items.length; i++)
        {
            let lines = items[i].split("\n");
            let nLines = lines.length;

            console.log("item, nLines: " + nLines);
            console.log(items[i]);

            // Ingredient has 4 lines including !
            if(nLines === 4)
            {
                console.log("Ingredient");

                // Line number 3 must be an IngredientType
                let type = String(lines[2]).toUpperCase().replace("\r", "").replace("\t", "");
                if(!IngredientType.includes(type))
                {
                    failedItems.push("Ingredient " + String(i) + " failed. \"" + type + "\" is not a valid IngredientType.");
                    continue;
                }
                // Line number 4 must be a number
                if(parseFloat(lines[3]) === NaN)
                {
                    failedItems.push("Ingredient " + String(i) + " failed. Price was not a number.");
                    continue;
                }

                ingredients.push(new Ingredient(lines[1], type, lines[3]));
            }

            // Recipe has ?? lines including !
            else if(nLines === 36)
                console.log("Ingredient");

            else
                console.log("Failed");
        }

        console.log("\nUploading ingredients...");
        if(ingredients.length > 0)
            setIngredientData(ingredients);
        
        console.log("\nUploading recipes...");
        if(ingredients.length > 0)
            // setIngreidnetData(ingredients);

        if(failedItems.length > 0)
        {
            console.log("\nFailed items: ");
            failedItems.forEach(item => 
            {
                console.log(item);    
            });
        }

        this.setState(this.initState());
    }

    upload()
    {
        this.uploadFromFile(this.state.filecontent);
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
                <h3 style={{ ...getTextColor(this.props.contrastmode) }}>{OVERVIEW}</h3>
                {this.queue ? <p style={{ ...getTextColor(this.props.contrastmode) }}>{UPLOAD_QUEUE + ": " + this.queue}</p> : (null)}

                <div className="rowStyle">
                    <Button key={"uploadButton" + ms} onClick={(this.state.queue.length > 0 ? this.upload : (null))} contrastmode={this.props.contrastmode} text={UPLOAD}/> 
                </div>
            </div>
        );
    }

    renderContent()
    {
        return (
            <div>
                {this.renderGeneralInformation()}
                <hr/>

                {/* Option to upload using a html input form */}
                <Panel title={UPLOAD_FORM} contrastmode={this.props.contrastmode}>
                    {this.renderUploadForm()}
                </Panel>

                {/* Specific guide to formating the uploads (in case of upload from file) (make collapsable; panel)
                    -> Submit files buttons/ drag+drop area */}
                <Panel title={UPLOAD_FILE} contrastmode={this.props.contrastmode}>
                    {this.renderUploadFile()}
                </Panel>
                <hr/>

                {/* Buttons to validate input
                Specific info about what's about to be uploaded (number of items, name/title of items)
                Upload buttons (if validation successful) */}
                {this.renderUploadButtons()}
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