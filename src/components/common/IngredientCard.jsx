import React from "react";

// Variable imports
import { getLightBackgroundColor, getTextColor } from "../../resources/colors";
import { NORWEGIAN_KRONER } from "../../resources/language";

export class IngredientCard extends React.Component
{
    // Props
    // contrastmode: use contrastmode (aka nightmode/darkmode), default false
    // ingredient: the ingredient whos data we are displaying: no defaults

    render()
    {
        let ingredient = this.props.ingredient;
        let iName = ingredient.name;
        let iType = ingredient.type;
        let iPrice = ingredient.price;

        return (
            <div className="rowStyle" style={getLightBackgroundColor(this.props.contrastmode)}>
                <p style={getTextColor(this.props.contrastmode)}>{iName}, {iType}: {iPrice + " " + NORWEGIAN_KRONER}</p>
            </div>
        );
    }
}