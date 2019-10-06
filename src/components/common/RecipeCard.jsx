import React from "react";

import { getLightBackgroundColor, getTextColor } from "../../../public/colors";
import { DB_RECIPE } from "../../../public/language-no";

export class RecipeCard extends React.Component
{
    gotoDetails(id)
    {
        this.props.history.history.push("/details/?" + DB_RECIPE + "=" + id);
    }

    render()
    {
        let recipe = this.props.recipe;
        let rId = recipe.recipe_id;
        let rTitle = recipe.recipe_title;
        let rType = recipe.recipe_type;
        let rGrade = recipe.recipe_grade;
        let rRating = recipe.recipe_rating;
        let rPrice = recipe.recipe_price;
        let rTTotal = recipe.recipe_time_total;

        return (
            <div className="rowStyle" style={getLightBackgroundColor(this.props.contrastmode)} onClick={this.gotoDetails.bind(this, rId)}>
                <p style={getTextColor(this.props.contrastmode)}>{rTitle}</p>
                <p>{rType}</p>
                <p>{rGrade}</p>
                <p>{rRating}</p>
                <p>{rPrice}</p>
                <p>{rTTotal}</p>
            </div>
        );
    }
}