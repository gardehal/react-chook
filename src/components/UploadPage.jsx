import React from "react";
import { connect } from "react-redux";

// Redux imports
import { getRecipeData } from "../actions/RecipeActions";
import { getIngredientData } from "../actions/IngredientActions";
import { renderLoading, renderError, setTitle } from "../resources/Shared";

// Variable imports
import { UPLOAD, GENERAL_UPLOAD_INFORMATION, UPLOAD_FORM, UPLOAD_FILE, UPLOAD_QUEUE, VALIDATE_UPLOAD_QUEUE, OVERVIEW } from "../resources/language";
import { getBackgroundColor, getTextColor, getLightBackgroundColor } from "../resources/colors";

// Component imports
import { Button } from "./common/Button";

class UploadPage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { queue: [] };

        // this.renderIngredient = this.renderIngredient.bind(this);
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

    renderGeneralInformation()
    {
        return (
            <div style={{ ...getLightBackgroundColor(this.props.contrastmode) }}>
                <h3 style={{ ...getTextColor(this.props.contrastmode) }}>{UPLOAD}</h3>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{GENERAL_UPLOAD_INFORMATION}</p>
            </div>
        );
    }

    renderUploadForm()
    {
        return (
            <div style={{ ...getLightBackgroundColor(this.props.contrastmode) }}>
                <h3 style={{ ...getTextColor(this.props.contrastmode) }}>{UPLOAD_FORM}</h3>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>bla bla bla</p>
            </div>
        );
    }

    renderUploadFile()
    {
        return (
            <div style={{ ...getLightBackgroundColor(this.props.contrastmode) }}>
                <h3 style={{ ...getTextColor(this.props.contrastmode) }}>{UPLOAD_FILE}</h3>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>bla bla bla</p>
            </div>
        );
    }

    renderUploadButtons()
    {
        return (
            <div style={{ ...getLightBackgroundColor(this.props.contrastmode) }}>
                <h3 style={{ ...getTextColor(this.props.contrastmode) }}>{OVERVIEW}</h3>
                {this.queue ? <p style={{ ...getTextColor(this.props.contrastmode) }}>{UPLOAD_QUEUE + ": " + this.queue}</p> : (null)}

                <div className="rowStyle">
                    <Button onClick={() => { this.setState({ queue: [1, 2, 3] }) }} contrastmode={this.props.contrastmode} text={VALIDATE_UPLOAD_QUEUE}/> 
                    <Button onClick={(this.state.queue.length > 1 ? (() => { this.setState({ queue: [] }) }) : (null))} contrastmode={this.props.contrastmode} text={UPLOAD}/> 
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

                {/* Option to upload using a form (make collapsable; panel) */}
                {/* TODO: Wrap in collapsable panel */}
                {this.renderUploadForm()}

                {/* Specific guide to formating the uploads (in case of upload from file) (make collapsable; panel)
                    -> Submit files buttons/ drag+drop area */}
                {/* TODO: Wrap in collapsable panel */}
                {this.renderUploadFile()}
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