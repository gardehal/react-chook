import React from "react";
import { connect } from "react-redux";
import store from "../store";

// Redux imports
import { METADATA_LOADING, METADATA_LOADING_COMPLETE, METADATA_TEST_ERROR, METADATA_ERROR_RESOLVED } from "../actions/types";
import { getMetadataData, setMetadataData } from "../actions/MetadataActions";
import { renderLoading, renderError, getLongFormatDate, addLeadingZeros, setTitle, renderToast, getKolonialItemWithSelenium, loginFirebase } from "../resources/Shared";
import { toggleContrastmode, callToast } from "../actions/SettingsActions";

// Variable imports
import { TEST_ERROR, DB_META, TOTAL_RECIPES, TOTAL_INGREDIENTS, 
    LAST_UPDATED, UPDATE_METADATA, METADATA, CONTRASTMODE, DEV,
    FUNCTIONALITY_TEST_PANEL, SCRIPT_PANEL } from "../resources/language";
import { getBackgroundColor, getTextColor } from "../resources/colors";

// Component imports
import { ClickableImage } from "./common/ClickableImage";
import { Button } from "./common/Button";
import { Panel } from "./common/Panel";

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
        this.testToast = this.testToast.bind(this);
    }

    componentWillMount()
    {
        getMetadataData(DB_META);
        console.log(this.props.metadataResult);
        
        setTitle(DEV);
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
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    testLoading()
    {
        console.log("testLoading");
        store.dispatch({ type: METADATA_LOADING });
        this.sleep(3000).then(() => store.dispatch({ type: METADATA_LOADING_COMPLETE }));
    }

    testSmallLoading()
    {
        console.log("testSmallLoading");
        this.setState({ smallLoading: true });
        this.sleep(3000).then(() => this.setState({ smallLoading: false }));
    }

    testError()
    {
        console.log("testError");
        store.dispatch({ type: METADATA_TEST_ERROR });
        this.sleep(3000).then(() => store.dispatch({ type: METADATA_ERROR_RESOLVED }));
    }

    testSmallError()
    {
        console.log("testSmallError");
        this.setState({ smallError: TEST_ERROR });
        this.sleep(3000).then(() => this.setState({ smallError: "" }));
    }

    testToast()
    {
        console.log("testToast");
        callToast("Testing the Toast alert function!");
    }

    renderMetadata()
    {
        if(this.props.metadataLoading)
            return renderLoading(false, this.props.contrastmode);

        if(this.props.metadataError)
            return renderError(this.props.metadataError, false, this.props.contrastmode);

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

    renderLogin()
    {
        // TODO get information from inputs, create action and reducer for login/auth
        return (
            <div>
                <div>
                    Username: <input/>
                </div>
                <div>
                    Password: <input/>
                </div>
                <div>
                    <Button onClick={loginFirebase("", "", null, null, null)} text="Login"/> 
                </div>
            </div>
        );
    }

    doLogin()
    {

    }

    renderScriptsPanel()
    {
        return <Button onClick={() => getKolonialItemWithSelenium("egg")} contrastmode={this.props.contrastmode} text={"test Selenium"}/>   
    }


    renderContent()
    {
        return (
            <div>
                <ClickableImage image={require("../resources/pictures/vegetable-market-shelf.png")} alttext={METADATA} title={this.renderMetadata()}
                    coverText={true} cursor="cursor" contrastmode={this.props.contrastmode}/>

                <div>
                    {renderToast(this.props.toastMessage, 5000, this.props.contrastmode)}

                    {/* Call functions */}
                    <div className="rowStyle">
                        <Button onClick={this.updateMetaData} contrastmode={this.props.contrastmode} text={UPDATE_METADATA}/>   
                        <Button onClick={() => toggleContrastmode(this.props.contrastmode)} contrastmode={this.props.contrastmode} text={CONTRASTMODE}/>         
                    </div> 

                    {/* Call scripts from app */}
                    {/* <div className="rowStyle">
                        <Button onClick={this.testToast} contrastmode={this.props.contrastmode} text={"Test Toast"}/> 
                    </div> */}

                    {/* Usefull resources */}
                    <div className="rowStyle">
                        <Button onClick={() => window.open("https://console.firebase.google.com/u/0/")} contrastmode={this.props.contrastmode} text={"Firebase"}/> 
                        <Button onClick={() => window.open("https://kolonial.no")} contrastmode={this.props.contrastmode} text={"Kolonial"}/>      
                    </div> 
                    
                    {/* Login for doing dev things */}
                    {/* <div className="rowStyle"> */}
                    <div>
                        {this.renderLogin()}   
                    </div> 

                    <Panel title={SCRIPT_PANEL} contrastmode={this.props.contrastmode}>
                        {/* Skripts for doing backend jobs */}
                        <div className="rowStyle">
                            {this.renderScriptsPanel()}   
                        </div> 
                    </Panel>

                    <Panel title={FUNCTIONALITY_TEST_PANEL} contrastmode={this.props.contrastmode}>
                        {/* Testing functionality */}
                        <div className="rowStyle">
                            <Button onClick={this.testLoading} contrastmode={this.props.contrastmode} text={"Test Loading"}/> 
                            <Button onClick={this.testSmallLoading} contrastmode={this.props.contrastmode} text={"Test Small Loading"}/> 
                        </div>   
                        <div style={getTextColor(this.props.contrastmode)}>{this.state.smallLoading ? renderLoading(false, this.props.contrastmode) : "Click Test Small Loading"}</div>  
                        
                        <div className="rowStyle">
                            <Button onClick={this.testError} contrastmode={this.props.contrastmode} text={"Test Error"}/>   
                            <Button onClick={this.testSmallError} contrastmode={this.props.contrastmode} text={"Test Small Error"}/>
                        </div>
                        <div style={getTextColor(this.props.contrastmode)}>{this.state.smallError ? renderError(this.state.smallError, false, this.props.contrastmode) : "Click Test Small Error"}</div>

                        <div className="rowStyle">
                            <Button onClick={this.testToast} contrastmode={this.props.contrastmode} text={"Test Toast"}/> 
                        </div>
                    </Panel>
                </div>
            </div>);
    }

    render()
    {
        return (
            <div style={{ ...getBackgroundColor(this.props.contrastmode) }}>
                <div style={getBackgroundColor(this.props.contrastmode)}>
                    <div className="pageRootContainer">
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
    const { metadataError, metadataLoading, metadataResult } = state.meta;
    return { contrastmode, toastMessage, metadataError, metadataLoading, metadataResult };
};
  
export default connect(
    mapStateToProps, { getMetadataData, setMetadataData, toggleContrastmode, callToast }
)(DevPage);