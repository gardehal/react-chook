import React from "react";
// import { Link, withRouter } from "react-router-dom";

import {MAIN_TITLE, SEARCH, SEARCH_SOMETHING, HOME, ALL_RECIPES, UPLOAD, PROFILE, SETTINGS, RELOAD, DEV_OPTIONS, LOG_OUT, LOG_IN} from "../../resources/language";
import { getAccentColor, getTextColor, getBackgroundColor } from "../../resources/colors";

class Header extends React.Component
{
    // Props:
    // title: set title on page, default MAIN_TITLE
    // useDropdown: render dropdown option and child-menus, default on
    // useSearch: render search, default on
    // useLinks: renders links under title/search, default on

    constructor(props)
    {
        super(props);

        this.state = this.initState();
        this.initStyle();

        this.doSearch = this.doSearch.bind(this);
        this.gotoHome = this.gotoHome.bind(this);
        this.gotoAllRecipes = this.gotoAllRecipes.bind(this);
        this.gotoUpload = this.gotoUpload.bind(this);
        this.gotoProfile = this.gotoProfile.bind(this);
        this.gotoSettings = this.gotoSettings.bind(this);
        this.doReload = this.doReload.bind(this);
        this.gotoDev = this.gotoDev.bind(this);
        this.toggleLogin = this.toggleLogin.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    initState()
    {
        return { showDropdown: false };
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

    gotoAllRecipes()
    {
        // this.props.history.push("/");
    }

    gotoUpload()
    {
        // this.props.history.push("/");
    }

    gotoProfile()
    {
        // this.props.history.push("/");
    }

    gotoSettings()
    {
        // this.props.history.push("/");
    }

    doReload()
    {
        window.location.reload();
    }

    gotoDev()
    {
        // this.props.history.push("/");
    }

    toggleLogin()
    {
        // this.props.history.push("/");
    }
    
    toggleDropdown()
    {
        this.setState({showDropdown: !this.state.showDropdown});
    }

    renderSettings()
    {
        return (
            <div style={this.settingsContainerStyle}>
                <div style={this.settingsButtonStyle} onClick={this.toggleDropdown}>
                    
                </div>
                {
                    this.state.showDropdown ? 
                    <div style={this.dropdownContainerStyle}>
                        <div onClick={() => this.gotoProfile()} style={this.dropdownContainerItemStyle}>
                            {PROFILE}
                        </div>
                        <div onClick={() => this.gotoSettings()} style={this.dropdownContainerItemStyle}>
                            {SETTINGS}
                        </div>
                        <div onClick={() => this.doReload()} style={this.dropdownContainerItemStyle}>
                            {RELOAD}
                        </div>
                        <div onClick={() => this.gotoDev()} style={this.dropdownContainerItemStyle}>
                            {DEV_OPTIONS}
                        </div>
                        <div onClick={() => this.toggleLogin()} style={this.dropdownContainerItemStyle}>
                            {this.props.user ? LOG_OUT : LOG_IN}
                        </div>
                    </div>
                    :
                    (null)
                }
            </div>
        );
    }

    renderSearch()
    {
        return (
            <div className="hide-650" style={this.searchContainerStyle} >
                <form style={this.searchFormStyle} onSubmit={this.doSearch}>
                    <input style={this.searchFieldStyle} id="searchFieldHeader" type="text" placeholder={SEARCH_SOMETHING}/>
                    <div className="btn-with-shadow" style={this.searchButtonStyle} onClick={this.doSearch}>
                        {SEARCH}
                    </div>
                </form>
            </div>
        );
    }

    renderLinks()
    {
        return (
            <div className="hide-400" style={this.linkContainerStyle}>
                <div className="btn-with-shadow" style={this.linkStyle} to="/">{HOME}</div>
                <div className="btn-with-shadow" style={this.linkStyle} to="/list">{ALL_RECIPES}</div>
                <div className="btn-with-shadow" style={this.linkStyle} to="/upload">{UPLOAD}</div>
            </div>
        );
    }

    render()
    {
        let title = this.props.title || MAIN_TITLE;
        let useDropdown = this.props.useDropdown || true;
        let useSearch = this.props.useSearch || true;
        let useLinks = this.props.useLinks || true;

        return (
            <div style={this.bannerStyle}>
                <div style={this.mainContainerStyle}>
                    <div style={this.titleContainerStyle} onClick={this.doHome}>
                        <h1 style={this.titleStyle}>{title}</h1>
                    </div>

                    {useSearch ? this.renderSearch() : (null)}

                </div> 

                {useDropdown ? this.renderSettings() : (null)}
                {useLinks ? this.renderLinks() : (null)}                
            </div>
        );
    }
}

export default (Header);