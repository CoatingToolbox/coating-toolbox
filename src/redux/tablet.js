class Tablet {
    
    constructor(parameters = {}) {
        // TABLET DIMENSIONS
        this.shape = 'round';
        this.length = 0.01;
        this.width = 0.0075;
        this.totalThickness = 0.00475;
        this.bandThickness = 0.00275;
        this.weight = 0.4;
        // BATCH 
        this.bulkDensity = 760000;
        // DESCRIPTION
        this.productType = '';
        this.productName = '';
        this.formulationName = '';
        this.companyName = '';
        this.contactName = '';
        this.firebaseKey = '';
        // SET PROPERTIES PASSED THROUGH
        Object.getOwnPropertyNames(this).map(name => {
            if (!parameters[name]) { return }
            this[name] = parameters[name];
        });
    }
    
    // TABLET
    get compressedDensity() {
      // if it is a measured tablet we calculated the density.
      return this.weight / this.totalVolume;
    }
    
    // TOOLING
    get cupThickness() {
        return (this.totalThickness - this.bandThickness) / 2;
    }
    get lengthCupRadius() {
            
        // see the link for more details on calculations
        // http://liutaiomottola.com/formulae/sag.htm
        let part1 = Math.pow(this.cupThickness, 2);
        let part2 = Math.pow(this.length / 2, 2);
        let part3 = 2 * this.cupThickness;
        return (part1 + part2) / part3;
    }
    get widthCupRadius() {
            
        // see the link for more details on calculations
        // http://liutaiomottola.com/formulae/sag.htm
        let part1 = Math.pow(this.cupThickness, 2);
        let part2 = Math.pow(this.width / 2, 2);
        let part3 = 2 * this.cupThickness;
        return (part1 + part2) / part3;
    }
    get perimeter() {
        
        let perimeter;

        switch (this.shape) {

            case 'round':
                perimeter = this.length * Math.PI;
                break;

            case 'oval':
                // Calculate the cup perimeters and set the value;

                //for most calculations we uses radius not diameter
                let r1 = this.length / 2;
                let r2 = this.width / 2;

                //circum of ellipse is estiamted first
                //using ramanujan approximation of the circumference
                // https://en.wikipedia.org/wiki/Ellipse#Equations
                // 3(a + b)
                let part1 = (r1 + r2) * 3;
                // 10 * a * b
                let part2 = r1 * r2 * 10;
                // 3 (a2 + b2)
                let part3 = 3 * (Math.pow(r1, 2) + Math.pow(r2, 2));
                //bring together terms under sqrt and take sqrt
                let part4 = Math.sqrt(part2 + part3);
                // PI * 3(a + b) - sqrt term
                perimeter = Math.PI * (part1 - part4);
                break;

            case 'caplet':
                // each arc at the end is half circle. return the periemter of a sphere
                // with a diameter equal to the width the of the tablet.
                let caps = Math.PI * this.width;
                
                // the length of the flat edge
                // the radius of the end cap is equal to the half the width of the tablet
                // remove a full width for both end caps
                // we have two sides so multiply by 2
                let sides = (this.length - this.width) * 2;
                
                perimeter = caps + sides;
                break;
        }
        
        return perimeter;
    }
    get crossSectionArea() {
        
      let crossSection;

      switch (this.shape) {

          case 'round':
              crossSection = Math.PI * Math.pow(this.length / 2, 2);
              break;

          case 'oval':
              //for most calculations we uses radius not diameter
              let r1 = this.length / 2;
              let r2 = this.width / 2;
              // Calculate the cross sectional area and set value
              //PI * widthRadius * lengthRadius
              crossSection = Math.PI * r1 * r2;
              break;

          case 'caplet':
              // each end cap is considered a half circle and the diameter is the width of the tablet
              // thereofre we return the area of a circle
              // we use full circle because there are two end caps
              let caps = Math.PI * Math.pow(this.width / 2, 2);
              
              // the surface area of the "rectanglualr" mid section;
              // subtract our the width because this is the end caps;
              let rect = this.width * (this.length - this.width);
              
              // bring the values together for the total area
              crossSection = caps + rect;

              break;
      }

      return crossSection;
    }
    
    
    // SUFACE AREA
    get cupArea() {
        
        let area;
        switch (this.shape) {

            case 'round':
                // Calculate the CUP SURFACE AREA
                // which is based on the surface area of a sphere section
                // http://www.had2know.com/academics/spherical-cap-volume-surface-area-calculator.html
                let rad2 = Math.pow(this.length / 2, 2);
                let cup2 = Math.pow(this.cupThickness, 2);
                area = Math.PI * rad2 + cup2;
                break;

            default:  //for both oval and caplet we use an ellipse based model
                //for most calculations we uses radius not diameter
                let r1 = this.length / 2;
                let r2 = this.width / 2;
                let r3 = this.cupThickness; //not divided by 2 because it is alread a radius;
                
                // Calculate the CUP SURFACE AREA
                //first calculate the surface area of (1) face
                //based on the surface area of ellipsoid but only use half
                let part1 = (Math.pow(r1 * r2, 1.6) + Math.pow(r1 * r3, 1.6) + Math.pow(r2 * r3, 1.6)) / 3;
                // we divide by 2 at the end to get half the surface area
                area = 4 * Math.PI * Math.pow(part1, 1 / 1.6) / 2;
                break;
        }

        return area;
    }
    get bandArea() {
        return this.perimeter * this.bandThickness;
    }
    get totalArea() {
        return this.bandArea + this.cupArea * 2;
    }
    
    
    // VOLUME
    get totalVolume() {
        return this.bandVolume + this.cupVolume * 2;
    }
    get bandVolume() {
        return this.crossSectionArea * this.bandThickness;
    }
    get cupVolume() {
        
        let vol;

        switch (this.shape) {

            case 'round':
                // Calculate the CUP VOLUME.
                //The volume of (1) tablet face
                //based on the volume of sphere section
                //http://www.had2know.com/academics/spherical-cap-volume-surface-area-calculator.html
                let part1 = this.cupThickness / 6 * Math.PI;
                let part2 = Math.pow(this.length / 2, 2) * 3;
                let part3 = Math.pow(this.cupThickness, 2);
                vol = part1 * (part2 + part3);
                break;

            default:   //for both oval and caplet we use an ellipse based calculation
                
                //for most calculations we uses radius not diameter
                let r1 = this.length / 2;
                let r2 = this.width / 2;
                let r3 = this.cupThickness; //not divided by 2 because it is alread a radius;
                
                // Calculate the CUP VOLUME.
                //The volume of (1) tablet face
                //we return 1/2 the cup volume of an ellipsoid
                vol = r1 * r2 * r3 * (4 / 3) * Math.PI / 2;
                break;
                
        }

        return vol;
    }
    
    
    // DISPLAY VALUES
    get isRound() {
        return (this.shape === 'round');
    }
    get dimensionsInMM() {
        // values in meters and need to convert to mm.
        let conv = 1000;
        if (this.shape === 'round') {
            return `${(this.length * conv).toFixed(1)}`;
        }
        else {
            return `${(this.length * conv).toFixed(1)} x ${(this.width * conv).toFixed(1)}`;
        }
    }
    get bulkDensityInGML() {
        return (this.bulkDensity * 1e-6).toFixed(2);
    }
    get compressedDensityInGML() {
        return (this.compressedDensity * 1e-6).toFixed(2);
    }
    get weightInMG() {
        return (this.weight * 1000).toFixed(1);
    }
    get batchWeightInKG() {
        return (this.batchWeight / 1000).toFixed(1);
    }
    get volumeInCM3() {
        return (this.totalVolume * 1000000).toFixed(2);
    }
    get surfaceAreaInCM2() {
        return (this.totalArea * 10000).toFixed(2);
    }
    
    toJSON() {
        return Object.assign({}, this, {
            bulkDensity: this.bulkDensity,
            compressedDensity: this.compressedDensity,
            cupThickness: this.cupThickness,
            lengthCupRadius: this.lengthCupRadius,
            widthCupRadius: this.widthCupRadius,
            perimeter: this.perimeter,
            crossSectionArea: this.crossSectionArea,
            cupArea: this.cupArea,
            cupVolume: this.cupVolume,
            bandArea: this.bandArea,
            bandVolume: this.bandVolume,
            totalArea: this.totalArea,
            totalVolume: this.totalVolume,
            isRound: this.isRound,
            dimensionsInMM: this.dimensionsInMM,
            bulkDensityInGML: this.bulkDensityInGML,
            compressedDensityInGML: this.compressedDensityInGML,
            weightInMG: this.weightInMG,
            batchWeightInKG: this.batchWeightInKG,
            volumeInCM3: this.volumeInCM3,
            surfaceAreaInCM2: this.surfaceAreaInCM2
        });
    }
}
  