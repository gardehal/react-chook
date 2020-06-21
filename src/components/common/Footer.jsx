import React from "react";
import { connect } from "react-redux";

import { SCROLL_TO_TOP } from "../../resources/language";
import { getAccentColor, getTextColor } from "../../resources/colors";
import { Button } from "./Button";

class Footer extends React.Component
{
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

    // TODO grid, button is hard to see (same background, outline? setup alternative button style for use on accents?, static colour footer?)
    render()
    {
        return (
            <div style={{ ...this.bannerStyle, ...getAccentColor(this.props.contrastmode) }}>
                <div style={{ ...this.mainContainerStyle }} className="rowStyle">
                    <div>
                        <p style={{ ...getTextColor(this.props.contrastmode) }}>
                            Made with: React, Firebase, with help from Kolonial
                        </p>
                        
                        <p style={{ ...getTextColor(this.props.contrastmode) }}>
                            <a href="https://github.com/grdall/react-chook" target="_blank">Github</a>
                        </p>
                        
                        <p style={{ ...getTextColor(this.props.contrastmode) }}>
                            <a href="https://github.com/grdall/react-chook" target="_blank">Heroku</a>
                        </p>
                    </div>

                    <div>
                        <Button onClick={() => window.scrollTo(0, 0)} text={SCROLL_TO_TOP}
                            contrastmode={this.props.contrastmode} /> 
                    </div>
                </div>        
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
)(Footer);