import React from "react";
import { connect } from "react-redux";

import { MADE_WITH_TECH, SCROLL_TO_TOP } from "../../resources/language";
import { HYPERLINK_HINT, getAccentColor, getTextColor } from "../../resources/colors";
import { Button } from "./Button";

class Footer extends React.Component
{

    constructor(props)
    {
        super(props);

        this.initStyle();
    }

    // https://css-tricks.com/snippets/css/complete-guide-grid/
    initStyle()
    {
        this.bannerStyle =
        {
            width: "100%",
            height: "5em",
            backgroundColor: "#020202",
        };
        this.mainContainerStyle =
        {
            display: "grid",
            gridTemplateColumns: "10% 10% 10% 10% 10% 10% 10% 10% 10% 10%",
            gridTemplateRows: "1em 1em 1em 1em 1em",
            width: "60%",
            marginLeft: "auto",
            marginRight: "auto",
        };
        this.madeWithCell =
        {
            justifyContent: "space-evenly",
            gridColumn: "1 / 7",
            gridRow: "1 / 2",
        };
        this.githubCell =
        {
            justifyContent: "space-evenly",
            gridColumn: "1 / 3",
            gridRow: "2 / 3",
        };
        this.herokuCell =
        {
            justifyContent: "space-evenly",
            gridColumn: "1 / 3",
            gridRow: "3 / 4",
        };
        this.returnTopCell =
        {
            justifyContent: "space-evenly",
            gridColumn: "9 / 11",
            gridRow: "1 / 3",
        };
        this.linkButtonBackground =
        {
            borderColor: HYPERLINK_HINT, 
        };
    }

    render()
    {
        return (
            <div style={{ ...this.bannerStyle }}>
                <div style={{ ...this.mainContainerStyle }}>
                    <p style={{ ...getTextColor(true), ...this.madeWithCell }}>
                        {MADE_WITH_TECH}
                    </p>
                    
                    <p style={{ ...getTextColor(this.props.contrastmode), ...this.githubCell }}>
                        <a href="https://github.com/grdall/react-chook" target="_blank">Github</a>
                    </p>
                    
                    <p style={{ ...getTextColor(this.props.contrastmode), ...this.herokuCell }}>
                        <a href="https://github.com/grdall/react-chook" target="_blank">Heroku</a>
                    </p>

                    <div style={{ ...this.returnTopCell, ...this.linkButtonBackground }}>
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