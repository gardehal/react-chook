import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {MAIN_TITLE, SEARCH, SEARCH_SOMETHING, HOME, ALL_RECIPES, UPLOAD, PROFILE, SETTINGS, RELOAD, DEV_OPTIONS, WELCOME, 
    EMAIL, PASSWORD, LOG_OUT, LOG_IN, ABORT,
    } from "../../resources/language";
import { getAccentColor, getTextColor, getLightBackgroundColor } from "../../resources/colors";
import { login, logout, isFirebaseUserLoggedIn, getUsername } from "../../actions/UserActions";

import { Row, Col, Modal } from "react-bootstrap";
import { Spinner } from "./Spinner";
import { Button } from "./Button";

class Header extends React.Component
{
    // Props:
    // contrastmode: use contrastmode (aka nightmode/darkmode), default false
    // title: set title on page, default MAIN_TITLE
    // useDropdown: render dropdown option and child-menus, default on
    // useSearch: render search, default on
    // useLinks: renders links under title/search, default on

    constructor(props)
    {
        super(props);

        this.state = this.initState();
        this.initStyle();

        this.doSearch = this.doSearch.bind(this);
        this.gotoProfile = this.gotoProfile.bind(this);
        this.gotoSettings = this.gotoSettings.bind(this);
        this.doReload = this.doReload.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.toggleLoginModal = this.toggleLoginModal.bind(this);
    }

    initState()
    {
        return { showDropdown: false, showLoginModal: false };
    }

    initStyle()
    {
        this.bannerStyle =
        {
            width: "100%",
            height: "5em"
        };
        this.mainContainerStyle =
        {
            position: "relative",
            display: "flex",
            width: "60%",
            marginLeft: "auto",
            marginRight: "auto",
        };
        this.titleContainerStyle =
        {
            cursor: "pointer",
            display: "inline-block",
        };
        this.titleStyle =
        {
            fontSize: "40px",
            margin: "0",
        };
        this.searchContainerStyle =
        {
            position: "absolute",
            right: "0",
            top: "25%",
            bottom: "25%",
            // width: "25%",
            maxWidth: "50%"
        };
        this.searchFormStyle =
        {
            display: "flex",
            height: "100%",
            borderBottom: "2px solid black",
        };
        this.searchFieldStyle =
        {
            background: "none",
            border: "none",
        };
        this.searchButtonStyle =
        {
            cursor: "pointer",
        };
        this.linkContainerStyle =
        {
            position: "relative",
            display: "flex",
            width: "60%",
            marginLeft: "auto",
            marginRight: "auto",
            
            justifyContent: "space-evenly",
            borderTop: "1px solid black"

        };
        this.linkStyle =
        {
            cursor: "pointer",
            fontSize: "1em",
            // border: "1px solid black"
        };
        this.settingsContainerStyle =
        {
            cursor: "pointer",
            position: "absolute",
            right: "1em",
            top: "1em",
            height: "3em",
            width: "3em",
        };
        this.settingsButtonStyle =
        {
            position: "absolute",
            height: "100%",
            width: "100%",
            backgroundImage: "url(" + require("../../resources/icons/cog.png") + ")",
            backgroundSize: "contain",
            zIndex: "3",
        };
        this.dropdownContainerStyle = 
        {
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            top: "3em",
            right: "-0.5em",
            backgroundColor: "gray",
            zIndex: "4",
        };
        this.dropdownContainerItemStyle = 
        {
            position: "relative",
            display: "flex",
            margin: "0.2em",
            float: "left",
            whiteSpace: "nowrap",
            fontSize: "1em",
            zIndex: "5",
        };
    }

    doSearch()
    {
        let term = encodeURIComponent(this.refs.searchFieldHeader.value);

        window.location.assign("/search/?term=" + term);
    }
 
    gotoProfile()
    {
        // this.props.history.push("/");
    }

    gotoSettings()
    {
        // this.props.history.push("/");
    }

    doReload()
    {
        window.location.reload();
    }

    toggleLoginModal() { this.setState({ showLoginModal: !this.state.showLoginModal }) };

