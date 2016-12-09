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

Source.prototype.addCreep = function(creep) {
    this.refreshMemory(false);
    if(Memory.sources[this.id].currentUsers >= Memory.sources[this.id].openSpaces) {
        return false;
    }
    
    Memory.sources[this.id].users.push(creep.name);
    Memory.sources[this.id].currentUsers++;
    Memory.sources[this.id].harvestingEnergy -= creep.carryCapacity;
    if(Memory.sources[this.id].harvestingEnergy < 0) {
        Memory.sources[this.id].harvestingEnergy = 0;
    }
    
    return true;
}

Source.prototype.removeCreep = function(creepName) {
    this.refreshMemory(false);
    for(var i = 0; i < Memory.sources[this.id].users.length; i++) {
        if(Memory.sources[this.id].users[i] == creepName) {
            Memory.sources[this.id].users.splice(i, 1);
            Memory.sources[this.id].currentUsers--;
        }
        
        if(!Memory.sources[this.id].sourceContainer) {
            continue;
        }
        
        if(Memory.sources[this.id].sourceContainer.user == creepName) {
            Memory.sources[this.id].sourceContainer.user == null;
            Memory.sources[this.id].sourceContainer.inUse = false;
        }
        
        if(Memory.sources[this.id].sourceContainer.carrier == creepName) {
            Memory.sources[this.id].sourceContainer.carrier = null;
        }
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
                    //console.log(lookObject[LOOK_STRUCTURES].id);
                    memoryObj.sourceContainer = {
                        x : x,
                        y : y,
                        inUse: false,
                        user : null,
                        containerId : lookObject[LOOK_STRUCTURES].id
                    }
                }
            });
        }
    }
    
    memoryObj.currentEnergy = source.energy;
    memoryObj.users = [];
    memoryObj.harvestingEnergy = source.energy;
    
    memoryObj.currentUsers = 0;
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