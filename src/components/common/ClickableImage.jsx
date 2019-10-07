import React from "react";
import { COLOR_ACCENT } from "../../resources/colors";

export class ClickableImage extends React.Component
{
    // Props:
    // cursor: what cursor will do on hover, default "pointer"
    // coverText: should text cover image? boolean, default false
    // bannorColor: colour of textbackground, default COLOR_ACCENT
    // image: background image of element, no default
    // backgroundPosition: position of backgound image, default  "bottom"
    // onClick: what button will do when clicked, no default
    // alttext: alternative text of image, for text-to-speech tools, no default
    // title: text on top of image, no default

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
            margin: "10px",
            paddingTop: (this.props.coverText ? "10%" : "0"),
        };
        this.imageStyle =
        {
            backgroundImage: 'url(' + this.props.image + ')',
            zIndex: "1",
            height: "25vh",
            backgroundPosition: this.props.backgroundPosition || "bottom",
            backgroundSize: "100%",
            bottom: "300px"
        };
    }

    render()
    {
        return (
            <div style={this.containerStyle}>
                <div style={this.imageStyle} aria-label={this.props.alttext} onClick={this.props.onClick}>
                    <div style={this.titleContainerStyle}>
                        <h2 style={this.titleStyle}>
                            {this.props.title}
                        </h2>
                    </div>
                </div>
            </div>
        );
    }
}