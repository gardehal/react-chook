import React from "react";

// Variable imports
import { getLightBackgroundColor, getTextColor } from "../../resources/colors";
import { DB_RECIPE, NORWEGIAN_KRONER, MINUTES } from "../../resources/language";
import { RecipeTypeDisplay } from "../../models/enums/RecipeType";
import { DifficultyDisplay } from "../../models/enums/Difficulty";

export class RecipeCard extends React.Component
{
    // Props
    // contrastmode: use contrastmode (aka nightmode/darkmode), default false
    // recipe: the recipe whos data we are displaying: no defaults
    // doLink: allows clicking on the recipe to go to details, default true
    // subRecipe: if data is a subrecipe in another recipe, will use special fields to display, false

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
        {
            this.props.history.history.push("/details/?" + DB_RECIPE + "=" + id);
            
            //TODO: when clicking subrecipe, this is needed to make the page reload and show the subrecipe instead of the parent recipe
            // However, the screen flashes white, which can be painful for the eyes in contrastmode
            if(this.props.subRecipe)
                window.location.reload();
        }
        else    
            console.log("The recipe (" + this.props.recipe.recipe_title + ") was not linked intentionally to due to the prop \"doLink\" being: " + this.props.doLink);
    }

    render()
    {
        let recipe = this.props.recipe;

        if(this.props.subRecipe)
            return (
                <div className="btn-with-shadow" style={{ ...this.containerStyle, ...getLightBackgroundColor(this.props.contrastmode) }} 
                    onClick={this.gotoDetails.bind(this, recipe.sub_recipe_id)}>
                    <div style={{ ...this.titleContainerStyle }}>
                        <p style={{ ...this.titleStyle, ...getTextColor(this.props.contrastmode) }}>{recipe.sub_recipe_title}</p>
                    </div>
                </div>
            );

        let id = recipe.id;
        let title = recipe.title;
        let type = RecipeTypeDisplay[recipe.type];
        let difficulty = DifficultyDisplay[recipe.difficulty];
        let cost = recipe.cost;
        let timeTotal = recipe.time_total;

        return (
            <div className="btn-with-shadow" style={{ ...this.containerStyle, ...getLightBackgroundColor(this.props.contrastmode) }} 
                onClick={this.gotoDetails.bind(this, id)}>
                <div style={{ ...this.titleContainerStyle }}>
                    <p style={{ ...this.titleStyle, ...getTextColor(this.props.contrastmode) }}>{title}</p>
                </div>

                <div style={{ ...this.containerStyle, ...this.infoContainerStyle }}>
                    <p>{difficulty + " " + type + ", " + timeTotal + " " + MINUTES + ", " + cost + " " + NORWEGIAN_KRONER}</p>
                    {/* <p style={{ ...this.infoStyle }}>{type}</p>
                    <p style={{ ...this.infoStyle }}>{difficulty}</p>
                    <p style={{ ...this.infoStyle }}>{recipeRating}</p>
                    <p style={{ ...this.infoStyle }}>{cost}</p>
                    <p style={{ ...this.infoStyle }}>{timeTotal}</p> */}
                </div>
            </div>
        );
    }
}