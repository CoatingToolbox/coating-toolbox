
const coatingInitialState = JSON.parse(sessionStorage.getItem('coating-toolbox-coating')) || new Coating({
    productName: 'Opadry II 85F Series',
    formulaName: '85F18422',
    type: 'Immediate',
    color: 'White',
    // VISCOSITY
    solids: 0.2,
    viscosityIntercept: 20,
    viscosityExponent: 10,
    // COATING AMOUNT
    density: 1100000,
    weightGain: 0.03,
    // TABLET PROPERTIES
    tabletWeight: 0.4,
    batchWeight: 120000,
    tabletArea: 0.01,
}).toJSON();
    
    // create a reducer for actions
function coatingReducer(state = coatingInitialState, action) {
    
    let coat = new Coating(state);
    switch(action.type) {
        case "SET_COATING_PRODUCT_NAME": coat.productName = action.value; break;
        case "SET_COATING_FORMULA_NAME": coat.formulaName = action.value; break;
        case "SET_COATING_COLOR": coat.color = action.value; break;
        case "SET_COATING_TYPE": coat.type = action.value; break;
        case "SET_COATING_DENSITY": coat.density = action.value; break;
        case "SET_COATING_VISCOSITY_INTERCEPT": coat.viscosityIntercept = action.value; break;
        case "SET_COATING_VISCOSITY_EXPONENT": coat.viscosityExponent = action.value; break;
        case "SET_COATING_SOLIDS": coat.solids = action.value; break;
        case "LOAD_COATING_FROM_LIBRARY": coat = new Coating(action.value); break;
    }
    
    
    sessionStorage.setItem('coating-toolbox-coating', JSON.stringify(coat));
    return Object.assign({}, state, coat.toJSON());
}