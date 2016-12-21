/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('memory.source');
 * mod.thing == 'a thing'; // true
 */

//External functions:
// getSourceContainerId = function(mSourceId)
// getPowerHarvesterHarvestPosition = function(mSourceId)
// addCreepPowerHarvester = function(mSourceId, creepName)
// removeCreepPowerHarvester = function(mSourceId, creepName)
// addCreepStorageCarrier = function(creep)
// removeCreepStorageCarrier = function(creepName)

require('memory.core');

if(!Memory.memSources) {
    Memory.memSources = {};
}


//Used to remap a source if necessary (Will overwrite old source memory, be careful)
function mapSource(mSourceId) {
    console.log('memory.source: ' + 'mapping source ' + mSourceId);

    var sourceObj = Game.getObjectById(mSourceId);
    if(!sourceObj) {
        return false;
    }

    var memoryObj = {};
    memoryObj.x = sourceObj.pos.x;
    memoryObj.y = sourceObj.pos.y;
    memoryObj.roomName = sourceObj.room.name;
    memoryObj.canPowerHarvest = false;
    memoryObj.powerHarvesters = [];
    memoryObj.storageCarriers = [];
    
    var openSpaces = 0;
    for(var x = memoryObj.x - 1; x <= memoryObj.x + 1; x++) {
        for(var y = memoryObj.y - 1; y <= memoryObj.y + 1; y++) {
            var look = sourceObj.room.getPositionAt(x, y).look();
            look.forEach(function(lookObject) {                
                if((lookObject.type == LOOK_STRUCTURES) && (lookObject[LOOK_STRUCTURES].structureType == STRUCTURE_CONTAINER)) {
                    memoryObj.canPowerHarvest = true;
                    memoryObj.sourceContainer = {
                        x : x,
                        y : y,
                        containerId : lookObject[LOOK_STRUCTURES].id
                    }
                } else if(lookObject.type == LOOK_CONSTRUCTION_SITES && lookObject[LOOK_CONSTRUCTION_SITES].structureType == STRUCTURE_CONTAINER) {
                    memoryObj.canPowerHarvest = true;
                    memoryObj.sourceContainer = {
                        x : x,
                        y : y,
                    }
                }
            });
        }
    }

    Memory.memSources[mSourceId] = memoryObj;
    return true;
}

function getSourceObj(mSourceId) {
    if(!Memory.memSources[mSourceId]) {
        if(!mapSource(mSourceId)) {
            console.log('memory.source: ' + 'cannot map/remap source');
            return null;
        }
    }
    return Memory.memSources[mSourceId];
}

function addSource(mSourceId) {
    if(Memory.memSources[mSourceId]) {
        return false;
    }
    return mapSource(mSourceId);
}


////////////////////
//External functions
////////////////////

module.exports.getSourceContainerId = function(mSourceId) {
    var sourceObj = getSourceObj(mSourceId);
    if(!sourceObj) {
        return null;
    }
    if(!sourceObj.sourceContainer || !sourceObj.sourceContainer.containerId) {
        return null;
    }
    return sourceObj.sourceContainer.containerId;
}

module.exports.getPowerHarvesterHarvestPosition = function(mSourceId) {
    var sourceObj = getSourceObj(mSourceId);
    if(!sourceObj) {
        return null;
    }
    return new RoomPosition(sourceObj.sourceContainer.x, sourceObj.sourceContainer.y, sourceObj.roomName);
}

module.exports.addCreepPowerHarvester = function(mSourceId, creepName) {
    sourceObj = getSourceObj(mSourceId);    
    if(!sourceObj.canPowerHarvest) {
        return false;
    }
    if(sourceObj.powerHarvesters.includes(creepName)) {
        return true;
    }
    sourceObj.powerHarvesters.push(creepName);    
    return true;
}

module.exports.removeCreepPowerHarvester = function(mSourceId, creepName) {
    sourceObj = getSourceObj(mSourceId);
    
    if(!sourceObj.canPowerHarvest) {
        return false;
    }
    if(sourceObj.powerHarvesters.includes(creepName)) {
        sourceObj.powerHarvesters.splice(sourceObj.powerHarvesters.indexOf(creepName), 1);
        return true;
    }
    return false;
}

module.exports.addCreepStorageCarrier = function(mSourceId, creepName) {
    sourceObj = getSourceObj(mSourceId);    
    if(!sourceObj.canPowerHarvest) {
        return false;
    }
    if(sourceObj.storageCarriers.includes(creepName)) {
        return true;
    }
    sourceObj.storageCarriers.push(creepName);    
    return true;
}

module.exports.removeCreepStorageCarrier = function(mSourceId, creepName) {
    sourceObj = getSourceObj(mSourceId);
    
    if(!sourceObj.canPowerHarvest) {
        return false;
    }
    if(sourceObj.storageCarriers.includes(creepName)) {
        sourceObj.storageCarriers.splice(sourceObj.storageCarriers.indexOf(creepName), 1);
        return true;
    }
    return false;
}