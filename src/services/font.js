


export const setOptionStored = () =>{
    const getFontSize    = localStorage.getItem("fontSize");
    const getFontName    = localStorage.getItem("fontName");
    const getFontSerif   = localStorage.getItem("fontSerif");
    const getFontSpacing = localStorage.getItem("fontSpacing");

    fontSizeInput.value    = getFontSize;
    select.value           = getFontName;
    fontSpacingInput.value = getFontSpacing;

    html.style.fontSize      = getFontSize+'px';
    html.style.fontFamily    = getFontName+","+getFontSerif;
    html.style.letterSpacing = getFontSpacing+'px';

    allInput.forEach(element => {
        element.style.fontSize   = getFontSize+'px';
        element.style.fontFamily = getFontName+","+getFontSerif;
        element.style.letterSpacing = getFontSpacing+'px';
    })
}