import React from "react";

import { getTextColor, getLightBackgroundColor, COLOR_TEXT } from "../../resources/colors";

export class Panel extends React.Component
{
    // Props:
    // alttext: alternative text of button, for text-to-speech tools, no default
    // contrastmode: use contrastmode (aka nightmode/darkmode), default false
    // text: the text on the button, no defaults
    // children: content that will be show/hidden, no defaults - NB: must be given as a child, something like this: <Panel>{childContent}</Panel>
    // startExpanded: should panel start expanded, default false

    constructor(props)
    {
        super(props);
        this.state = this.initState(this.props.startExpanded);
        this.initStyle();

        this.toggleExpanded = this.toggleExpanded.bind(this);
        this.renderContent = this.renderContent.bind(this);
    }

    initState(startExpanded = false)
    {
        if(startExpanded)
            return { expanded: true };
        
        return { expanded: false };
    }

    initStyle()
    {
        this.containerStyle = 
        {
            marginBottom: "0.5em",
        };
        this.titleContainerStyle =
        {
            cursor: "pointer",
            padding: "0.5em",
            borderBottom: "2px solid black "
        };
        this.textContainerStyle =
        {
            padding: "0.5em",
        };
    }

    toggleExpanded()
    {
        if(!this.state.expanded)
            this.setState({ expanded: true }); 
        else
            this.setState({ expanded: false }); 
    }

    renderContent()
    {
        if(!this.state.expanded)
            return (null);

        return (
                <div style={{ ...this.textContainerStyle }}>
                    <div className="wrap" style={{ ...getTextColor(this.props.contrastmode) }}>
                        {this.props.children}
                    </div>
                </div>
            );
    }

    render()
    {
        return (
            <div>
                <div className={this.props.className} style={{ ...this.containerStyle, ...getLightBackgroundColor(this.props.contrastmode) }}>
                    <div style={{ ...this.titleContainerStyle }} onClick={this.toggleExpanded}>
                        <h3 className="wrap" style={{ ...getTextColor(this.props.contrastmode) }}>
                            {this.props.title}
                        </h3>
                    </div>

                    {this.renderContent()}
                </div>
            </div>
        );
    }
}