import React from "react";
import { connect } from "react-redux";
import store from "../store";

// Redux imports
import { METADATA_LOADING, METADATA_LOADING_COMPLETE, METADATA_TEST_ERROR, METADATA_ERROR_RESOLVED } from "../actions/types";
import { getMetadataData, setMetadataData } from "../actions/MetadataActions";
import { renderLoading, renderError, getLongFormatDate, addLeadingZeros, setTitle, renderToast, getKolonialItemWithCheerio, searchDatabase, getRecipeFromWebsite } from "../resources/Shared";
import { login, logout, userCanEditFirebase, getUsername } from "../actions/UserActions";
import { toggleContrastMode, toggleMetricMode, callToast, toggleScraper } from "../actions/SettingsActions";

// Variable imports
import { TEST_ERROR, TOTAL_RECIPES, TOTAL_INGREDIENTS, 
    LAST_UPDATED, UPDATE_METADATA, METADATA, CONTRASTMODE, METRICMODE, SCRAPERMODE, DEV,
    FUNCTIONALITY_TEST_PANEL, SCRIPT_PANEL, LOG_IN, LOG_OUT, CAN_EDIT_DB, NOT_LOGGED_IN, LOGGED_IN_AS, ERROR, EMOJI_GREEN_CHECK, EMOJI_RED_X } from "../resources/language";
import { getBackgroundColor, getTextColor } from "../resources/colors";

