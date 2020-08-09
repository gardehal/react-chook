import React from "react";

// Variable imports
import { getLightBackgroundColor, getTextColor } from "../../resources/colors";
import { DB_INGREDIENT, DB_RECIPE } from "../../resources/language";
import { QuantityUnitDisplay, QuantityUnit } from "../../models/enums/QuantityUnit";
import { PreparationDisplay, Preparation } from "../../models/enums/Preparation";

export class RecipeIngredientCard extends React.Component
{
    // Props
    // contrastmode: use contrastmode (aka nightmode/darkmode), default false
    // metricmode: use metric measurements (gram only currently), default false
    // recipeIngredient: the ingredient in the recipe whos data we are displaying: no defaults
    // doLink: allows clicking on the recipe to go to details, default false
    
    constructor(props)
    {
        super(props);
        this.initStyle();
    }

    initStyle()
    {
        this.containerStyle =
        {
            cursor: (this.props.doLink ? "pointer" : "auto"),
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

    render()
    {
        let ingredient = this.props.recipeIngredient;
        let id = ingredient.id;
        
        let quantity = ingredient.quantity ? ingredient.quantity.toString() + " " : "";
        let quantityUnit = ingredient.quantity_unit ? QuantityUnitDisplay[QuantityUnit[ingredient.quantity_unit]] + " " : "";

        let metricsString = "";
        if(this.props.metricmode && ingredient.quantity_in_gram && ingredient.quantity_unit !== QuantityUnit[QuantityUnit.G])
        {
            let quantityGram = ingredient.quantity_in_gram.toString();
            let quantityUnitGram = QuantityUnitDisplay[QuantityUnit["G"]];
            metricsString = "(" + quantityGram + " " + quantityUnitGram + ") "; 
        }

        let name = ingredient.name;
        let prep = ingredient.preparation ? ", " + PreparationDisplay[Preparation[ingredient.preparation]] : "";
        let isRecipe = ingredient.isRecipe;
        let doLink = this.props.doLink;
        let link = doLink ? () => window.open(isRecipe ?  ("/details/?" + DB_RECIPE + "=" + id) : ("/details/?" + DB_INGREDIENT + "=" + id)) : null;

        // TODO: window.open() open links in new tab/window, preferable her would be window.location.href="" which open in same tab. Goes to just fine if no subrecipes,
        // but going back it auto-open details for ingredient=? first or first subrecipe
        // let link = doLink ? () => window.location.href=(isRecipe ?  ("/details/?" + DB_RECIPE + "=" + id) : ("/details/?" + DB_INGREDIENT + "=" + id)) : null;
        // let pClassName = doLink ? "underline" : "";
        
        return (
            <div className="rowStyle" style={{ ...this.containerStyle, ...getLightBackgroundColor(this.props.contrastmode) }} onClick={link}>
                <p key={"recipeIngredient" + id} style={{ ...getTextColor(this.props.contrastmode) }}>
                    { " - " + quantity + quantityUnit + metricsString + name + prep}
                </p>
            </div>);
    }
}