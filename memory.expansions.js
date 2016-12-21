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

///////////////////
//Helper functions
///////////////////
function initRoom(mRoomId, mParentRoomId, hardReset) {
    if(!Memory.expansionRooms[mRoomId] || hardReset) {
        var roomMemObj = {};
        if(mParentRoomId) {
            roomMemObj.owningRoomId = mParentRoomId;
            roomMemObj.claimerName = null;
            roomMemObj.sourceHarvesters = {};
            roomMemObj.storageCarriers = {};
            roomMemObj.repairer = null;
        } else {
            roomMemObj.owningRoomId = null;
        }
        Memory.expansionRooms[mRoomId] = roomMemObj;
        console.log("Created new expansionRoom memory for " + mRoomId);
    }
    
}

function getExpansionObj(mExpRoomId) {
    if(!Memory.expansionRooms[mExpRoomId]) {
        return null;
    }
    return Memory.expansionRooms[mExpRoomId];
}

//////////////////
//public functions
//////////////////

module.exports.getExpansionObject = function(mExpRoomId) {
    return getExpansionObj(mExpRoomId);
}

module.exports.createNewExpansion = function(mParentRoomId, mExpRoomId, hardReset) {
    var expObj = getExpansionObj(mExpRoomId);
    console.log('test');
    if(!expObj || hardReset) {
        initRoom(mExpRoomId, mParentRoomId, hardReset);
        return true;
    }
    return false;
}

module.exports.resetExpansionMemory = function(mExpRoomId) {

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

module.exports.removeClaimer = function(mExpRoomId) {
    var expObj = getExpansionObj(mExpRoomId);
    if(!expObj) {
        return false;
    }
    if(expObj.claimerName) {
        expObj.claimerName = null;
        return true;
    }
    return false;
}

module.exports.getPowerHarvesters = function(mExpRoomId) {
    var expObj = getExpansionObj(mExpRoomId);
    if(!expObj) {
        return null;
    }
    return expObj.sourceHarvesters;
}

module.exports.addPowerHarvester = function(mExpRoomId, powerHarvesterName, sourceId) {
    var expObj = getExpansionObj(mExpRoomId);
    if(!expObj) {
        return false;
    }
    if(!expObj.sourceHarvesters) {
        return false;
    }
    if(expObj.sourceHarvesters[sourceId] && (expObj.sourceHarvesters[sourceId] != powerHarvesterName)) {
        return false;
    }

    expObj.sourceHarvesters[sourceId] = powerHarvesterName;
    return true;
}

module.exports.getPowerHarvester = function(mExpRoomId, sourceId) {
    var expObj = getExpansionObj(mExpRoomId);
    if(!expObj) {
        return null;
    }
    if(!expObj.sourceHarvesters) {
        return null;
    }
    return expObj.sourceHarvesters[sourceId];
}

module.exports.removePowerHarvester = function(mExpRoomId, sourceId) {
    var expObj = getExpansionObj(mExpRoomId);
    if(!expObj) {
        return false;
    }
    if(!expObj.sourceHarvesters) {
        return false;
    }
    if(!expObj.sourceHarvesters[sourceId]) {
        return false;
    }
    expObj.sourceHarvesters[sourceId] = null;
    return true;
}

module.exports.getOpenHarvestSources = function(mExpRoomName) {
    var expObj = getExpansionObj(mExpRoomName);
    if(!expObj) {
        return [];
    }
    var sourceArr = [];
    if(!expObj.sourceHarvesters) {
        return sourceArr;
    }
    for(var source in expObj.sourceHarvesters) {
        if (expObj.sourceHarvesters.hasOwnProperty(source)) {
            if(!expObj.sourceHarvesters[source]) {
                sourceArr.push(source);
            }
        }
    }
    return sourceArr;
}

module.exports.addStorageCarrier = function(mExpRoomId, storageCarrierName, sourceId) {
    var expObj = getExpansionObj(mExpRoomId);
    if(!expObj) {
        return false;
    }
    if(!expObj.storageCarriers) {
        return false;
    }
    if((expObj.storageCarriers[sourceId]) && (expObj.storageCarriers[sourceId] != storageCarrierName)) {
        return false;
    }

    expObj.storageCarriers[sourceId] = storageCarrierName;
    return true;
}

module.exports.getStorageCarrier = function(mExpRoomId, sourceId) {
    var expObj = getExpansionObj(mExpRoomId);
    if(!expObj) {
        return null;
    }
    if(!expObj.storageCarriers) {
        return null;
    }
    return expObj.storageCarriers[sourceId];
}

module.exports.removeStorageCarrier = function(mExpRoomId, sourceId) {
    var expObj = getExpansionObj(mExpRoomId);
    if(!expObj) {
        return false;
    }
    if(!expObj.storageCarriers) {
        return false;
    }
    if(!expObj.storageCarriers[sourceId]) {
        return false;
    }
    expObj.storageCarriers[sourceId] = null;
    return true;
}

module.exports.getOpenStorageCarrierSources = function(mExpRoomName) {
    var expObj = getExpansionObj(mExpRoomName);
    if(!expObj) {
        return [];
    }
    var sourceArr = [];
    if(!expObj.storageCarriers) {
        return sourceArr;
    }
    for(var source in expObj.storageCarriers) {
        if (expObj.storageCarriers.hasOwnProperty(source)) {
            if(!expObj.storageCarriers[source]) {
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