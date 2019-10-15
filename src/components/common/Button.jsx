import React from "react";

// Variable imports
import { getTextColor, getAccentColor } from "../../resources/colors";

export class Button extends React.Component
{
    // Props:
    // alttext: alternative text of button, for text-to-speech tools, no default
    // onClick: what button will do when clicked, no default
    // contrastmode: use contrastmode (aka nightmode/darkmode), default false
    // text: the text on the button, no defaults

    constructor(props)
    {
        super(props);
        
        this.initStyle();
    }

    initStyle()
    {
        this.containerStyle =
        {
            position: "relative",
            cursor: (this.props.onClick ? "pointer" : "auto"),
            overflow: "hidden",
            margin: "0.5em",
            opacity: (this.props.onClick ? "auto" : "0.5"),
        };
        this.buttonStyle = 
        {
            display: "inline-block",
        };
        this.textContainerStyle = 
        {
            padding: "0.5em",
        };
        this.textStyle = 
        {

        };
    }

    render()
    {
        return (
            <div style={{ ...this.containerStyle }}>
                <div style={{ ...this.buttonStyle }} aria-label={this.props.alttext} onClick={this.props.onClick}>
                    <div style={{ ...this.textContainerStyle, ...getAccentColor(this.props.contrastmode) }}>
                        <div style={{ ...this.textStyle, ...getTextColor(this.props.contrastmode) }}>
                            {this.props.text}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}