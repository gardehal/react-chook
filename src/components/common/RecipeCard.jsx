import React from "react";

// Variable imports
import { getLightBackgroundColor, getTextColor } from "../../resources/colors";
import { DB_RECIPE, NORWEGIAN_KRONER, MINUTES } from "../../resources/language";

export class RecipeCard extends React.Component
{
    // Props
    // contrastmode: use contrastmode (aka nightmode/darkmode), default false
    // recipe: the recipe whos data we are displaying: no defaults
    // doLink: allows clicking on the recipe to go to details, default true

    constructor(props)
    {
        super(props);
        this.initStyle();
    }
    
    initStyle()
    {
        this.containerStyle =
        {
            cursor: (this.props.doLink || this.props.doLink === undefined ? "pointer" : "auto"),
            position: "relative",
            display: "flex",
            flexDirection: "row",
            alignSelf: "stretch",
            overflow: "hidden",
        };
        this.titleContainerStyle =
        {
            margin: "0.5em",
        };
        this.titleStyle =
        {
        };
        this.infoContainerStyle =
        {
            margin: "0.5em",
        };
        this.infoStyle =
        {
            margin: "0.1em",
        };
    }

    gotoDetails(id)
    {
        if(this.props.doLink || this.props.doLink === undefined)
            this.props.history.history.push("/details/?" + DB_RECIPE + "=" + id);
        else    
            console.log("The recipe (" + this.props.recipe.recipe_title + ") was not linked intentionally to due to the prop \"doLink\" being: " + this.props.doLink);
    }

    render()
    {
        let recipe = this.props.recipe;
        let recipeId = recipe.recipe_id;
        let recipeTitle = recipe.recipe_title;
        let recipeType = recipe.recipe_type;
        let recipeGrade = recipe.recipe_grade;
        let recipeRating = recipe.recipe_rating;
        let recipePrice = recipe.recipe_price;
        let recipeTTotal = recipe.recipe_time_total;

        return (
            <div className="btn-with-shadow" style={{ ...this.containerStyle, ...getLightBackgroundColor(this.props.contrastmode) }} 
                onClick={this.gotoDetails.bind(this, recipeId)}>
                <div style={{ ...this.titleContainerStyle }}>
                    <p style={{ ...this.titleStyle, ...getTextColor(this.props.contrastmode) }}>{recipeTitle}</p>
                </div>

                <div style={{ ...this.containerStyle, ...this.infoContainerStyle }}>
                    <p>{recipeGrade + " " + recipeType + ", " + recipeTTotal + " " + MINUTES + ", " + recipePrice + NORWEGIAN_KRONER}</p>
                    {/* <p style={{ ...this.infoStyle }}>{recipeType}</p>
                    <p style={{ ...this.infoStyle }}>{recipeGrade}</p>
                    <p style={{ ...this.infoStyle }}>{recipeRating}</p>
                    <p style={{ ...this.infoStyle }}>{recipePrice}</p>
                    <p style={{ ...this.infoStyle }}>{recipeTTotal}</p> */}
                </div>
            </div>
        );
    }
}