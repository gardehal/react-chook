import React from "react";
import { connect } from "react-redux";

// Redux imports
import { getMetadataData } from "../actions/MetadataActions";
import { renderLoading, renderError, getLongFormatDate, setTitle } from "../actions/Shared";

// Variable imports
import { GET_RANDOM_DINNER, TOTAL_RECIPES, TOTAL_INGREDIENTS, LAST_UPDATED, 
    BUTTON, METADATA, GET_DINNER_WEEK_MENU, ABOUT_US, CONTRIBUTE_TO_PAGE } from "../resources/language";
import { getBackgroundColor } from "../resources/colors";

// Component imports
import { ClickableImage } from "./common/ClickableImage";

class HomePage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = this.initState();
        this.initStyle();
    }

    componentWillMount()
    {
        getMetadataData();
        
        setTitle();
    }

    initState()
    {
        return { loading: false, error: "", mData: {} };
    }
    
    initStyle()
    {
        this.contentContainerStyle =
        {
            position: "relative",
        };
    }

    renderMetadata()
    {
        if(this.props.metadataLoading)
            return renderLoading(false, this.props.contrastmode);

        if(this.props.metadataError)
            return renderError(this.state.error, false, this.props.contrastmode);

        if(this.props.metadataResult[0])
        {   
            let date = this.props.metadataResult[0].meta_last_updated_utc.split(" ");
            let time = date[1].split(":");

            let offset = new Date().getTimezoneOffset();
            let adjustedTime = new Date(date[0]);
            adjustedTime.setHours(parseInt(time[0]));
            adjustedTime.setMinutes(parseInt(time[1]) + Math.abs(offset));

            let result = getLongFormatDate(adjustedTime.getDate() + "-" + (adjustedTime.getMonth() + 1) + "-" + adjustedTime.getFullYear()) + " "
                + adjustedTime.getHours() + ":" + adjustedTime.getMinutes();

            return (
                    <div>
                        <div>
                            {this.props.metadataResult[0].meta_total_ingredients + TOTAL_INGREDIENTS}
                        </div>
                        <div>
                            {this.props.metadataResult[0].meta_total_recipes + TOTAL_RECIPES}
                        </div>
                        <div>
                            {LAST_UPDATED + result}
                        </div>
                        {/* users, admins, votes, etc. */}
                    </div>
                );
        }

        return <div/>
    }

    // TODO missing: Get dinner, get menu, link to about page, link to contribute/upload recipes page | onClick functionality
    renderContent()
    {
        return (
            <div>
                <ClickableImage image={require("../resources/pictures/vegetable-market-shelf.jpg")} alttext={METADATA} title={this.renderMetadata()}
                    coverText={true} cursor="cursor" contrastmode={this.props.contrastmode}/>
                <ClickableImage image={require("../resources/pictures/flour-pizza-hands.jpg")} alttext={GET_RANDOM_DINNER + BUTTON} title={GET_RANDOM_DINNER} 
                    backgroundPosition={"top"} onClick={this.getRandomDinner} contrastmode={this.props.contrastmode}/>
                <ClickableImage image={require("../resources/pictures/plates.jpg")} alttext={GET_DINNER_WEEK_MENU + BUTTON} title={GET_DINNER_WEEK_MENU}
                    contrastmode={this.props.contrastmode}/>
                <ClickableImage image={require("../resources/pictures/menu-waterglass.jpg")} alttext={ABOUT_US+ BUTTON} title={ABOUT_US} backgroundPosition={"center"}
                    contrastmode={this.props.contrastmode}/>
                <ClickableImage image={require("../resources/pictures/basil-tomato.jpg")} alttext={CONTRIBUTE_TO_PAGE + BUTTON} title={CONTRIBUTE_TO_PAGE}
                    backgroundPosition={"top"} contrastmode={this.props.contrastmode}/>
            </div>);
    }

    render()
    {
        return (
            <div style={{ ...getBackgroundColor(this.props.contrastmode) }}>
                <div className="pageRootContainer">
                    <div style={{ ...this.contentContainerStyle, ...getBackgroundColor(this.props.contrastmode) }}>
                        {this.renderContent()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => 
{
    const { contrastmode } = state.settings;
    const { metadataError, metadataLoading, metadataResult } = state.meta;
    return { contrastmode, metadataError, metadataLoading, metadataResult };
};
  
export default connect(
    mapStateToProps, { getMetadataData }
)(HomePage);