
const panInitialState = JSON.parse(sessionStorage.getItem('coating-toolbox-pan')) || new Pan({
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
    }).toJSON();
    
    // create a reducer for actions
function panReducer(state = panInitialState, action) {
    
    let pan = new Pan(state);
    switch(action.type) {
            case "SET_PAN_NICKNAME": pan.nickname = action.value; break;
            case "SET_PAN_MANUFACTURER": pan.manufacturer = action.value; break;
            case "SET_PAN_MODEL": pan.model = action.value; break;
            case "SET_PAN_COMPANY": pan.company = action.value; break;
            case "SET_PAN_LOCATION_NAME": pan.locationName = action.value; break;
            case "SET_PAN_DIAMETER": pan.panDiameter = action.value; break;
            case "SET_PAN_OPENING_DIAMETER": pan.openingDiameter = action.value; break;
            case "SET_PAN_BRIM_WIDTH": pan.brimWidth = action.value; break;
            case "SET_PAN_WALL_WIDTH": pan.wallWidth = action.value; break;
            case "SET_PAN_PERFORATIONS": pan.perforations = action.value; break;
            case "SET_PAN_MAX_AIRFLOW": pan.maxAirflow = action.value; break;
            case "SET_PAN_GUN_MAKE": pan.gunMake = action.value; break;
            case "SET_PAN_GUN_MODEL": pan.gunModel = action.value; break;
            case "SET_PAN_GUN_COUNT": pan.gunCount = action.value; break;
            case "SET_PAN_GUN_TO_GUN_DISTANCE": pan.gunToGunDistance = action.value; break;
            case "SET_PAN_BAFFLE_TYPE": pan.baffleType = action.value; break;
            case "SET_PAN_BAFFLE_COUNT": pan.baffleCount = action.value; break;
            case "SET_PAN_BAFFLE_HEIGHT": pan.baffleHeight = action.value; break;
            case "LOAD_PAN_FROM_LIBRARY": pan = new Pan(action.value); break;
    }
    
    sessionStorage.setItem('coating-toolbox-pan', JSON.stringify(pan));
    return Object.assign({}, state, pan.toJSON());
}