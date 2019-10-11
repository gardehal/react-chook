import React from "react";
import { connect } from 'react-redux';

// Redux imports
import { getRecipeData } from "../actions/RecipeActions";
import { getIngredientData } from "../actions/IngredientActions";
import { renderLoading, renderError, setTitle } from "../actions/Shared";

// Variable imports
import { getBackgroundColor, getLightBackgroundColor, getTextColor } from "../resources/colors";
import { DB_RECIPE, DB_FETCH_FAILED } from "../resources/language";

// Component imports

class RecipeDetailsPage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = this.initState();
    }

    componentWillMount()
    {
        let fromUrl = window.location.search.split("?" + DB_RECIPE + "=");
        let id = fromUrl[1];
        getRecipeData("recipe_id", id, 1);

        getRecipeData();
        // getIngredientData();
    }

    initState()
    {
        return { };
    }

    renderContent()
    {
        let recipe = this.props.recipeResult[0];

        if(!recipe || this.props.recipeLoading)
            return renderLoading(true, this.props.contrastmode);

        if(this.props.recipeResult.length < 1 || this.props.recipeError)
            return renderError(DB_FETCH_FAILED, true, this.props.contrastmode);

        setTitle(recipe.recipe_title);

        return (
            <div style={{ ...getLightBackgroundColor(this.props.contrastmode) }}>
                <h3 style={{ ...getTextColor(this.props.contrastmode) }}>{recipe.recipe_title}</h3>
            </div>);
    }

    render()
    {
        return (
            <div style={{ ...getBackgroundColor(this.props.contrastmode) }}>
                <div style={{ ...getBackgroundColor(this.props.contrastmode) }}>
                    <div className="pageRootContainer">
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
)(RecipeDetailsPage);