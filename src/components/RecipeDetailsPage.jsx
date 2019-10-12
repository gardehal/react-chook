import React from "react";
import { connect } from 'react-redux';

// Redux imports
import { getRecipeData } from "../actions/RecipeActions";
import { getIngredientData } from "../actions/IngredientActions";
import { renderLoading, renderError, setTitle } from "../actions/Shared";

// Variable imports
import { getBackgroundColor, getLightBackgroundColor, getTextColor } from "../resources/colors";
import { DB_RECIPE, DB_FETCH_FAILED, NORWEGIAN_KRONER, MINUTES, PREPARATION, TOTAL, PORTIONS } from "../resources/language";

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

        let method = (recipe.recipe_cooking_method ? recipe.recipe_cooking_method : "");
        let methodTemp = (recipe.recipe_cooking_method_temperature ? recipe.recipe_cooking_method_temperature : "");
        let methodTempUnit = (recipe.recipe_cooking_method_temperature_unit ? recipe.recipe_cooking_method_temperature_unit : "")

        let ingredientsJsx = [];
        for(let ingredientsIndex = 0; ingredientsIndex < recipe.recipe_ingredients.length; ingredientsIndex++)
        ingredientsJsx.push(
                <p key={"ingredient" + ingredientsIndex} style={{ ...getTextColor(this.props.contrastmode) }}>
                    {recipe.recipe_ingredients[ingredientsIndex].ingredient_name}
                </p>);

        let instructionsJsx = [];
        for(let instructionsIndex = 0; instructionsIndex < recipe.recipe_instructions.length; instructionsIndex++)
            instructionsJsx.push(
                <p key={"instruction" + instructionsIndex} style={{ ...getTextColor(this.props.contrastmode) }}>
                    {recipe.recipe_instructions[instructionsIndex]}
                </p>);

        let recipesJsx = [];
        if(recipe.recipe_notes)
            for(let instructionsIndex = 0; instructionsIndex < recipe.recipe_notes.length; instructionsIndex++)
                recipesJsx.push(
                    <p key={"instruction" + instructionsIndex} style={{ ...getTextColor(this.props.contrastmode) }}>
                        {recipe.recipe_notes[instructionsIndex]}
                    </p>);

        return (
            <div style={{ ...getLightBackgroundColor(this.props.contrastmode) }}>
                <h3 style={{ ...getTextColor(this.props.contrastmode) }}>{recipe.recipe_title}</h3>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{recipe.recipe_grade + " " + recipe.recipe_type + ", " + recipe.recipe_rating + "/10"}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{recipe.recipe_portions + " " + PORTIONS
                    + ", " + recipe.recipe_time_preparation + " " + MINUTES + " " + PREPARATION
                    + ", " + recipe.recipe_time_total + " " + MINUTES + " " + TOTAL
                    + ", " + recipe.recipe_price + " " + NORWEGIAN_KRONER}</p>
                {method ? <hr/> : (null)}
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{method + " " + methodTemp + " " + methodTempUnit}</p>
                <hr/>
                {ingredientsJsx}
                <hr/>
                {instructionsJsx}
                {recipe.recipe_notes ? <hr/> : (null)}
                {recipesJsx}
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