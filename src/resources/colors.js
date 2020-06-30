// All colors used in project
/*
export const VARNAME = "#HEX";
*/

export const WHITE = "#ffffff";
export const BLACK = "#000000";
export const RED = "red";
export const HYPERLINK_HINT = "#53a2bf";

export const COLOR_BACKGROUND = "#bbbbbb";
export const COLOR_LIGHT_BACKGROUND = "#f3f3f3";
export const COLOR_TEXT = "#333333";
export const COLOR_BUTTON_TEXT = "#ffffff";
export const COLOR_BUTTON = "#b76e79";
export const COLOR_ACCENT = "#3EC35D";

export const CONTRAST_BACKGROUND = "#1e1e1e";
export const CONTRAST_LIGHT_BACKGROUND = "#333333";
export const CONTRAST_TEXT = "#dddddd";
export const CONTRAST_BUTTON_TEXT = "#ffffff";
export const CONTRAST_BUTTON = "#b995af";
export const CONTRAST_ACCENT = "#103310";

export const getBackgroundColor = (contrastmode) =>
{
    return contrastmode ? {backgroundColor: CONTRAST_BACKGROUND} : {backgroundColor: COLOR_BACKGROUND};
};

export const getLightBackgroundColor = (contrastmode) =>
{
    return contrastmode ? {backgroundColor: CONTRAST_LIGHT_BACKGROUND} : {backgroundColor: COLOR_LIGHT_BACKGROUND};
};

export const getTextColor = (contrastmode) =>
{
    return contrastmode ? {color: CONTRAST_TEXT} : {color: COLOR_TEXT};
};

export const getButtonTextColor = (contrastmode) =>
{
    return contrastmode ? {backgroundColor: CONTRAST_BUTTON_TEXT} : {backgroundColor: COLOR_BUTTON_TEXT};
};

export const getButtonColor = (contrastmode) =>
{
    return contrastmode ? {backgroundColor: CONTRAST_BUTTON} : {backgroundColor: COLOR_BUTTON};
};

export const getAccentColor = (contrastmode) =>
{
    return contrastmode ? {backgroundColor: CONTRAST_ACCENT} : {backgroundColor: COLOR_ACCENT};
};