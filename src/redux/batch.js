
class Batch extends Pan { 
  
  constructor(parameters = {}) {
    super();
    this.batchWeight = 120000;
    this.bulkDensity = 760000;
    this.tabletWeight = 0.4;
    
    Object.getOwnPropertyNames(this).map(prop => {
        if(!parameters[prop]) { return }
        this[prop] = parameters[prop];
    });
  }
        
  // BATCH 
  get batchVolume() {
      return this.batchWeight / this.bulkDensity;
  }
  set batchVolume(value) {
      this.batchWeight = value * this.bulkDensity;
  }
  
  get tabletCount() {
      return Math.ceil(this.batchWeight / this.tabletWeight);
  }
  set tabletCount(value) {
      this.batchWeight = value * this.tabletWeight;
  }
  
  get brimWeight() {
    return this.calcWeight(this.brimVolume, this.bulkDensity);
  }
  
  // MAX WORKING VOLUME - Calculations for 100% to the brim of the pan
  get maxFillWeight() {
    return this.calcWeight(this.maxFillVolume, this.bulkDensity);
  }
  
  // MIN VOLUME - Calculations for 100% to the brim of the pan
  get minFillWeight() {
    return this.calcWeight(this.minFillVolume, this.bulkDensity);
  }
  
  // BATCH FILL VOLUME - Calculation based on batch volume
  get batchFillHeight() {
    //we estimate the heigh that will match our fill volume
    let saggita = 0;
    let step = this.brimHeight / 750;
    for(let i=0; i <= this.brimHeight; i = i + step){
      saggita = this.brimHeight - i;
      let volume = this.calcVolume(saggita);
      if(volume <= this.batchVolume){
        break;
      }
    }
    return saggita;
  }
  get batchFillLength() {
    return this.calcChordLength(this.batchFillHeight);
  }
  get batchFillVolumePercent() {
    return this.batchVolume / this.brimVolume;
  }
  
  // DATA FOR GRAPHS 
  get panRangeWeightVsFillHeight() {
    // initiate an empty array to store values in for loop
    let vals = [];
    let step = this.brimHeight / 50;
    console.log(this.brimHeight);
    // loop through different volumes and store the volume and height values
    for(var i=0; i <= this.brimHeight; i = i + step) {
        let fillHeight = i;
        let fillVolume = this.calcVolume(fillHeight);
        let fillWeight = this.calcWeight(fillVolume, this.bulkDensity);
        vals.push({weight: this.gramsToKilograms(fillWeight), height: this.metersToInches(fillHeight)});
    }
    return vals;
  }
  get workingFillWeightVsFillHeight() {
    // initiate an empty array to store values in for loop
    let vals = [];
    let step = (this.maxFillHeight - this.minFillHeight) / 50;
    
    // loop through different volumes and store the volume and height values
    for(var i = this.minFillHeight; i <= this.maxFillHeight; i = i + step) {
        let fillHeight = i;
        let fillVolume = this.calcVolume(fillHeight);
        let fillWeight = this.calcWeight(fillVolume, this.bulkDensity);
        vals.push({weight: this.gramsToKilograms(fillWeight), height: this.metersToInches(fillHeight)});
    }
    return vals;
    
  }
  get batchWeightVsHeight() {
    let vals = [];       
    vals.push({weight: this.gramsToKilograms(this.batchWeight), 
               height: this.metersToInches(this.batchFillHeight),
               label: "Batch Size"});
    return vals;
  }
  get referencePointsWeightVsHeight() {
    
    let vals = [];
    vals.push({weight: this.gramsToKilograms(this.minFillWeight), 
               height: this.metersToInches(this.minFillHeight),
               label:"Min Recommended"});
               
    vals.push({weight: this.gramsToKilograms(this.maxFillWeight), 
               height: this.metersToInches(this.maxFillHeight), 
               label:"Max Recommended"});
               
    vals.push({weight: this.gramsToKilograms(this.brimWeight), 
               height: this.metersToInches(this.brimHeight),
               label: "Brim Height"});
               
    if(this.baffleHeight > 0) {
      
      let vol = this.calcVolume(this.baffleHeight);
      let weight = this.calcWeight(vol, this.bulkDensity);
      vals.push({weight: this.gramsToKilograms(weight), 
                 height: this.metersToInches(this.baffleHeight),
                 label: "Baffle Height"});
    }
    return vals;
  }
  
  // HELPER FUNCTIONS
  gramsToKilograms(val) {
    return val / 1000;
  }
  calcWeight(volume, density) {
    return volume * density;
  }
  
  toJSON() {
      return {
          batchWeight: this.batchWeight,
          bulkDensity: this.bulkDensity,
          tabletWeight: this.tabletWeight,
          brimWeight: this.brimWeight,
          maxFillWeight: this.maxFillWeight, 
          minFillWeight: this.minFillWeight, 
          batchFillHeight: this.batchFillHeight, 
          batchFillLength: this.batchFillLength, 
          batchFillVolumePercent: this.batchFillVolumePercent,
          batchVolume: this.batchVolume,
          tabletCount: this.tabletCount,
          panRangeWeightVsFillHeight: this.panRangeWeightVsFillHeight,
          workingFillWeightVsFillHeight: this.workingFillWeightVsFillHeight,
          batchWeightVsHeight: this.batchWeightVsHeight,
          referencePointsWeightVsHeight: this.referencePointsWeightVsHeight,
          batchWeightInKG: (this.batchWeight / 1000).toFixed(1)
      };
  }
}
  