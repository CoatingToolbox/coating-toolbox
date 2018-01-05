class Coating {

        constructor(parameters={}) {
            // VISCOSITY
            this.solids = 0.2;
            this.viscosityIntercept = 20;
            this.viscosityExponent = 10;
            // COATING AMOUNT
            this.density = 1100000;
            this.weightGain = 0.03;
            // TABLET PROPERTIES
            this.tabletWeight = 0.4;
            this.batchWeight = 120000;
            this.tabletArea = 0.01;
            // DESCRIPTION
            this.productName = '';
            this.formulaName = '';
            this.type = '';
            this.color = '';
            this.firebaseKey = '';
            
            // Set the properties that match the class
            Object.getOwnPropertyNames(this).map(name => {
                if(!parameters[name]) { return }
                this[name] = parameters[name];
            });
        }
        
        // Film Properties
        get viscosity() {
            return this.viscosityIntercept * Math.exp(this.viscosityExponent * this.solids);
        }
        set viscosity(viscosity) {
            this.solids = Math.log(this.viscosity / this.viscosityIntercept) / this.viscosityExponent;
        }
        
        // DISPLAY VAlues
        get weightGainPercent() {
            return (this.weightGain * 100).toFixed(2);
        }
        get solidsInPercent() {
            return (this.solids * 100).toFixed(1);
        }
        get densityInGML() {
            return (this.density * 1e-6).toFixed(2);
        }
        get viscosityRounded() {
            return this.viscosity.toFixed(0);
        }
        
        get coatingWeight() {
            return this.tabletWeight * this.weightGain;
        }
        set coatingWeight(val) {
            this.weightGain = val / this.tabletWeight;
        }
        get filmThickness() {
            // (grams / meters^2) / (grams / meters^3) = meters
            return this.coatingCoverage / this.density;
        }
        set filmThickness(val) {
            this.coatingCoverage = val * this.density;
        }
        get coatingCoverage() {
            // grams * percent / meters^2 = grams / meters^2
            return this.coatingWeight / this.tabletArea;
        }
        set coatingCoverage(val) {
            
            this.coatingWeight = val * this.tabletArea;
        }
        
        toJSON() {
            return Object.assign({}, this, {
                viscosity: this.viscosity,
                weightGainPercent: this.weightGainPercent,
                solidsInPercent: this.solidsInPercent,
                densityInGML: this.densityInGML,
                viscosityRounded: this.viscosityRounded,
                coatingWeight: this.coatingWeight,
                filmThickness: this.filmThickness,
                coatingCoverage: this.coatingCoverage
            });
        }
    }
 
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