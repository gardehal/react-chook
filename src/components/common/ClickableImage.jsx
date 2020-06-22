import React from "react";

// Variable imports
import { COLOR_ACCENT, getTextColor, getAccentColor } from "../../resources/colors";

export class ClickableImage extends React.Component
{
    // Props:
    // contrastmode: use contrastmode (aka nightmode/darkmode), default false
    // cursor: what cursor will do on hover, default "pointer"
    // coverText: should text cover image? boolean, default false
    // bannorColor: colour of textbackground, default COLOR_ACCENT
    // image: background image of element, no default
    // backgroundPosition: position of backgound image, default  "bottom"
    // onClick: what button will do when clicked, no default
    // alttext: alternative text of image, for text-to-speech tools, no default
    // title: text on top of image, no default
    // marginBottom: padding under image, default 0.5 em

    constructor(props)
    {
        super(props);
        
        this.initStyle();
    }

    initStyle()
    {
        this.containerStyle =
        {
            // position: "relative",
            cursor: this.props.cursor || "pointer",
            overflow: "hidden",
            marginBottom: this.props.marginBottom || "0.5em",
        };
        this.titleContainerStyle =
        {
            position: "relative",
            zIndex: "2",
            bottom: (this.props.coverText ? "0" : "-80%"),
            height: (this.props.coverText ? "100%" : "20%"),
            opacity: "0.8",
            backgroundColor: this.props.bannerColor || COLOR_ACCENT,
            // textAlign: "center",
        };
        this.titleStyle =
        {
            fontSize: "25px",
            margin: "0em",
            marginLeft: "1em",
            paddingTop: (this.props.coverText ? "3em" : "0.5em"),
        };
        this.imageStyle =
        {
            backgroundImage: "url(" + this.props.image + ")",
            zIndex: "1",
            height: "20em",
            // height: "25vh",
            backgroundPosition: this.props.backgroundPosition || "bottom",
            backgroundSize: "100%",
            bottom: "12em"
        };
    }

    render()
    {
        return (
            <div className={this.props.coverText ? "" : "moveable-btn"} style={{ ...this.containerStyle }}>
                <div style={{ ...this.imageStyle }} aria-label={this.props.alttext} onClick={this.props.onClick}>
                    <div style={{ ...this.titleContainerStyle, ...getAccentColor(this.props.contrastmode) }}>
                        <h2 style={{ ...this.titleStyle, ...getTextColor(this.props.contrastmode) }}>
                            {this.props.title}
                        </h2>
                    </div>
                </div>
            </div>
        );
    }
}