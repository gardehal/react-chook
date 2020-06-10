import React from "react";

// Variable imports
import { getLightBackgroundColor, getTextColor } from "../../resources/colors";
import { NORWEGIAN_KRONER } from "../../resources/language";
import { IngredientTypeDisplay } from "../../models/enums/IngredientType";

export class IngredientCard extends React.Component
{
    // Props
    // contrastmode: use contrastmode (aka nightmode/darkmode), default false
    // ingredient: the ingredient whos data we are displaying: no defaults

    render()
    {
        let ingredient = this.props.ingredient;
        let name = ingredient.name;
        let type = IngredientTypeDisplay[ingredient.type].toString();
        let price = ingredient.price;

        return (
            <div className="rowStyle" style={getLightBackgroundColor(this.props.contrastmode)}>
                <p style={getTextColor(this.props.contrastmode)}>{name}, {type}: {price + " " + NORWEGIAN_KRONER}</p>
            </div>
        );
    }
}