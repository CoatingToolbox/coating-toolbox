
let panInitialState = {
        panDiameter: 1.2192,
        openingDiameter: 0.4826,
        wallWidth: 0.508,
        brimWidth: 0.93345,
        model: "Fastcoat",
        manufacturer: "O'Hara",
        nickname: "O'Hara Fastcoat 48\" Room",
        company: 'Colorcon',
        locationName: 'Harlyesville, PA',
        baffleType: 'Ploughshare',
        baffleCount: '4',
        baffleHeight: '',
        gunMake: 'Schlick',
        gunModel: '930',
        gunCount: '3',
        gunToGunDistance: '0.1524',
        maxAirflow: '2000',
        perforations: 'Fully',
        firebaseKey: ''
    };
    
    // create a reducer for actions
function panReducer(state = panInitialState, action) {
    switch(action.type) {
            case "CALCULATE_PAN":
                return Object.assign({}, state, action.value);
        default: 
            return state;
    }
}