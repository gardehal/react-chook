import React from "react";

import { getTextColor, getLightBackgroundColor, COLOR_TEXT } from "../../../public/colors";

export class Panel extends React.Component
{
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
        this.titleContainerStyle =
        {
            cursor: "pointer",
            padding: "5%",
            borderBottom: "2px solid " + COLOR_TEXT
        };
        this.textContainerStyle =
        {
            paddingLeft: "5%",
            paddingRight: "5%",
            paddingBottom: "5%",
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
            return <div/>;

        return (
                <div style={this.textContainerStyle}>
                    <div className="wrap" style={getTextColor(this.props.contrastmode)}>
                        {this.props.children}
                    </div>
                </div>
            );
    }

    render()
    {
        return (
            <div>
                <div className={this.props.className} style={getLightBackgroundColor(this.props.contrastmode)}>
                    <div style={this.titleContainerStyle} onClick={this.toggleExpanded}>
                        <h4 className="wrap" style={getTextColor(this.props.contrastmode)}>
                            {this.props.title}
                        </h4>
                    </div>

                    {this.renderContent()}
                </div>
            </div>
        );
    }
}