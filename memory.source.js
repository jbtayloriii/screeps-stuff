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
    if(Memory.sources[this.id].openSpaces <= 0) {
        return false;
    }
    
    if(Memory.sources[this.id].harvestingEnergy <= 0) {
        return false;
    }
    
    Memory.sources[this.id].users.push(creep.id);
    Memory.sources[this.id].openSpaces--;
    Memory.sources[this.id].harvestingEnergy -= creep.carryCapacity;
    if(harvestingEnergy < 0) {
        harvestingEnergy = 0;
    }
    
    return true;
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
    //get the open spaces
    for(var x = memoryObj.x - 1; x <= memoryObj.x + 1; x++) {
        for(var y = memoryObj.y - 1; y <= memoryObj.y + 1; y++) {
            var look = source.room.getPositionAt(x, y).look();
            look.forEach(function(lookObject) {
                if(lookObject.type == LOOK_TERRAIN && lookObject[LOOK_TERRAIN] != 'wall') {
                    openSpaces++;
                }
            });
        }
    }
    
    memoryObj.currentEnergy = source.energy;
    memoryObj.users = {};
    memoryObj.harvestingEnergy = source.energy;
    
    memoryObj.currentUsers = 0;
    memoryObj.openSpaces = openSpaces;
}
 
Source.prototype.refreshMemory = function(hardRefresh) {
    
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