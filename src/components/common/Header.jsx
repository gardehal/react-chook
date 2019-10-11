import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

// Variable imports
import {MAIN_TITLE, SEARCH, SEARCH_SOMETHING, HOME, ALL_RECIPES, UPLOAD, PROFILE, SETTINGS, RELOAD, DEV_OPTIONS, LOG_OUT, LOG_IN} from "../../resources/language";
import { getAccentColor, getTextColor, getBackgroundColor } from "../../resources/colors";

class Header extends React.Component
{
    // Props:
    // contrastmode: use contrastmode (aka nightmode/darkmode), default false
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
        this.toggleLogin = this.toggleLogin.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    // Default state
    initState()
    {
        return { showDropdown: false };
    }

    // Default STATIC style
    initStyle()
    {
        this.bannerStyle =
        {
            width: "100%",
            height: "5em"
        };
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

    // Calling a search and moving to searchresult page
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

    // Go to frontpage ("Home" page)
    gotoHome()
    {
        // this.props.history.push("/");
    }

    // Go to page with all recipes listed
    gotoAllRecipes()
    {
        // this.props.history.push("/");
    }

    // Go to page for uploading
    gotoUpload()
    {
        // this.props.history.push("/");
    }

    // Go to profile page 
    gotoProfile()
    {
        // this.props.history.push("/");
    }

    // Go to settings page
    gotoSettings()
    {
        // this.props.history.push("/");
    }

    // Reload page
    doReload()
    {
        window.location.reload();
    }

    // TODO rename or find out what to do
    toggleLogin()
    {
        // this.props.history.push("/");
    }
    
    // Toggle settings dropdown menu
    toggleDropdown()
    {
        this.setState({showDropdown: !this.state.showDropdown});
    }

    // Render the dropdown with options
    renderSettings()
    {
        // Chage the cog, alt: make 2 images
        let filter = (this.props.contrastmode ? { filter: "invert(89%) sepia(0%) saturate(4%) hue-rotate(150deg) brightness(99%) contrast(94%)"} : (null));

        return (
            <div style={{ ...this.settingsContainerStyle }}>
                <div style={{ ...this.settingsButtonStyle, ...getTextColor(this.props.contrastmode), ...filter }} onClick={this.toggleDropdown}>
                    
                </div>
                {
                    this.state.showDropdown ? 
                    <div style={{ ...this.dropdownContainerStyle }}>
                        <div className="btn-with-shadow" style={{ ...this.dropdownContainerItemStyle, ...getTextColor(this.props.contrastmode) }} onClick={() => this.gotoProfile()}>
                            {PROFILE}
                        </div>
                        <div className="btn-with-shadow" style={{ ...this.dropdownContainerItemStyle, ...getTextColor(this.props.contrastmode) }} onClick={() => this.gotoSettings()}>
                            {SETTINGS}
                        </div>
                        <div className="btn-with-shadow" style={{ ...this.dropdownContainerItemStyle, ...getTextColor(this.props.contrastmode) }} onClick={() => this.doReload()}>
                            {RELOAD}
                        </div>
                        

                        <Link className="btn-with-shadow" style={{ ...this.dropdownContainerItemStyle, ...getTextColor(this.props.contrastmode) }}  to="/dev">{DEV_OPTIONS}</Link>
                        
                        <div className="btn-with-shadow" style={{ ...this.dropdownContainerItemStyle, ...getTextColor(this.props.contrastmode) }} onClick={() => this.toggleLogin()}>
                            {this.props.user ? LOG_OUT : LOG_IN}
                        </div>
                    </div>
                    :
                    (null)
                }
            </div>
        );
    }

    // Render search functionality in header
    renderSearch()
    {
        return (
            <div className="hide-650" style={{ ...this.searchContainerStyle }} >
                <form style={{ ...this.searchFormStyle, ...getTextColor(this.props.contrastmode) }} onSubmit={this.doSearch}>
                    <input style={{ ...this.searchFieldStyle, ...getTextColor(this.props.contrastmode) }} id="searchFieldHeader" type="text" placeholder={SEARCH_SOMETHING}/>
                    <div className="btn-with-shadow" style={{ ...this.searchButtonStyle, ...getTextColor(this.props.contrastmode) }} onClick={this.doSearch}>
                        {SEARCH}
                    </div>
                </form>
            </div>
        );
    }

    // Render section of links under header
    renderLinks()
    {
        return (
            <div className="hide-400" style={{ ...this.linkContainerStyle }}>
                <Link className="btn-with-shadow" style={{ ...this.linkStyle, ...getTextColor(this.props.contrastmode) }} to="/">{HOME}</Link>
                <Link className="btn-with-shadow" style={{ ...this.linkStyle, ...getTextColor(this.props.contrastmode) }} to="/">{ALL_RECIPES}</Link>
                <Link className="btn-with-shadow" style={{ ...this.linkStyle, ...getTextColor(this.props.contrastmode) }} to="/">{UPLOAD}</Link>
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
            <div style={{ ...this.bannerStyle, ...getAccentColor(this.props.contrastmode) }}>
                <div style={{ ...this.mainContainerStyle }}>
                    {/* <Link className="btn-with-shadow" style={{ ...this.linkStyle, ...getTextColor(this.props.contrastmode) }} to="/">{HOME}</Link> */}
                    <Link style={{ ...this.titleContainerStyle }} to="/">
                        <h1 style={{ ...this.titleStyle, ...getTextColor(this.props.contrastmode) }}>
                            {title}
                        </h1>
                    </Link>

                    {useSearch ? this.renderSearch() : (null)}

                </div> 

                {useDropdown ? this.renderSettings() : (null)}
                {useLinks ? this.renderLinks() : (null)}                
            </div>
        );
    }
}

const mapStateToProps = state => 
{
    const { contrastmode } = state.settings;
    return { contrastmode };
};

export default connect(
    mapStateToProps, { }
)(Header);