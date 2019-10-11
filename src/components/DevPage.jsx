import React from "react";
import { connect } from 'react-redux';
import store from "../store";

// Redux imports
import { METADATA_LOADING, METADATA_LOADING_COMPLETE, METADATA_TEST_ERROR, METADATA_ERROR_RESOLVED } from "../actions/types";
import { getMetadataData, setMetadataData } from "../actions/MetadataActions";
import { renderLoading, renderError, getLongFormatDate, addLeadingZeros } from "../actions/Shared";
import { toggleContrastmode } from "../actions/SettingsActions";

// Variable imports
import { TEST_ERROR, DB_META, TOTAL_RECIPES, TOTAL_INGREDIENTS, 
    LAST_UPDATED, UPDATE_METADATA, METADATA } from "../resources/language";
import { getBackgroundColor } from "../resources/colors";

// Component imports
import { ClickableImage } from "./common/ClickableImage";

class DevPage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = this.initState();

        this.updateMetaData = this.updateMetaData.bind(this);
        this.testLoading = this.testLoading.bind(this);
        this.testSmallLoading = this.testSmallLoading.bind(this);
        this.testError = this.testError.bind(this);
        this.testSmallError = this.testSmallError.bind(this);
    }

    componentWillMount()
    {
        getMetadataData(DB_META);
        console.log(this.props.metadataResult);
    }

    initState()
    {
        return { };
    }

    updateMetaData()
    {
        setMetadataData();
    }

    sleep(milliseconds)
    {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    testLoading()
    {
        console.log("TestLoading");
        store.dispatch({ type: METADATA_LOADING });
        this.sleep(3000).then(() => store.dispatch({ type: METADATA_LOADING_COMPLETE }));
    }

    testSmallLoading()
    {
        console.log("TestSmallLoading");
        this.setState({ smallLoading: true });
        this.sleep(3000).then(() => this.setState({ smallLoading: false }));
    }

    testError()
    {
        console.log("TestError");
        store.dispatch({ type: METADATA_TEST_ERROR });
        this.sleep(3000).then(() => store.dispatch({ type: METADATA_ERROR_RESOLVED }));
    }

    testSmallError()
    {
        console.log("TestSmallError");
        this.setState({ smallError: TEST_ERROR });
        this.sleep(3000).then(() => this.setState({ smallError: "" }));
    }

    renderMetadata()
    {
        if(this.props.metadataLoading)
            return renderLoading(true);

        if(this.props.metadataError)
            return renderError(this.state.error, true);

        if(this.props.metadataResult[0])
        {   
            let date = this.props.metadataResult[0].meta_last_updated_utc.split(" ");
            let time = date[1].split(":");

            let offset = new Date().getTimezoneOffset();
            let adjustedTime = new Date(date[0]);
            adjustedTime.setHours(parseInt(time[0]));
            adjustedTime.setMinutes(parseInt(time[1]) + Math.abs(offset));

            let result = getLongFormatDate(adjustedTime.getDate() + "-" + (adjustedTime.getMonth() + 1) + "-" + adjustedTime.getFullYear()) + " "
                + addLeadingZeros(adjustedTime.getHours()) + ":" + addLeadingZeros(adjustedTime.getMinutes());

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

    renderContent()
    {
        if(this.props.metadataLoading)
            return renderLoading(true);

        if(this.props.metadataError)
            return renderError(this.props.metadataError, true);

        return (
            <div style={getBackgroundColor(this.props.contrastmode)}>
                <div className="pageRootContainer">
                    <ClickableImage image={require("../resources/pictures/vegetable-market-shelf.jpg")} alttext={METADATA} title={this.renderMetadata()}
                        coverText={true} cursor="cursor" contrastmode={this.props.contrastmode}/>

                    <div className="btnSection">

                        <div className="btnPart">
                            <div className="btn" onClick={this.updateMetaData}>
                                {UPDATE_METADATA}
                            </div>       
                            <div onClick={() => toggleContrastmode(this.props.contrastmode)}>
                                Contrast
                            </div>                 
                            <div>
                                <a href="https://console.firebase.google.com/u/0/">Firebase</a>
                            </div>
                            <div>
                                <a href="https://kolonial.no">Kolonial</a>
                            </div>
                        </div>

                        <div className="btnPart">
                            <div className="btn" onClick={this.testLoading}>Test Loading</div>
                            <div className="btn" onClick={this.testSmallLoading}>Test Small Loading</div>
                            <div>{this.state.smallLoading ? renderLoading(false) : "Click Test Small Loading"}</div>
                        </div>
                        
                        <div className="btnPart">
                            <div className="btn" onClick={this.testError}>Test Error</div>
                            <div className="btn" onClick={this.testSmallError}>Test Small Error</div>
                            <div>{this.state.smallError ? renderError(this.state.smallError, false) : "Click Test Small Error"}</div>
                        </div>
                    </div>
                </div>
            </div>);
    }

    render()
    {
        return (
            <div>
                {this.renderContent()}
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
    mapStateToProps, { getMetadataData, setMetadataData, toggleContrastmode }
)(DevPage);