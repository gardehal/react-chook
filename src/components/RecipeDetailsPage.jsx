import React from "react";
import { connect } from "react-redux";

// Redux imports
import { getRecipeData } from "../actions/RecipeActions";
import { getIngredientData } from "../actions/IngredientActions";
import { renderLoading, renderError, setTitle } from "../resources/Shared";

// Variable imports
import { getBackgroundColor, getLightBackgroundColor, getTextColor } from "../resources/colors";
import { DB_RECIPE, DB_FETCH_FAILED, NORWEGIAN_KRONER, MINUTES, PREPARATION, TOTAL, PORTIONS } from "../resources/language";

// Component imports
import { RecipeCard } from "./common/RecipeCard";
import { Preparation } from "../models/enums/Preparation";
import { QuantityUnit } from "../models/enums/QuantityUnit";
import { CookingMethod } from "../models/enums/CookingMethod";
import { TempratureUnit } from "../models/enums/TempratureUnit";
import { RecipeType } from "../models/enums/RecipeType";
import { Difficulty } from "../models/enums/Difficulty";

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
        getRecipeData("id", id, 1);

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

        if(this.props.recipeResult.length !== 1 || this.props.recipeError)
            return renderError(DB_FETCH_FAILED, true, this.props.contrastmode);

        // Recipe
        let id = recipe.id;
        let title = recipe.title;
        let cost = recipe.cost;
        let totalCost = recipe.total_cost;
        let type = recipe.type;
        let difficulty = recipe.difficulty;
        let rating = recipe.rating;
        let portions = recipe.portions;
        let time_preparation = recipe.time_preparation;
        let time_total = recipe.time_total;
        let cooking_method = recipe.cooking_method;
        let cooking_method_temperature = recipe.cooking_method_temperature;
        let cooking_method_temperature_unit = recipe.cooking_method_temperature_unit;
        let main_protein = recipe.main_protein;
        let ingredients = recipe.recipe_ingredients;
        let sub_recipes = recipe.sub_recipes;
        let instructions = recipe.instructions;
        let notes = recipe.notes;

        setTitle(title);

        // Extract data that can be undefined to local vars and display based on undefined or not
        let method = CookingMethod[cooking_method] ?? "";
        let methodTemp = cooking_method_temperature ?? "";
        let methodTempUnit = TempratureUnit[cooking_method_temperature_unit] ?? "";

        // Make a JSX array of all the ingredients and render this array later
        let ingredientsJsx = [];
        for(let i = 0; i < ingredients.length; i++)
            ingredientsJsx.push(
                <p key={"ingredient" + i} style={{ ...getTextColor(this.props.contrastmode) }}>
                    { " - "
                        + (ingredients[i].quantity ? ingredients[i].quantity.toString() + " " : "")
                        + (ingredients[i].quantity_unit ? QuantityUnit[ingredients[i].quantity_unit] + " " : "")
                        + ingredients[i].ingredient.name 
                        + (ingredients[i].preparation ? " " + Preparation[ingredients[i].preparation] : "") }
                </p>);
                
        // Make a JSX array of all the sub recipes (if any) and render this array later
        let subRecipeJsx = [];
        if(sub_recipes)
            for(let i = 0; i < sub_recipes.length; i++)
                subRecipeJsx.push(<RecipeCard key={"subRecipe" + i} recipe={sub_recipes[i]} history={this.props}
                    subRecipe={true} contrastmode={this.props.contrastmode}/>);

        // Make a JSX array of all the instructions and render this array later
        let instructionsJsx = [];
        for(let i = 0; i < instructions.length; i++)
            instructionsJsx.push(
                <p key={"instruction" + i} style={{ ...getTextColor(this.props.contrastmode) }}>
                    {instructions[i]}
                </p>);

        // Make a JSX array of all the notes (if any) and render this array later
        let recipeNotesJsx = [];
        if(notes)
            for(let i = 0; i < notes.length; i++)
                recipeNotesJsx.push(
                    <p key={"note" + i} style={{ ...getTextColor(this.props.contrastmode) }}>
                        {notes[i]}
                    </p>);

        return (
            <div style={{ ...this.containerStyle, ...getLightBackgroundColor(this.props.contrastmode) }}>
                <h3 style={{ ...this.titleStyle, ...getTextColor(this.props.contrastmode) }}>{title}</h3>

                <div style={{ ...this.infoContainerStyle }}>
                    <p style={{ ...getTextColor(this.props.contrastmode) }}>{Difficulty[difficulty] + " " + RecipeType[type] + ", " + rating + "/10"}</p>
                    
                    <p style={{ ...getTextColor(this.props.contrastmode) }}>{portions + " " + PORTIONS
                        + ", " + time_preparation + " " + MINUTES + " " + PREPARATION
                        + ", " + time_total + " " + MINUTES + " " + TOTAL
                        + ", " + cost + " " + NORWEGIAN_KRONER}</p>
                </div>
                {method ? <hr/> : null}

                <p style={{ ...getTextColor(this.props.contrastmode) }}>{method + " " + methodTemp + " " + methodTempUnit}</p>
                <hr/>

                {subRecipeJsx}
                {ingredientsJsx}
                <hr/>

                {instructionsJsx}
                {notes ? <hr/> : null}

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