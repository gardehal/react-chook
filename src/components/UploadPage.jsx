import React from "react";
import { connect } from "react-redux";

// Redux imports
import { getRecipeData } from "../actions/RecipeActions";
import { getIngredientData } from "../actions/IngredientActions";
import { renderLoading, renderError, setTitle } from "../resources/Shared";

// Variable imports
import { UPLOAD, GENERAL_UPLOAD_INFORMATION, UPLOAD_FORM, UPLOAD_FILE, UPLOAD_QUEUE, VALIDATE_UPLOAD_QUEUE, OVERVIEW, UPLOAD_CHOOSE_FILE, TITLE, TYPE, GRADE, RATING, PORTIONS, PREP_TIME, TOTAL_TIME, COOKING_METHOD, COOKING_METHOD_TEMPERATURE, COOKING_METHOD_TEMPERATURE_UNIT, INGREDIENTS, INSTRUCTIONS, TIPS_NOTES } from "../resources/language";
import { getBackgroundColor, getTextColor, getLightBackgroundColor, RED } from "../resources/colors";

// Component imports
import { Button } from "./common/Button";
import { Panel } from "./common/Panel";

class UploadPage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { queue: [] };

        this.validateData = this.validateData.bind(this);
        this.upload = this.upload.bind(this);
        this.selectFile = this.selectFile.bind(this);
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
        this.filename = "";
        // css-tricks.com/image-upload-manipulation-react/
        // www.w3schools.com/jsref/dom_obj_fileupload.asp
        return (
            <div style={{ ...getLightBackgroundColor(this.props.contrastmode) }}>
                <input id="uploadFileId" ref="uploadFile" type="file" style={{ ...{ display: "none"} }}/>
                <Button onClick={this.selectFile} contrastmode={this.props.contrastmode} text={UPLOAD_CHOOSE_FILE}/> 
                <p>
                    {this.filename}
                </p>
            </div>
        );
    }

    // Smoother way?
    selectFile()
    {
        this.filename = "";
        var fileElement = document.getElementById("uploadFileId");
        fileElement.click();

        fileElement.onchange = () =>
        {
            this.filename = fileElement.value;
            console.log(this.filename);
        };
    }

    validateData()
    {
        console.log("validateData");
        
        // TODO replace with validData boolean
        if(new Date().getSeconds() % 5 === 0)
            this.setState({ queue: [1, 2, 3] });
    }

    upload()
    {
        console.log("upload");
        this.setState({ queue: [] });
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
                    <Button onClick={this.validateData} contrastmode={this.props.contrastmode} text={VALIDATE_UPLOAD_QUEUE}/> 
                    <Button key={"uploadButton" + ms} onClick={(this.state.queue.length > 1 ? this.upload : (null))} contrastmode={this.props.contrastmode} text={UPLOAD}/> 
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