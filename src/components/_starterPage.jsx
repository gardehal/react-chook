import React from "react";
import { connect } from "react-redux";
import store from "../store";

// Redux imports
import { } from "../actions/types";
import { getMetadataData, setMetadataData } from "../actions/MetadataActions";
import { renderLoading, renderError, setTitle, renderToast, } from "../resources/Shared";

// Variable imports
import { } from "../resources/language";
import { getBackgroundColor, getTextColor } from "../resources/colors";

// Component imports
import { ClickableImage } from "./common/ClickableImage";
import { Button } from "./common/Button";
import { Panel } from "./common/Panel";
import { Spinner } from "./common/Spinner";

class _starterPage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = this.initState();
    }

    componentWillMount()
    {
        getMetadataData();
        console.log(this.props.metadataResult);
        
        setTitle("CHANGEME");
    }

    initState()
    {
        return { };
    }

    renderContent()
    {
        return (
            <div>
                <ClickableImage image={require("../resources/pictures/vegetable-market-shelf.png")} alttext={METADATA} title={this.renderMetadata()}
                    coverText={true} cursor="cursor" contrastmode={this.props.contrastmode}/>
                <div>
                    RENDER ME
                </div>
            </div>);
    }

    render()
    {
        return (
            <div style={{ ...getBackgroundColor(this.props.contrastmode) }}>
                <div className="pageRootContainer">
                    <div style={{ ...getBackgroundColor(this.props.contrastmode) }}>
                        {renderToast(this.props.toastMessage, 5000, this.props.contrastmode)}
                        {this.renderContent()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => 
{
    const { contrastmode, toastMessage } = state.settings;
    const { user } = state.user;
    return { contrastmode, toastMessage, 
        user, };
};
  
export default connect(
    mapStateToProps, { }
)(DevPage);