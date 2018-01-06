
const tabletInitialState = JSON.parse(sessionStorage.getItem('coating-toolbox-tablet')) || new Tablet({
    shape: 'round',
    length: 0.01,
    width: 0.0075,
    totalThickness: 0.00475,
    bandThickness: 0.00275,
    weight: 0.4,
    bulkDensity: 760000,
    productType: 'Pharmaceutical',
    productName: 'Colorcon Round Placebo',
    formulationName: 'Placebo WP2',
    companyName: 'Colorcon',
    contactName: 'Jason Hansell'
}).toJSON();
    
    // create a reducer for actions
function tabletReducer(state = tabletInitialState, action) {
    
    let tablet = new Tablet(state);
    
    switch(action.type) {
        case "SET_TABLET_PRODUCT_NAME": tablet.productName = action.value; break;
        case "SET_TABLET_FORMULATION_NAME": tablet.formulationName = action.value; break;
        case "SET_TABLET_CONTACT_NAME": tablet.contactName = action.value; break;
        case "SET_TABLET_COMPANY_NAME": tablet.companyName = action.value; break;
        case "SET_TABLET_PRODUCT_TYPE": tablet.productType = action.value; break;
        case "SET_TABLET_SHAPE": tablet.shape = action.value; break;
        case "SET_TABLET_WIDTH": tablet.width = action.value; break;
        case "SET_TABLET_LENGTH": tablet.length = action.value; break;
        case "SET_TABLET_TOTAL_THICKNESS": tablet.totalThickness = action.value; break;
        case "SET_TABLET_BAND_THICKNESS": tablet.bandThickness = action.value; break;
        case "SET_TABLET_WEIGHT": tablet.weight = action.value; break;
        case "SET_TABLET_BULK_DENSITY": tablet.bulkDensity = action.value; break;
        case "LOAD_TABLET_FROM_LIBRARY": tablet = new Tablet(action.value); break;
    }
    sessionStorage.setItem('coating-toolbox-tablet', JSON.stringify(tablet));
    return Object.assign({}, state, tablet.toJSON());
}