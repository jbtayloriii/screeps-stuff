/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('room.expansion');
 * mod.thing == 'a thing'; // true
 */

var memoryExp = require('memory.expansions');
var journal = require('log.journal');

module.exports.getExpansionCount = function(mRoomName){
    
};

module.exports.getExpansionRooms = function(mRoomName) {
    
}

module.exports.getExpansionClaimerId = function(mExpName) {
    
}

//Returns key value pairs of source : creepName for storage carriers for an expansion room (creepName is null if none registered)
//Returns null if the room is not listed as an expansion
module.exports.getExpansionStorageCarriers = function(mExpRoomName) {
    var expansionObj = memoryExp.getExpansionObject(mExpRoomName);

}

module.exports.registerClaimer = function(mExpansionName, mCreepName) {
    return memoryExp.setClaimerName(mExpansionName, mCreepName);
}

module.exports.unregisterClaimer = function(mExpansionName) {
    return memoryExp.removeClaimer(mExpansionName);
}

module.exports.getClaimer = function(mExpansionName) {
return memoryExp.getClaimerName(mExpansionName);
}

module.exports.registerPowerHarvester = function(mExpansionName, mCreepName, mSourceId) {
    return memoryExp.addPowerHarvester(mExpansionName, mCreepName, mSourceId);
}

module.exports.removePowerHarvester = function(mExpansionName, mSourceId) {
    return memoryExp.removePowerHarvester(mExpName, mSourceId);
}

module.exports.getOpenHarvestSources = function(mExpansionName) {
    return memoryExp.getOpenHarvestSources(mExpansionName);
}

module.exports.registerStorageCarrier = function(mExpansionName, mCreepName, mSourceId) {
    var expansionObj = memoryExp.getExpansionObject(mExpRoomName);
    if(!expansionObj) {
        return false;
    }
    if(memoryExp.addPowerHarvester(mExpansionName, mCreepName, mSourceId)) {
        return true;
    }
    return false;
}

module.exports.removeStorageCarrier = function(mExpansionName, mCreepName, mSourceId) {

}

module.exports.getOpenStorageCarrierSources = function(mExpansionName) {
    return memoryExp.getOpenStorageCarrierSources(mExpansionName);
}


module.exports.getClaimer = function(mRoomName, mExpansionName) {

}

module.exports.unregisterClaimer = function(mRoomName, mExpansionName) {

}