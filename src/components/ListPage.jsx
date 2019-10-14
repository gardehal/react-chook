import React from "react";
import { connect } from "react-redux";

// Redux imports
import { getRecipeData } from "../actions/RecipeActions";
import { getIngredientData } from "../actions/IngredientActions";
import { renderLoading, renderError, setTitle } from "../actions/Shared";

// Variable imports
import { DB_FETCH_FAILED, LOAD, INGREDIENTS } from "../resources/language";
import { getBackgroundColor } from "../resources/colors";

// Component imports
import { RecipeCard } from "./common/RecipeCard";
import { IngredientCard } from "./common/IngredientCard";
import { Button } from "./common/Button";

class ListPage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { ingredientJsx: [] };

        this.renderIngredient = this.renderIngredient.bind(this);
    }

    componentWillMount()
    {
        getRecipeData();
        
        setTitle();
    }

    loadIngredients()
    { 
        getIngredientData();
    
        // Since the get methods from database are async and only updates the props, set an interval to run a method every X milliseconds
        this.loadedCheckerInterval = setInterval(() => this.renderIngredient(), 250);
    }

    renderIngredient()
    {
        // If loading is true, return since we don't have the data yet
        if(this.props.ingredientLoading)
        {
            this.setState({ ingredientJsx: renderLoading(false, this.props.contrastmode)} );
            return;
        }

        // Clear interval since it has completed it's task
        clearInterval(this.loadedCheckerInterval);

        if(this.props.ingredientError)
            this.ingredientJsx.push(renderError(DB_FETCH_FAILED, false, this.props.contrastmode));

        // Make a JSX array of all the ingredients in a card component
        let ingredientJsx = [];
        let ingredients = this.props.ingredientResult;

        for(let ingredientIndex = 0; ingredientIndex < ingredients.length; ingredientIndex++)
            ingredientJsx.push(<IngredientCard key={"ingredient" + ingredientIndex} ingredient={ingredients[ingredientIndex]} history={this.props} 
                contrastmode={this.props.contrastmode}/>);

        // The setState method forces the component to re-render with the new data
        this.setState({ ingredientJsx: ingredientJsx });
    }

    renderContent()
    {
        // Make a JSX array of all the recipes in a card component
        let recipeJsx = [];
        let recipes = this.props.recipeResult;

        if(this.props.recipeLoading)
            recipeJsx.push(renderLoading(true, this.props.contrastmode));
        else if(recipes && recipes.length > 0)
            for(let recipeIndex = 0; recipeIndex < recipes.length; recipeIndex++)
                recipeJsx.push(<RecipeCard key={"recipe" + recipeIndex} recipe={recipes[recipeIndex]} history={this.props}
                    contrastmode={this.props.contrastmode}/>);
        else
            recipeJsx.push(renderError(DB_FETCH_FAILED, false, this.props.contrastmode));

        // Render the array
        return (
            <div>
                {recipeJsx}
                <hr/>
                
                <Button onClick={() => this.loadIngredients()} contrastmode={this.props.contrastmode} text={LOAD + " " + INGREDIENTS}/> 
                {this.state.ingredientJsx}
            </div>);
    }

    render()
    {
        return (
            <div style={getBackgroundColor(this.props.contrastmode)}>
                <div className="pageRootContainer">
                    <div style={{ ...getBackgroundColor(this.props.contrastmode) }}>
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
)(ListPage);