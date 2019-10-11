import React from "react";
import { connect } from 'react-redux';

// Redux imports
import { getRecipeData } from "../actions/RecipeActions";
import { getIngredientData } from "../actions/IngredientActions";
import { renderLoading, renderError } from "../actions/Shared";

// Variable imports
import { DB_FETCH_FAILED } from "../resources/language";
import { getBackgroundColor } from "../resources/colors";

// Component imports
import { RecipeCard } from "./common/RecipeCard";
import { IngredientCard } from "./common/IngredientCard";

class ListPage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = this.initState();
    }

    componentWillMount()
    {
        getRecipeData();
        getIngredientData();
    }

    initState()
    {
        return { };
    }

    renderContent()
    {
        // Make a JSX array of all the recipes in a card component
        let recipeJsx = [];
        let recipes = this.props.recipeResult;

        if(this.props.recipeLoading)
            recipeJsx.push(renderLoading(false, this.props.contrastmode));
        else if(recipes && recipes.length > 0)
            for(let recipeIndex = 0; recipeIndex < recipes.length; recipeIndex++)
                recipeJsx.push(<RecipeCard key={"recipe" + recipeIndex} recipe={recipes[recipeIndex]} history={this.props} 
                    contrastmode={this.props.contrastmode}/>);
        else
            recipeJsx.push(renderError(DB_FETCH_FAILED, false, this.props.contrastmode));

        // Most of the time, there's no point of getting ingredients, may implement a option to load later
        // Make a JSX array of all the ingredients in a card component
        let ingredientJsx = [];
        // let ingredients = this.props.ingredientResult;
        // if(this.props.ingredientLoading)
        //     ingredientJsx.push(renderLoading(false, this.props.contrastmode));
        // else if(ingredients && ingredients.length > 0)
        //     for(let ingredientIndex = 0; ingredientIndex < ingredients.length; ingredientIndex++)
        //         ingredientJsx.push(<IngredientCard key={"ingredient" + ingredientIndex} ingredient={ingredients[ingredientIndex]} history={this.props} 
        //             contrastmode={this.props.contrastmode}/>);
        // else
            ingredientJsx.push(renderError(DB_FETCH_FAILED, false, this.props.contrastmode));

        // Render the arrays
        return (
            <div style={getBackgroundColor(this.props.contrastmode)}>
                <div className="pageRootContainer">
                    {recipeJsx}
                    {ingredientJsx}
                </div>
            </div>);
    }

    render()
    {
        return (
            <div style={{ ...getBackgroundColor(this.props.contrastmode) }}>
                {this.renderContent()}
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
)(ListPage);