    renderLogin()
    {
        let uInput = "";
        let pInput = "";
        let showLoginModal = this.state.showLoginModal;
        
        let header = LOG_IN;
        if(isFirebaseUserLoggedIn())
            header = WELCOME + ", " + getUsername();
        
        let userError = null;
        if(isFirebaseUserLoggedIn())
            userError = <span className="text-danger">{this.props.userError}</span>;
        
        let actions = null;
        if(this.props.userLoading)
            actions = <Spinner />;
        else if(isFirebaseUserLoggedIn())
            actions = (<>
                    <Button onClick={() => logout("firebase")} text={LOG_OUT}
                        contrastmode={this.props.contrastmode} />
                    <Button onClick={() => this.toggleLoginModal()} text={ABORT}
                        contrastmode={this.props.contrastmode} />
                    </>);
        else
            actions = (<>
                <Button onClick={() => login(uInput, pInput, "firebase")} text={LOG_IN}
                    contrastmode={this.props.contrastmode} />
                <Button onClick={() => this.toggleLoginModal()} text={ABORT}
                    contrastmode={this.props.contrastmode} />
                </>);

        return (
            <Modal show={showLoginModal} onHide={() => this.toggleLoginModal()}>
                <Modal.Header style={{ ...getLightBackgroundColor(this.props.contrastmode) }} closeButton>
                    <Modal.Title style={{ ...getTextColor(this.props.contrastmode) }}>{header}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ ...getLightBackgroundColor(this.props.contrastmode) }}>
                    <Row>
                        <Col style={{ ...getTextColor(this.props.contrastmode) }}>{EMAIL}</Col>
                        <Col><input type="email" onChange={e => uInput = e.target.value} /></Col>
                    </Row>
                    <Row>
                        <Col style={{ ...getTextColor(this.props.contrastmode) }}>{PASSWORD}</Col>
                        <Col><input type="password" onChange={e => pInput = e.target.value} /></Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer style={{ ...getLightBackgroundColor(this.props.contrastmode) }}>
                    {userError}
                    {actions}
                </Modal.Footer>
            </Modal>);
    }
    
    toggleDropdown()
    {
        this.setState({showDropdown: !this.state.showDropdown});
    }

    renderSettings()
    {
        let filter = (this.props.contrastmode ? { filter: "invert(89%) sepia(0%) saturate(4%) hue-rotate(150deg) brightness(99%) contrast(94%)"} : (null));

        return (
            <div style={{ ...this.settingsContainerStyle }}>
                <div style={{ ...this.settingsButtonStyle, ...getTextColor(this.props.contrastmode), ...filter }} onClick={this.toggleDropdown}>
                    
                </div>
                {
                    this.state.showDropdown ? 
                    <div style={{ ...this.dropdownContainerStyle }}>
                        <div className="btn-with-shadow" style={{ ...this.dropdownContainerItemStyle, ...getTextColor(this.props.contrastmode) }} onClick={() => this.gotoProfile()}>
                            {PROFILE}
                        </div>
                        <div className="btn-with-shadow" style={{ ...this.dropdownContainerItemStyle, ...getTextColor(this.props.contrastmode) }} onClick={() => this.gotoSettings()}>
                            {SETTINGS}
                        </div>
                        <div className="btn-with-shadow" style={{ ...this.dropdownContainerItemStyle, ...getTextColor(this.props.contrastmode) }} onClick={() => this.doReload()}>
                            {RELOAD}
                        </div>
                        

                        <Link className="btn-with-shadow" style={{ ...this.dropdownContainerItemStyle, ...getTextColor(this.props.contrastmode) }}  to="/dev">{DEV_OPTIONS}</Link>
                        
                        <div className="btn-with-shadow" style={{ ...this.dropdownContainerItemStyle, ...getTextColor(this.props.contrastmode) }} onClick={() => this.toggleLoginModal()}>
                            {this.props.user ? LOG_OUT : LOG_IN}
                        </div>
                    </div>
                    :
                    (null)
                }
            </div>
        );
    }

    renderSearch()
    {
        return (
            <div className="hide-650" style={{ ...this.searchContainerStyle }} >
                <form style={{ ...this.searchFormStyle, ...getTextColor(this.props.contrastmode) }} onSubmit={this.doSearch}>
                    <input id="searchFieldHeader" ref="searchFieldHeader" style={{ ...this.searchFieldStyle, ...getTextColor(this.props.contrastmode) }} type="text" placeholder={SEARCH_SOMETHING}/>
                    <div className="btn-with-shadow" style={{ ...this.searchButtonStyle, ...getTextColor(this.props.contrastmode) }} onClick={this.doSearch}>
                        {SEARCH}
                    </div>
                </form>
            </div>
        );
    }

    renderLinks()
    {
        return (
            <div className="hide-400" style={{ ...this.linkContainerStyle }}>
                <Link className="btn-with-shadow" style={{ ...this.linkStyle, ...getTextColor(this.props.contrastmode) }} to="/">{HOME}</Link>
                <Link className="btn-with-shadow" style={{ ...this.linkStyle, ...getTextColor(this.props.contrastmode) }} to="/list">{ALL_RECIPES}</Link>
                <Link className="btn-with-shadow" style={{ ...this.linkStyle, ...getTextColor(this.props.contrastmode) }} to="/upload">{UPLOAD}</Link>
            </div>
        );
    }

    render()
    {
        let title = this.props.title || MAIN_TITLE;
        let useDropdown = this.props.useDropdown || true;
        let useSearch = this.props.useSearch || true;
        let useLinks = this.props.useLinks || true;

        return (
            <div style={{ ...this.bannerStyle, ...getAccentColor(this.props.contrastmode) }}>
                <div style={{ ...this.mainContainerStyle }}>
                    {/* <Link className="btn-with-shadow" style={{ ...this.linkStyle, ...getTextColor(this.props.contrastmode) }} to="/">{HOME}</Link> */}
                    <Link style={{ ...this.titleContainerStyle }} to="/">
                        <h1 style={{ ...this.titleStyle, ...getTextColor(this.props.contrastmode) }}>
                            {title}
                        </h1>
                    </Link>

                    {useSearch ? this.renderSearch() : (null)}

                </div> 

                {useDropdown ? this.renderSettings() : (null)}
                {useLinks ? this.renderLinks() : (null)}     
                {this.renderLogin()}           
            </div>
        );
    }
}

const mapStateToProps = state => 
{
    const { contrastmode } = state.settings;
    const { user } = state.user;
    return { contrastmode,
        user, };
};

export default connect(
    mapStateToProps, { }
)(Header);