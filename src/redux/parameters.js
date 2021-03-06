class Parameters {

        constructor(parameters={}) {
            this.panDiameter = 1;
            this.panSpeedRPM = 5;
            this.atomizationAir = 45;
            this.patternAir = 45;
            this.sprayPatternWidth = 0.1778;
            this.sprayRatePerGun = 100;
            this.gunToBed = 0.2032;
            
            // Set the properties that match the class
            Object.getOwnPropertyNames(this).map(name => {
                if(!parameters[name]) { return }
                this[name] = parameters[name];
            });
        }
        
        get linearVelocity() {
            // return meters per minute
            return Math.PI * this.panDiameter * this.panSpeedRPM;
        }
        set linearVelocity(value) {
            this.panSpeedRPM = value / (Math.PI * this.panDiameter);
        }
        
        get linearVelocityFPM() {
            return this.linearVelocity * 3.28084;
        }
        get velocityVsSpeedData() {
            // pan speed in rpm vs linear velocity in fpm
            let vals = [];
            for(let i = 5; i <= 125; i = i + 5) {
                vals.push({
                    linearVelocityFPM: i,
                    speedRPM: i / (Math.PI * this.panDiameter * 3.28084)
                });
            }
            return vals;
        }
        toJSON() {
            return Object.assign({}, this, {
                panSpeedString: this.panSpeedRPM.toFixed(2),
                linearVelocity: this.linearVelocity,
                linearVelocityFPM: this.linearVelocityFPM,
                velocityVsSpeedData: this.velocityVsSpeedData
            });
        }
    }
 