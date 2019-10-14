import React from "react";
import { connect } from "react-redux";

// Redux imports
import { getRecipeData } from "../actions/RecipeActions";
import { getIngredientData } from "../actions/IngredientActions";
import { renderLoading, renderError, setTitle } from "../actions/Shared";

// Variable imports
import { DB_FETCH_FAILED, LOAD, INGREDIENTS, SEARCH_SOMETHING, SEARCH, INVALID_SEARCH_TERM, NO_RESULTS_FOR } from "../resources/language";
import { getBackgroundColor, getTextColor } from "../resources/colors";

// Component imports
import { RecipeCard } from "./common/RecipeCard";
import { IngredientCard } from "./common/IngredientCard";
import { Button } from "./common/Button";

class SearchPage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { result: [] };
        this.initStyle();

        this.doSearch = this.doSearch.bind(this);
        this.setSearchResults = this.setSearchResults.bind(this);
    }

    componentWillMount()
    {
        // Get term from url
        let url = window.location.href;
        let term = url.split("search/?term=")[1];
        
        if(term)
            this.doSearch(decodeURIComponent(term));
    }

    initStyle()
    {
        this.searchContainerStyle =
        {
            position: "relative",
            width: "100%",

            // maxWidth: "50%"
        };
        this.searchFormStyle =
        {
            display: "flex",
            height: "100%",
            padding: "0.5em",
            paddingBottom: "0",
        };
        this.searchFieldStyle =
        {
            background: "none",
            border: "none",
            height: "2em",
            width: "100%",
        };
        this.searchButtonStyle =
        {
            cursor: "pointer",
            paddingLeft: "0.5em",
            paddingRight: "0.5em",
            // paddingBottom: "0",
        };
    }

    doSearch(term = undefined)
    {
        // Get term from the searchfield in body
        if(term.value === undefined && this.refs.searchFieldBody)
            term = this.refs.searchFieldBody.value;

        // Sanitized by default; see https://reactjs.org/docs/introducing-jsx.html#jsx-prevents-injection-attacks 

        if(term.length < 1 || term === undefined)
        {
            this.setState({ result: INVALID_SEARCH_TERM });
            return;
        }

        console.log("Searching for: \"" + term + "\"");
        setTitle(term);

        // Get our data
        getRecipeData();
        getIngredientData();
    
        // Since the get methods from database are async and only updates the props, set an interval to run a method every X milliseconds
        this.searchCheckerInterval = setInterval(() => this.setSearchResults(term), 250);
    }

    setSearchResults(term)
    {
        // If loading is true, return since we don't have the data yet
        if(this.props.recipeLoading || this.props.ingredientLoading)
            return;

        // Clear interval since it has completed it's task
        clearInterval(this.searchCheckerInterval);

        // Sort and collate data - NB: Currently only searches on title and name
        let resultJsx = [];
        let recipes = this.props.recipeResult;

        for(let resultIndex = 0; resultIndex < recipes.length; resultIndex++)
            if(recipes[resultIndex].recipe_title.includes(term))
                resultJsx.push(<RecipeCard key={"recipe_result" + resultIndex} recipe={recipes[resultIndex]} history={this.props}
                    contrastmode={this.props.contrastmode}/>);

        let ingredients = this.props.ingredientResult;

        for(let resultIndex = 0; resultIndex < ingredients.length; resultIndex++)
            if(ingredients[resultIndex].ingredient_name.includes(term))
                resultJsx.push(<IngredientCard key={"ingredient_result" + resultIndex} ingredient={ingredients[resultIndex]} history={this.props} 
                    contrastmode={this.props.contrastmode}/>);

        if(resultJsx.length < 1)
            resultJsx.push(renderError(NO_RESULTS_FOR + "\"" + term + "\"", true, this.props.contrastmode));
          
        // The setState method forces the component to re-render with the new data
        this.setState({ result: resultJsx });
    }

    renderSearch()
    {
        return (
            <div style={{ ...this.searchContainerStyle }} >
                <form style={{ ...this.searchFormStyle, ...getTextColor(this.props.contrastmode) }} onSubmit={this.doSearch}>
                    <input id="searchFieldBody" ref="searchFieldBody" style={{ ...this.searchFieldStyle, ...getTextColor(this.props.contrastmode) }} type="text" placeholder={SEARCH_SOMETHING}/>
                    <div className="btn-with-shadow" style={{ ...this.searchButtonStyle, ...getTextColor(this.props.contrastmode) }} onClick={this.doSearch}>
                        {SEARCH}
                    </div>
                </form>
            </div>
        );
    }

    renderSearchContent()
    {
        if(this.props.recipeLoading)
            return renderLoading(false, this.props.contrastmode);

        if(this.props.recipeError)
            return renderError(this.props.recipeError, false, this.props.contrastmode);

        if(this.props.recipeResult[0])
            return this.state.result;
    }

    renderContent()
    {
        return (
            <div>
                {this.renderSearch()}
                <hr/>
            
                {this.renderSearchContent()}
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
)(SearchPage);