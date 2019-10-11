import React from "react";

import { getLightBackgroundColor, getTextColor } from "../../resources/colors";
import { NORWEGIAN_KRONER } from "../../resources/language";

export class IngredientCard extends React.Component
{
    render()
    {
        let ingredient = this.props.ingredient;
        let iName = ingredient.ingredient_name;
        let iType = ingredient.ingredient_type;
        let iPrice = ingredient.ingredient_price;

        return (
            <div className="rowStyle" style={getLightBackgroundColor(this.props.contrastmode)}>
                <p style={getTextColor(this.props.contrastmode)}>{iName}, {iType}: {iPrice + " " + NORWEGIAN_KRONER}</p>
            </div>
        );
    }
}