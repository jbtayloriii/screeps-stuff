/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('memory.source');
 * mod.thing == 'a thing'; // true
 */
 
 
Source.prototype.getAvailableUsers = function() {
    this.refreshMemory(false);
    return Memory.sources[this.id].openSpaces;
}


Source.prototype.addCreepPowerHarvester = function(creep) {
    this.refreshMemory(false);
    if(!Memory.sources[this.id].canPowerHarvest) {
        return false;
    }
    
    if(Memory.sources[this.id].powerHarvester) {
        return false;
    }
    
    Memory.sources[this.id].powerHarvester = creep.name;
    return true;
}

Source.prototype.mapPowerHarvestTime = function(timeToMove) {
    //TODO
}

Source.prototype.addCreepCarrierStorage = function(creep) {
    this.refreshMemory(false);
    if(!Memory.sources[this.id].canPowerHarvest) {
        return false;
    }
    
    if(Memory.sources[this.id].storageCarrier) {
        return false;
    }
    
    Memory.sources[this.id].storageCarrier = creep.name;
    return true;
}

Source.prototype.removeCreep = function(creepName) {
    this.refreshMemory(false);
        
    if(!Memory.sources[this.id].sourceContainer) {
        console.log(this.id + " No source container when removing creep");
        return;
    }
    
    if(Memory.sources[this.id].powerHarvester == creepName) {
        Memory.sources[this.id].powerHarvester = null;
    }
    
    
    if(Memory.sources[this.id].storageCarrier == creepName) {
        Memory.sources[this.id].storageCarrier = null;
    }
}

function getSourceMemoryLocation(sourceId) {
    if(!Memory.sources) {
        Memory.sources = {};
    }
    return Memory.sources[sourceId];
}

function mapSource(source, memoryObj) {
    //return;
    console.log("Mapping source " + source);
    memoryObj.x = source.pos.x;
    memoryObj.y = source.pos.y;
    
    var openSpaces = 0;
    for(var x = memoryObj.x - 1; x <= memoryObj.x + 1; x++) {
        for(var y = memoryObj.y - 1; y <= memoryObj.y + 1; y++) {
            var look = source.room.getPositionAt(x, y).look();
            look.forEach(function(lookObject) {
                if((lookObject.type == LOOK_TERRAIN) && (lookObject[LOOK_TERRAIN] != 'wall')) {
                    openSpaces++;
                }
                
                if((lookObject.type == LOOK_STRUCTURES) && (lookObject[LOOK_STRUCTURES].structureType == STRUCTURE_CONTAINER)) {
                    memoryObj.canPowerHarvest = true;
                    memoryObj.powerHarvester = null;
                    memoryObj.storageCarrier = null;
                    memoryObj.sourceContainer = {
                        x : x,
                        y : y,
                        containerId : lookObject[LOOK_STRUCTURES].id
                    }
                }
            });
        }
    }
    
    memoryObj.openSpaces = openSpaces;
}
 
Source.prototype.refreshMemory = function(hardRefresh) {
    if(hardRefresh && Memory.sources) {
        console.log("Hard refresh on source " + this.id);
        delete Memory.sources[this.id];
    }
    
    if(!Memory.sources) {
        Memory.sources = {};
    }
    
    if(!Memory.sources[this.id]) {
        Memory.sources[this.id] = {};
    }
    
    if(Memory.sources[this.id].mapped && !hardRefresh) {
        return this;
    }
    mapSource(this, Memory.sources[this.id]);
     
    Memory.sources[this.id].mapped = true;
    return this;
}

module.exports = null;