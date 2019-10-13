import React from "react";
import { connect } from "react-redux";

// Redux imports
import { getRecipeData } from "../actions/RecipeActions";
import { getIngredientData } from "../actions/IngredientActions";
import { renderLoading, renderError, setTitle } from "../actions/Shared";

// Variable imports
import { DB_FETCH_FAILED, LOAD, INGREDIENTS, SEARCH_SOMETHING, SEARCH } from "../resources/language";
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
        this.initStyle();
    }

    componentWillMount()
    {
        getRecipeData();
        getIngredientData();
        
        setTitle();
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


    renderSearch()
    {
        return (
            <div style={{ ...this.searchContainerStyle }} >
                <form style={{ ...this.searchFormStyle, ...getTextColor(this.props.contrastmode) }} onSubmit={this.doSearch}>
                    <input style={{ ...this.searchFieldStyle, ...getTextColor(this.props.contrastmode) }} id="searchFieldHeader" type="text" placeholder={SEARCH_SOMETHING}/>
                    <div className="btn-with-shadow" style={{ ...this.searchButtonStyle, ...getTextColor(this.props.contrastmode) }} onClick={this.doSearch}>
                        {SEARCH}
                    </div>
                </form>
            </div>
        );
    }

    renderContent()
    {
        let result = [];
        // get search term
        // handle search
        // collate data

        return (
            <div>
                {this.renderSearch()}
                <hr/>
                
                results goes here
                {result}
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