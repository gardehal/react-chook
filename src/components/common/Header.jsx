import React from "react";
// import { Link, withRouter } from "react-router-dom";

import {MAIN_TITLE, SEARCH, SEARCH_SOMETHING, HOME, ALL_RECIPES, UPLOAD, CONTRASTMODE} from "../../resources/language";
import { getAccentColor, getTextColor, getBackgroundColor } from "../../resources/colors";

class Header extends React.Component
{
    constructor(props)
    {
        super(props);

        this.initStyle();
        this.doSearch = this.doSearch.bind(this);
        this.gotoHome = this.gotoHome.bind(this);
        
        this.toggleHover = this.toggleHover.bind(this);
        this.state= {hover: false};
    }

    initStyle()
    {
        this.bannerStyle =
        {
            width: "100%",
            height: "5em"
        };
        // Merge banner obj with colour obj
        this.bannerStyle = { ...this.bannerStyle, ...getAccentColor(this.props.contrastmode)};

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
            
            justifyContent: "space-evenly",
            borderTop: "1px solid black"

        };
        this.linkStyle =
        {
            cursor: "pointer",
            fontSize: "1em",
            // border: "1px solid black"
        };
        this.settingsContainerStyle =
        {
            cursor: "pointer",
            position: "absolute",
            right: "1em",
            top: "1em",
            height: "3em",
            width: "3em",
        };
        this.settingsButtonStyle =
        {
            position: "absolute",
            height: "100%",
            width: "100%",
            backgroundImage: "url(" + require("../../resources/icons/cog.png") + ")",
            backgroundSize: "contain",
            zIndex: "3",
        };
        this.dropdownContainerStyle = 
        {
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            top: "3em",
            right: "-0.5em",
            backgroundColor: "gray",
            zIndex: "4",
        };
        this.dropdownContainerItemStyle = 
        {
            position: "relative",
            display: "flex",
            margin: "0.2em",
            float: "left",
            whiteSpace: "nowrap",
            fontSize: "1em",
            zIndex: "5",
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

    gotoHome()
    {
        // this.props.history.push("/");
    }

    // TODO need drop down menu for settings, profile, dev options
    renderSettings()
    {
        return (
            <div style={this.settingsContainerStyle}>
                <div style={this.settingsButtonStyle} onClick={this.toggleHover}>
                    
                </div>
                {
                    this.state.hover ? 
                    <div onClick={console.log(1)} style={this.dropdownContainerStyle}>
                        <div onClick={console.log(2)} style={this.dropdownContainerItemStyle}>
                            Profile
                        </div>
                        <div onClick={console.log(3)} style={this.dropdownContainerItemStyle}>
                            Settings
                        </div>
                        <div style={this.dropdownContainerItemStyle}>
                            Reload
                        </div>
                        <div style={this.dropdownContainerItemStyle}>
                            Dev options
                        </div>
                        <div style={this.dropdownContainerItemStyle}>
                            Log out
                        </div>
                    </div>
                    :
                    null
                }
            </div>
        );
    }

    toggleHover()
    {
        this.setState({hover: !this.state.hover});
        console.log(0);
    }

    render()
    {
        const title = this.props.title || MAIN_TITLE;
          

        return (
            <div style={this.bannerStyle}>
                <div style={this.mainContainerStyle}>
                    <div style={this.titleContainerStyle} onClick={this.doHome}>
                        <h1 style={this.titleStyle}>{title}</h1>
                    </div>

                    <div className="hide-650" style={this.searchContainerStyle} >
                        <form style={this.searchFormStyle} onSubmit={this.doSearch}>
                            <input style={this.searchFieldStyle} id="searchFieldHeader" type="text" placeholder={SEARCH_SOMETHING}/>
                            <div className="btn-with-shadow" style={this.searchButtonStyle} onClick={this.doSearch}>
                                {SEARCH}
                            </div>
                        </form>
                    </div>

                </div> 

                {this.renderSettings()}
                
                <div className="hide-400" style={this.linkContainerStyle}>
                    <div className="btn-with-shadow" style={this.linkStyle} to="/">{HOME}</div>
                    <div className="btn-with-shadow" style={this.linkStyle} to="/list">{ALL_RECIPES}</div>
                    <div className="btn-with-shadow" style={this.linkStyle} to="/upload">{UPLOAD}</div>
                </div>
            </div>
        );
    }
}

export default (Header);