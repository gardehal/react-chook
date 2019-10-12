import React from "react";
import { connect } from "react-redux";

// Redux imports
import { getRecipeData } from "../actions/RecipeActions";
import { getIngredientData } from "../actions/IngredientActions";
import { renderLoading, renderError, setTitle } from "../actions/Shared";

// Variable imports
import { getBackgroundColor, getLightBackgroundColor, getTextColor } from "../resources/colors";
import { DB_RECIPE, DB_FETCH_FAILED, NORWEGIAN_KRONER, MINUTES, PREPARATION, TOTAL, PORTIONS } from "../resources/language";

// Component imports
import { RecipeCard } from "./common/RecipeCard";

class RecipeDetailsPage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.initStyle();
    }

    componentWillMount()
    {
        let fromUrl = window.location.search.split("?" + DB_RECIPE + "=");
        let id = fromUrl[1];
        getRecipeData("recipe_id", id, 1);

        getRecipeData();
    }

    initStyle()
    {
        this.containerStyle = 
        {
            padding: "0.5em",
        };
        this.titleStyle =
        {
            paddingBottom: "0.5em",
        };
        this.infoContainerStyle =
        {

        };
    }

    renderContent()
    {
        let recipe = this.props.recipeResult[0];

        if(!recipe || this.props.recipeLoading)
            return renderLoading(true, this.props.contrastmode);

        if(this.props.recipeResult.length < 1 || this.props.recipeError)
            return renderError(DB_FETCH_FAILED, true, this.props.contrastmode);

        setTitle(recipe.recipe_title);

        // Extract data that can be undefined to local vars and display based on undefined or not
        let method = (recipe.recipe_cooking_method ? recipe.recipe_cooking_method : "");
        let methodTemp = (recipe.recipe_cooking_method_temperature ? recipe.recipe_cooking_method_temperature : "");
        let methodTempUnit = (recipe.recipe_cooking_method_temperature_unit ? recipe.recipe_cooking_method_temperature_unit : "")

        // Make a JSX array of all the ingredients and render this array later
        let ingredientsJsx = [];
        for(let ingredientsIndex = 0; ingredientsIndex < recipe.recipe_ingredients.length; ingredientsIndex++)
            ingredientsJsx.push(
                <p key={"ingredient" + ingredientsIndex} style={{ ...getTextColor(this.props.contrastmode) }}>
                    {recipe.recipe_ingredients[ingredientsIndex].ingredient_name}
                </p>);
                
        // Make a JSX array of all the sub recipes (if any) and render this array later
        let subRecipeJsx = [];
        if(recipe.recipe_sub_recipes)
            for(let subRecipeIndex = 0; subRecipeIndex < recipe.recipe_sub_recipes.length; subRecipeIndex++)
                subRecipeJsx.push(<RecipeCard key={"subRecipe" + subRecipeIndex} recipe={recipe.recipe_sub_recipes[subRecipeIndex]} history={this.props}
                    subRecipe={true} contrastmode={this.props.contrastmode}/>);

        // Make a JSX array of all the instructions and render this array later
        let instructionsJsx = [];
        for(let instructionsIndex = 0; instructionsIndex < recipe.recipe_instructions.length; instructionsIndex++)
            instructionsJsx.push(
                <p key={"instruction" + instructionsIndex} style={{ ...getTextColor(this.props.contrastmode) }}>
                    {recipe.recipe_instructions[instructionsIndex]}
                </p>);

        // Make a JSX array of all the notes (if any) and render this array later
        let recipeNotesJsx = [];
        if(recipe.recipe_notes)
            for(let instructionsIndex = 0; instructionsIndex < recipe.recipe_notes.length; instructionsIndex++)
                recipeNotesJsx.push(
                    <p key={"instruction" + instructionsIndex} style={{ ...getTextColor(this.props.contrastmode) }}>
                        {recipe.recipe_notes[instructionsIndex]}
                    </p>);

        return (
            <div style={{ ...this.containerStyle, ...getLightBackgroundColor(this.props.contrastmode) }}>
                <h3 style={{ ...this.titleStyle, ...getTextColor(this.props.contrastmode) }}>{recipe.recipe_title}</h3>

                <div style={{ ...this.infoContainerStyle }}>
                    <p style={{ ...getTextColor(this.props.contrastmode) }}>{recipe.recipe_grade + " " + recipe.recipe_type + ", " + recipe.recipe_rating + "/10"}</p>
                    
                    <p style={{ ...getTextColor(this.props.contrastmode) }}>{recipe.recipe_portions + " " + PORTIONS
                        + ", " + recipe.recipe_time_preparation + " " + MINUTES + " " + PREPARATION
                        + ", " + recipe.recipe_time_total + " " + MINUTES + " " + TOTAL
                        + ", " + recipe.recipe_price + " " + NORWEGIAN_KRONER}</p>
                </div>
                {method ? <hr/> : (null)}

                <p style={{ ...getTextColor(this.props.contrastmode) }}>{method + " " + methodTemp + " " + methodTempUnit}</p>
                <hr/>

                {subRecipeJsx}
                {ingredientsJsx}
                <hr/>

                {instructionsJsx}
                {recipe.recipe_notes ? <hr/> : (null)}

                {recipeNotesJsx}
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