// Component imports
import { ClickableImage } from "./common/ClickableImage";
import { Button } from "./common/Button";
import { Panel } from "./common/Panel";
import { Spinner } from "./common/Spinner";
import { IngredientType, IngredientTypeList } from "../models/enums/IngredientType";
import { createEnumFunctions } from "../resources/Scripts";
import { CookingMethod } from "../models/enums/CookingMethod";
import { Difficulty } from "../models/enums/Difficulty";
import { Preparation } from "../models/enums/Preparation";
import { QuantityUnit } from "../models/enums/QuantityUnit";
import { Protein } from "../models/enums/Protein";
import { RecipeType } from "../models/enums/RecipeType";
import { TempratureUnit } from "../models/enums/TempratureUnit";

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
        this.displayUserCanEditFirebase = this.displayUserCanEditFirebase.bind(this);
    }

    componentWillMount()
    {
        getMetadataData();
        console.log(this.props.metadataResult);
        
        setTitle(DEV);
    }

    initState()
    {
        return { };
    }

    async updateMetaData()
    {
        await setMetadataData();

        window.location.reload();
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


    async displayUserCanEditFirebase()
    {
        console.log("displayUserCanEditFirebase");

        let res = false;
        if(this.props.user)
        {
            console.log(this.props.user);
            res = await userCanEditFirebase(this.props.user.user.uid);
        }

        callToast(CAN_EDIT_DB + ": " + res);
    }

    renderFunctionButtons()
    {
        if(false) // if user is not admin
            return null;
        
        let contrastModeText = CONTRASTMODE + (this.props.contrastmode ? " " + EMOJI_GREEN_CHECK : " " + EMOJI_RED_X);
        let metricModeText = METRICMODE + (this.props.metricmode ? " " + EMOJI_GREEN_CHECK : " " + EMOJI_RED_X);
        let scraperModeText = SCRAPERMODE + (this.props.scraper ? " " + EMOJI_GREEN_CHECK : " " + EMOJI_RED_X);

        return (
            <div className="rowStyle">
                <Button onClick={this.updateMetaData} contrastmode={this.props.contrastmode} text={UPDATE_METADATA}/>   
                <Button onClick={() => toggleContrastMode()} contrastmode={this.props.contrastmode} text={contrastModeText}/>  
                <Button onClick={() => toggleMetricMode()} contrastmode={this.props.contrastmode} text={metricModeText}/> 
                <Button onClick={() => toggleScraper()} contrastmode={this.props.contrastmode} text={scraperModeText}/> 
                <Button onClick={() => getRecipeFromWebsite("https://www.nrk.no/mat/brownies-1.15048335")} contrastmode={this.props.contrastmode} text={"Test getRecipe NRK"}/> 
                <Button onClick={() => window.open("https://console.firebase.google.com/u/0/")} contrastmode={this.props.contrastmode} text={"Firebase"}/> 
                <Button onClick={() => window.open("https://kolonial.no")} contrastmode={this.props.contrastmode} text={"Kolonial"}/>            
            </div> );
    }

    renderLogin()
    {
        let uInput = "";
        let pInput = "";
    
        let userError = null;
        if(this.props.userError)
            userError = this.props.userError; // + scary red text and some h3-h4s

        let loggedInAs = NOT_LOGGED_IN;
        if(this.props.user)
            loggedInAs = LOGGED_IN_AS + " " + getUsername() ?? ERROR;

        let loginButton = null;
        if(this.props.userLoading)
            loginButton = <Spinner />;
        else
            loginButton = <Button onClick={() => login(uInput, pInput, "firebase")} text={LOG_IN}
                contrastmode={this.props.contrastmode} />;

        let logoutButton = null;
        if(this.props.user)
            logoutButton = <Button onClick={() => logout("firebase")} text={LOG_OUT}
                contrastmode={this.props.contrastmode} />;
        else
            logoutButton = <Button onClick={null} text={LOG_OUT}
                contrastmode={this.props.contrastmode} />;

        return (
            <div>
                <div>
                    <div style={getTextColor(this.props.contrastmode)}>{loggedInAs}</div>  
                </div>
                <div>
                    <div style={getTextColor(this.props.contrastmode)}>Username: </div>
                    <input type="email" onChange={e => uInput = e.target.value} />
                </div>
                <div>
                    <div style={getTextColor(this.props.contrastmode)}>Password: </div>
                    <input type="password" onChange={e => pInput = e.target.value} />
                </div>
                <div>
                    <div style={getTextColor(this.props.contrastmode)}>{userError}</div>
                </div>
                <div className="rowStyle">
                    {loginButton}
                    {logoutButton}

                    <div>
                        <Button onClick={this.displayUserCanEditFirebase} text={CAN_EDIT_DB}
                            contrastmode={this.props.contrastmode} />
                    </div>
                </div>
            </div>
        );
    }
    
    renderScriptsPanel()
    {
        return (<div>
            <div className="rowStyle">
                <Button onClick={() => getKolonialItemWithCheerio("chili")} contrastmode={this.props.contrastmode} text={"Test Cheerio (\"chili\")"}/> 
                <Button onClick={() => getKolonialItemWithCheerio("egg")} contrastmode={this.props.contrastmode} text={"Test Cheerio (\"egg\")"}/> 
                <Button onClick={() => searchDatabase("dim, sum", 4)} contrastmode={this.props.contrastmode} text={"Search Database (4, \"dim, sum\")"}/>
                <Button onClick={() => searchDatabase(".?im su.?")} contrastmode={this.props.contrastmode} text={"Search Database (0 \".?im su.?\")"}/>
                <Button onClick={() => console.log(IngredientTypeList(true))} contrastmode={this.props.contrastmode} text={"List IType t"}/>
                <Button onClick={() => console.log(IngredientTypeList(false))} contrastmode={this.props.contrastmode} text={"List IType f"}/>
            </div>
            <div className="rowStyle">
                <Button onClick={() => createEnumFunctions(CookingMethod, "CookingMethod")} contrastmode={this.props.contrastmode} text={"Create CookingMethod"}/>
                <Button onClick={() => createEnumFunctions(Difficulty, "Difficulty")} contrastmode={this.props.contrastmode} text={"Create Difficulty"}/>
                <Button onClick={() => createEnumFunctions(IngredientType, "IngredientType")} contrastmode={this.props.contrastmode} text={"Create IngredientType"}/>
                <Button onClick={() => createEnumFunctions(Preparation, "Preparation")} contrastmode={this.props.contrastmode} text={"Create Preparation"}/>
            </div>
            <div className="rowStyle">
                <Button onClick={() => createEnumFunctions(Protein, "Protein")} contrastmode={this.props.contrastmode} text={"Create Protein"}/>
                <Button onClick={() => createEnumFunctions(QuantityUnit, "QuantityUnit")} contrastmode={this.props.contrastmode} text={"Create QuantityUnit"}/>
                <Button onClick={() => createEnumFunctions(RecipeType, "RecipeType")} contrastmode={this.props.contrastmode} text={"Create RecipeType"}/>
                <Button onClick={() => createEnumFunctions(TempratureUnit, "TempratureUnit")} contrastmode={this.props.contrastmode} text={"Create TempratureUnit"}/>
            </div>
        </div>);
    }

    renderTestPanel()
    {
        return (<div>
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
        </div>);
    }

    renderRegisterSource()
    {
        return (<div>
            TODO
        </div>);
    }

    renderContent()
    {
        return (
            <div>
                <ClickableImage image={require("../resources/pictures/vegetable-market-shelf.png")} alttext={METADATA} title={this.renderMetadata()}
                    coverText={true} cursor="cursor" contrastmode={this.props.contrastmode}/>

                <div>
                    {/* Call functions */}
                    {this.renderFunctionButtons()} 

                    {/* Login for doing dev things */}
                    {this.renderLogin()}   

                    {/* Skripts for doing backend jobs */}
                    <Panel title={SCRIPT_PANEL} contrastmode={this.props.contrastmode}>
                        {this.renderScriptsPanel()}
                    </Panel>

                    {/* Testing functionality */}
                    <Panel title={FUNCTIONALITY_TEST_PANEL} contrastmode={this.props.contrastmode}>
                        {this.renderTestPanel()}   
                    </Panel>

                    {/* Testing functionality */}
                    <Panel title={"Register Source TODO"} contrastmode={this.props.contrastmode}>
                        {this.renderRegisterSource()}   
                    </Panel>
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
    const { contrastmode, metricmode, scraper, toastMessage } = state.settings;
    const { metadataError, metadataLoading, metadataResult } = state.meta;
    const { user } = state.user;
    return { contrastmode, metricmode, scraper, toastMessage, 
        metadataError, metadataLoading, metadataResult,
        user, };
};
  
export default connect(
    mapStateToProps, { getMetadataData, setMetadataData, toggleContrastMode, toggleMetricMode, callToast }
)(DevPage);