/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('memory.expansions');
 * mod.thing == 'a thing'; // true
 */

require('memory.core');
var memoryStaticSource = require('memory.static.source');

function initRoom(mRoomId, mParentRoomId) {
    if(!Memory.expansionRooms[mRoomId]) {
        var roomMemObj = {};
        if(mParentRoomId) {
            roomMemObj.owningRoomId = mParentRoomId;
        } else {
            roomMemObj.owningRoomId = null;
        }
        Memory.expansionRooms[mRoomId] = roomMemObj;
    }
    
}

//public calls

function getExpansionObj(mExpRoomId) {
    if(!Memory.expansionRooms[mExpRoomId]) {
        return null;
    }
    return Memory.expansionRooms[mExpRoomId];
}

module.exports.createNewExpansion = function(mParentRoomId, mExpRoomId) {
    var expObj = getExpansionObj(mExpRoomId);
    if(!expObj) {
        initRoom(mExpRoomId, mParentRoomId);
        return true;
    }
    return false;
}

module.exports.getClaimerName = function(mExpRoomId) {
    var expObj = getExpansionObj(mExpRoomId);
    if(!expObj) {
        return null;
    }
    return expObj.claimerName;
}

module.exports.setClaimerName = function(mExpRoomId, claimerName) {
    var expObj = getExpansionObj(mExpRoomId);
    if(!expObj) {
        return false;
    }
    if(expObj.claimerName) {
        return false;
    }
    expObj.claimerName = claimerName;
    return true;
}

module.exports.getPowerHarvesters = function(mExpRoomId) {
    var expObj = getExpansionObj(mExpRoomId);
    if(!expObj) {
        return null;
    }
    return expObj.sourceHarvesters;
}

module.exports.addPowerHarvester = function(mExpRoomId, powerHarvesterId, sourceId) {
    var expObj = getExpansionObj(mExpRoomId);
    if(!expObj) {
        return false;
    }
    
    return false;
}

module.exports.getOpenSources = function(mExpRoomId) {
    var expObj = getExpansionObj(mExpRoomId);
    if(!expObj) {
        return null;
    }
    var sourceArr = [];
    if(!expObj.sourceHarvesters) {
        return sourceArr;
    }
    for(var source in expObj.sourceHarvesters) {
        if (object.hasOwnProperty(property)) {
            if(!expObj.sourceHarvesters[source]) {
                sourceArr.push(source);
            }
        }
    }
    return sourceArr;
}



//


module.exports.getExpansionCount = function(mRoomName) {
    
    if(Memory.rooms[mRoomName].expansions) {
        return Object.keys(Memory.rooms[mRoomName].expansions).length;
    }
    return 0;
}

module.exports.getExpansionHarvesterTotalCount = function(mRoomName, mExpansionRoomName) {
    return 0;
}

module.exports.getExpansionHarvesterCount = function(mRoomName, mExpansionRoomName) {
    return 0;
}

module.exports.getExpansionsForRoom = function(mRoomName) {
    return 1;
}