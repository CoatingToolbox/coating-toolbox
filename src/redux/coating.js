class Coating {

        constructor(parameters={}) {
            // VISCOSITY
            this.solids = 0.2;
            this.viscosityIntercept = 20;
            this.viscosityExponent = 10;
            // FILM PROPERTIES
            this.density = 1100000;
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
 