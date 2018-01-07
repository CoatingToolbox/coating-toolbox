class CoatingAmount {

        constructor(parameters={}) {
            this.filmDensity = 1100000;
            this.weightGain = 0.03;
            // TABLET PROPERTIES
            this.tabletWeight = 0.4;
            this.tabletArea = 0.01;
            
            // Set the properties that match the class
            Object.getOwnPropertyNames(this).map(name => {
                if(!parameters[name]) { return }
                this[name] = parameters[name];
            });
        }
        
        // DISPLAY VAlues
        get weightGainPercent() {
            return (this.weightGain * 100).toFixed(2);
        }
        get coatingWeight() {
            return this.tabletWeight * this.weightGain;
        }
        set coatingWeight(val) {
            this.weightGain = val / this.tabletWeight;
        }
        get filmThickness() {
            // (grams / meters^2) / (grams / meters^3) = meters
            return this.coatingCoverage / this.filmDensity;
        }
        set filmThickness(val) {
            this.coatingCoverage = val * this.filmDensity;
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
                weightGainPercent: this.weightGainPercent,
                densityInGML: this.densityInGML,
                coatingWeight: this.coatingWeight,
                filmThickness: this.filmThickness,
                coatingCoverage: this.coatingCoverage
            });
        }
    }
 