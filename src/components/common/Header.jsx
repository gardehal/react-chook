import React from "react";
import { Link, withRouter } from "react-router-dom";

import {MAIN_TITLE, SEARCH, SEARCH_SOMETHING, RELOAD, HOME, ALL_RECIPES, UPLOAD, LOG_IN, CONTRASTMODE} from "../../../public";
import { getAccentColor, getTextColor, getBackgroundColor } from "../../../public/colors";

class Header extends React.Component
{
    constructor(props)
    {
        super(props);

        this.doSearch = this.doSearch.bind(this);
        this.doHome = this.doHome.bind(this);
        this.toggleContrastmode = this.toggleContrastmode.bind(this);
    }

    doSearch()
    {
        let term = document.getElementById("searchTermHeader").value;

        if(this.props.location.pathname !== "/search/")
            this.props.history.push("/search/?term=" + term);
        else
        {
            this.props.history.push("/search/?term=" + term);
            location.reload();
        }
    }

    doHome()
    {
        this.props.history.push("/");
    }

    toggleContrastmode()
    {
        console.log("toggleContrastmode1 " + localStorage.getItem("contrastmode"));
        
        let contrast = true;
        if(localStorage.getItem("contrastmode") === "true")
            contrast = false;

        // let contrast = (localStorage.getItem("contrastmode") === "true" ? true : false);

        localStorage.setItem("contrastmode", contrast);
        this.setState({ contrastmode: contrast });

        this.forceUpdate();

        console.log("toggleContrastmode2 " + localStorage.getItem("contrastmode"));
    }

    // Want main header to be big text, when scrolling, shrink, have search in focus
    render()
    {
        const title = this.props.title ? this.props.title : MAIN_TITLE;

        return (
            <div>
                <div className="rowStyle" style={getAccentColor(this.props.contrastmode)}>
                    <div className="clickable" onClick={this.doHome}>
                        <h2 style={getTextColor(this.props.contrastmode)}>{title}</h2>
                    </div>

                    <form className="rowStyle" onSubmit={this.doSearch}>
                        <input id="searchTermHeader" type="text" placeholder={SEARCH_SOMETHING}/>
                        <div className="btn" onClick={this.doSearch}>
                            {SEARCH}
                        </div>
                    </form>
                    
                    <div className="btn" onClick={() => location.reload()}>{RELOAD}</div>
                    <div className="btn" style={getBackgroundColor(this.props.contrastmode)} onClick={this.toggleContrastmode}>
                        {CONTRASTMODE}
                    </div>
                </div>
                
                <div className="rowStyle" style={getAccentColor(this.props.contrastmode)}>
                    <Link to="/">{HOME}</Link>
                    <Link to="/search">{SEARCH}</Link>
                    <Link to="/list">{ALL_RECIPES}</Link>
                    <Link to="/upload">{UPLOAD}</Link>
                    <Link to="/login">{LOG_IN}</Link>
                    <Link to="/dev">DEV</Link>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);