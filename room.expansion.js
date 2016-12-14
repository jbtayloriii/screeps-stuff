/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('room.expansion');
 * mod.thing == 'a thing'; // true
 */

module.exports.getExpansionCount = function(mRoomName){

};

module.exports.getExpansionObjects = function(mRoomName) {
    
}

module.exports.getExpansionClaimerId = function(mRoomName, mExpName) {
    
}

module.exports.registerCreepForExpansion = function(mRoomName, mExpansionName, mCreepId) {
    var expansionObj = Memory.rooms[mRoomName].expansions[mExpansionName];
    if(!expansionObj.claimer) {
        expansionObj.claimer = mCreepId;
        return true;
    }
    if(expansionObj.claimer = mCreepId) {
        return true;
    }
    return false;
}