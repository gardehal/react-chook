import React from "react";
import { connect } from "react-redux";

// Redux imports
import { getRecipeData } from "../actions/RecipeActions";
import { getIngredientData } from "../actions/IngredientActions";
import { renderLoading, renderError, setTitle } from "../resources/Shared";

// Variable imports
import { getBackgroundColor, getLightBackgroundColor, getTextColor } from "../resources/colors";
import { DB_RECIPE, DB_FETCH_FAILED, NORWEGIAN_KRONER, MINUTES, PREPARATION, TOTAL, PORTIONS,
    NUTRIENTS_PER_100_ML_G, NB_MAY_BE_PARTIAL_INFORMATION } from "../resources/language";

// Component imports
import { CookingMethodDisplay, CookingMethodValue, CookingMethod } from "../models/enums/CookingMethod";
import { TempratureUnitDisplay, TempratureUnitValue, TempratureUnit } from "../models/enums/TempratureUnit";
import { RecipeTypeDisplay, RecipeType } from "../models/enums/RecipeType";
import { DifficultyDisplay, Difficulty } from "../models/enums/Difficulty";
import { RecipeIngredientCard } from "./common/RecipeIngredientCard";
import { Button } from "./common/Button";
import { Panel } from "./common/Panel";
import { Recipe } from "../models/Recipe";
import { ProteinDisplay, Protein } from "../models/enums/Protein";

class RecipeDetailsPage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.initStyle();
    }

    componentWillMount()
    {
        // If recipedata is null? may not trigger if other recipes are loaded
        let fromUrl = window.location.search.split("?" + DB_RECIPE + "=");
        let id = fromUrl[1];
        getRecipeData("id", id, 1);

        // getRecipeData();
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

        setTitle(title);

        // TODO source
        // this.source_id = "";
        
        // Nutritional values (NB: per 100 ml/g)
        let cals = recipe.calories_kcal;
        let protein = recipe.protein_gram;
        let carbs = recipe.carbohydrates_gram;
        let sugar = recipe.sugar_gram;
        let fat = recipe.fat_gram;
        let satFat = recipe.saturated_fat_gram;

        // Recipe
        let id = recipe.id;
        let title = recipe.title;
        let estPrice = recipe.estimated_price;
        let totalprice = recipe.total_price;
        let type = recipe.type ? RecipeTypeDisplay[RecipeType[recipe.type]] : "";
        let difficulty = recipe.difficulty ? DifficultyDisplay[Difficulty[recipe.difficulty]] : "";
        let rating = recipe.rating;
        let portions = recipe.portions;
        let time_preparation = recipe.time_preparation;
        let time_total = recipe.time_total;
        let method = recipe.cooking_method ? CookingMethodDisplay[CookingMethod[recipe.cooking_method]] : "";
        let methodTemp = recipe.cooking_method_temperature ?? "";
        let methodTempUnit = recipe.cooking_method_temperature_unit ? TempratureUnitDisplay[TempratureUnit[recipe.cooking_method_temperature_unit]] : "";
        let main_protein = recipe.main_protein ? ProteinDisplay[Protein[recipe.main_protein]] : "";
        let ingredients = recipe.recipe_ingredients;
        let sub_recipes = recipe.sub_recipes;
        let instructions = recipe.instructions;
        let notes = recipe.notes;

        // Make a label for nutritional values
        let nutrientsText = NUTRIENTS_PER_100_ML_G + "\n" 
            + NB_MAY_BE_PARTIAL_INFORMATION + "\n"
            + "Calories: " +  cals + "\n"
            + protein + "\n"
            + carbs + "\n"
            + sugar + "\n"
            + fat + "\n"
            + satFat;

        // Make a JSX array of all the sub recipes (if any) and render this array later
        let subRecipeJsx = [];
        if(sub_recipes)
            for(let i = 0; i < sub_recipes.length; i++)
                subRecipeJsx.push(<RecipeIngredientCard key={"subRecipe" + i} recipeIngredient={sub_recipes[i]} history={this.props} doLink
                    contrastmode={this.props.contrastmode}/>);

        // Make a JSX array of all the ingredients and render this array later
        let ingredientsJsx = [];
        for(let i = 0; i < ingredients.length; i++)
            ingredientsJsx.push(<RecipeIngredientCard key={"ingredient" + i} recipeIngredient={ingredients[i]} history={this.props}
                contrastmode={this.props.contrastmode} metricmode={this.props.metricmode}/>);

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
                    <p style={{ ...getTextColor(this.props.contrastmode) }}>{difficulty + " " + type + ", " + rating + "/10"}</p>
                    
                    <p style={{ ...getTextColor(this.props.contrastmode) }}>{portions + " " + PORTIONS
                        + ", " + time_preparation + " " + MINUTES + " " + PREPARATION
                        + ", " + time_total + " " + MINUTES + " " + TOTAL
                        + ", " + estPrice + " " + NORWEGIAN_KRONER}</p>
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

                {nutrientsText}
            </div>);
    }

    renderDevContent()
    {
        let recipe = this.props.recipeResult[0];

        return (
            <Panel title={"DEV"} contrastmode={this.props.contrastmode}>
                <Button onClick={() => console.log(new Recipe().setSecondaryInfo(recipe))} contrastmode={this.props.contrastmode} text={"test"}/> 
            </Panel>
        );
    }

    render()
    {
        return (
            <div style={{ ...getBackgroundColor(this.props.contrastmode) }}>
                <div style={{ ...getBackgroundColor(this.props.contrastmode) }}>
                    <div className="pageRootContainer">
                        {/* {this.renderDevContent()} */}
                        {this.renderContent()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => 
{
    const { contrastmode, metricmode } = state.settings;
    const { recipeError, recipeLoading, recipeResult } = state.recipe;
    const { ingredientError, ingredientLoading, ingredientResult } = state.ingredient;
    return { contrastmode, metricmode,
        recipeError, recipeLoading, recipeResult, 
        ingredientError, ingredientLoading, ingredientResult };
};
  
export default connect(
    mapStateToProps, { getRecipeData, getIngredientData }
)(RecipeDetailsPage);