
    
    // create a reducer for actions
function batchReducer(state = {}, action) {
  
    let batch = new Batch(action.pan);
    if(action.tablet) {
      batch.tabletWeight = action.tablet.value || 0.4;
      batch.bulkDensity = action.tablet.bulkDensity || 760000;
    }
    
    switch(action.type) {
      case "SET_BATCH_WEIGHT": batch.batchWeight = action.value; break;
      case "SET_BATCH_VOLUME": batch.batchVolume = action.value; break;
      case "SET_BATCH_COUNT": batch.tabletCount = action.value; break;
      case "SET_BATCH_TO_MAX_WEIGHT": batch.batchWeight = batch.maxFillWeight; break;
      case "SET_BATCH_TO_MIN_WEIGHT": batch.batchWeight = batch.minFillWeight; break;
      case "SET_BATCH_PERCENT_VOLUME": batch.batchVolume = action.value * batch.brimVolume; break;
    }
    
    return Object.assign({}, state, batch.toJSON());
}