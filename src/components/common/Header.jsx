import React from "react";
// import { Link, withRouter } from "react-router-dom";

import {MAIN_TITLE, SEARCH, SEARCH_SOMETHING, RELOAD, HOME, ALL_RECIPES, UPLOAD, LOG_IN, CONTRASTMODE} from "../../resources/language";
import { getAccentColor, getTextColor, getBackgroundColor } from "../../resources/colors";

class Header extends React.Component
{
    constructor(props)
    {
        super(props);

        this.initStyle();
        this.doSearch = this.doSearch.bind(this);
        this.doHome = this.doHome.bind(this);
        // this.toggleContrastmode = this.toggleContrastmode.bind(this);
    }

    initStyle()
    {
        this.bannerStyle =
        {
            width: "100%",
            height: "3em"
        };
        // Merge banner obj with colour obj
        this.bannerStyle = { ...this.bannerStyle, ...getAccentColor(this.props.contrastmode || false)};

        this.mainContainerStyle =
        {
            position: "relative",
            display: "flex",
            width: "60%",
            marginLeft: "auto",
            marginRight: "auto",
        };
        this.titleContainerStyle =
        {
            cursor: "pointer",
            display: "inline-block",
        };
        this.titleStyle =
        {
            fontSize: "40px",
            margin: "0",
        };
        this.searchContainerStyle =
        {
            position: "absolute",
            right: "0",
            top: "25%",
            bottom: "25%",
            // width: "25%",
            maxWidth: "50%"
        };
        this.searchFormStyle =
        {
            display: "flex",
            height: "100%",
            borderBottom: "2px solid black",
        };
        this.searchFieldStyle =
        {
            background: "none",
            border: "none",
        };
        this.searchButtonStyle =
        {
            cursor: "pointer",
        };
        this.linkContainerStyle =
        {
            position: "relative",
            display: "flex",
            width: "60%",
            marginLeft: "auto",
            marginRight: "auto",
            
            display: "flex",
            flexDirection: "row",
            alignSelf: "stretch",
            justifyContent: "space-evenly",

            height: "10px",
        };
        this.linkStyle =
        {
            cursor: "pointer",
        };
    }

    doSearch()
    {
        // let term = document.getElementById("searchTermHeader").value;

        // if(this.props.location.pathname !== "/search/")
        //     this.props.history.push("/search/?term=" + term);
        // else
        // {
        //     this.props.history.push("/search/?term=" + term);
        //     location.reload();
        // }
    }

    doHome()
    {
        // this.props.history.push("/");
    }

    // toggleContrastmode()
    // {
    //     console.log("toggleContrastmode1 " + localStorage.getItem("contrastmode"));
        
    //     let contrast = true;
    //     if(localStorage.getItem("contrastmode") === "true")
    //         contrast = false;

    //     // let contrast = (localStorage.getItem("contrastmode") === "true" ? true : false);

    //     localStorage.setItem("contrastmode", contrast);
    //     this.setState({ contrastmode: contrast });

    //     this.forceUpdate();

    //     console.log("toggleContrastmode2 " + localStorage.getItem("contrastmode"));
    // }

    render()
    {
        const title = this.props.title || MAIN_TITLE;

        return (
            <div style={this.bannerStyle}>
                <div style={this.mainContainerStyle}>
                    <div style={this.titleContainerStyle} onClick={this.doHome}>
                        <h1 style={this.titleStyle}>{title}</h1>
                    </div>

                    <div style={this.searchContainerStyle} >
                        <form style={this.searchFormStyle} onSubmit={this.doSearch}>
                            <input style={this.searchFieldStyle} id="searchFieldHeader" type="text" placeholder={SEARCH_SOMETHING}/>
                            <div style={this.searchButtonStyle} onClick={this.doSearch}>
                                {SEARCH}
                            </div>
                        </form>
                    </div>

                    {/* <div className="btn">{"todo: settings/profile"}</div> */}
                </div> 
                
                {/* <div style={this.linkContainerStyle}>
                    <div style={this.linkStyle} to="/">{HOME}</div>
                    <div style={this.linkStyle} to="/search">{SEARCH}</div>
                    <div style={this.linkStyle} to="/list">{ALL_RECIPES}</div>
                    <div style={this.linkStyle} to="/upload">{UPLOAD}</div>
                    <div style={this.linkStyle} to="/login">{LOG_IN}</div>
                    <div style={this.linkStyle} to="/dev">DEV</div>
                </div> */}
            </div>
        );
    }
}

export default (Header);