
const coatingInitialState = {
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
            
};
    
    // create a reducer for actions
function coatingReducer(state = coatingInitialState, action) {
    switch(action.type) {
        case "CALCULATE_COATING_FORMULA":
            return Object.assign({}, state, action.value);
        default: 
            return state;
    }
}