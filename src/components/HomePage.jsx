import React from "react";
import { connect } from 'react-redux';

import { getMetadataData } from "../actions/MetadataActions";
import { GET_RANDOM_DINNER, DB_RECIPE, DINNER, DB_META, TOTAL_RECIPES, TOTAL_INGREDIENTS, LAST_UPDATED } from "../resources/language-no";
import { getBackgroundColor } from "../resources/colors";

class HomePage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = this.initState();
    }

    componentWillMount()
    {
        getMetadataData(DB_META);
        console.log(this.props.metadataResult);
    }

    initState()
    {
        return { loading: false, error: "", mData: {} };
    }

    renderMetadata()
    {
        if(this.props.metadataResult[0])
        {   
            let date = this.props.metadataResult[0].meta_last_updated_utc.split(" ");
            let time = date[1].split(":");

            // let offset = new Date().getTimezoneOffset();
            // let adjustedTime = new Date(date[0]);
            // adjustedTime.setHours(parseInt(time[0]));
            // adjustedTime.setMinutes(parseInt(time[1]) + Math.abs(offset));

            // let result = getLongFormatDate(adjustedTime.getDate() + "-" + (adjustedTime.getMonth() + 1) + "-" + adjustedTime.getFullYear()) + " "
            //     + adjustedTime.getHours() + ":" + adjustedTime.getMinutes();

            return (
                    <div>
                        <p>{TOTAL_INGREDIENTS + this.props.metadataResult[0].meta_total_ingredients}</p>
                        <p>{TOTAL_RECIPES + this.props.metadataResult[0].meta_total_recipes}</p>
                        {/* <p>{LAST_UPDATED + result}</p> */}
                        {/* users, admins, votes, etc. */}
                    </div>
                );
        }

        return <div/>
    }

    renderContent()
    {
        // if(this.state.loading)
        //     return renderLoading(true);

        // if(this.state.error)
        //     return renderError(this.state.error, true);

        return (
            <div>
            {/* // className="containerStyle" style={getBackgroundColor(this.props.contrastmode)}> */}
                {this.renderMetadata()}

                {/* <div className="btnSection">
                    <div className="btnPart">
                        <div className="btn" onClick={this.getRandomDinner}>{GET_RANDOM_DINNER}</div>
                        
                    </div>
                </div> */}
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
    const { metadataResult } = state.meta;
    return { metadataResult };
};
  
export default connect(
    mapStateToProps, { getMetadataData }
)(HomePage);