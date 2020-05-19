import React from "react";

// Variable imports
import { getTextColor, getAccentColor } from "../../resources/colors";

export class Toast extends React.Component
{
    // Props:
    // alttext: alternative text of button, for text-to-speech tools, no default
    // onClick: what button will do when clicked, default do nothing
    // contrastmode: use contrastmode (aka nightmode/darkmode), default false
    // message: the text on the alert toast, no defaults

    // NB: Suggested usage is placing the renderToast() method id your render method (anywhere) and calling callToast(message, time) from Shared.jsx

    constructor(props)
    {
        super(props);
        
        this.state = this.initState();
    }

    initState()
    {
        return ({ containerStyle: 
        {
            position: "fixed",
            right: "0",
            bottom: "50%",
            cursor: "auto",
            overflow: "hidden",
            margin: "0.5em",
        },
        toastStyle:
        {
            display: "inline-block",
        },
        textContainerStyle:
        {
            padding: "0.5em",
        },
        textStyle:
        {
        } });
    }

    render()
    {
        return (
            <div style={{ ...this.state.containerStyle }}>
                <div style={{ ...this.state.toastStyle }} aria-label={this.props.alttext} onClick={this.props.onClick}>
                    <div style={{ ...this.state.textContainerStyle, ...getAccentColor(this.props.contrastmode) }}>
                        <div style={{ ...this.state.textStyle, ...getTextColor(this.props.contrastmode) }}>
                            {this.props.message}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}