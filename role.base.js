/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.base');
 * mod.thing == 'a thing'; // true
 */
 
require('memory.room');
var constants = require('base.constants');

var creepLog = false;
 
Creep.prototype.getClosestEnergySourceId = function() {
    if(this.memory.currentEnergySourceId) {
        var source = Game.getObjectById(this.memory.currentEnergySourceId);
        if(source && source.energy > 0) {
            return this.memory.currentEnergySourceId;
        }
        
        //otherwise forget the current energy source
        this.forgetCurrentSourceId();
    }
    this.room.refreshMemory(false);
    var sourceWithEnergy = false;
    var sourceInfo = this.room.memory.sources;
    for(var i =0; i < sourceInfo.length; i++) {
        var sourceId = sourceInfo[i];
        
        var source = Game.getObjectById(sourceId);
        if(source.energy == 0) {
            continue;
        }
        sourceWithEnergy = true;
        if(source) {
            //console.log("Creep " + this.name + " on source " + source.id);
            this.memory.currentEnergySourceId = sourceId;
            return source.id;
        }
    }
    if(sourceWithEnergy) {
        return constants.ERR_SOURCES_FULL;
        
    } else {
        //TODO: different error here
        return constants.ERR_SOURCES_FULL;
        
    }
}

Creep.prototype.forgetCurrentSourceId = function() {
    var sourceId = this.memory.currentEnergySourceId;
    var source = Game.getObjectById(sourceId);
    if(sourceId) {
        //console.log("Creep " + this.name + " forgetting source " + this.memory.currentEnergySourceId);
        delete this.memory.currentEnergySourceId;
        //source.removeCreep(this.name);
    }
}

Creep.prototype.getOpenPowerSourcePosition = function() {
    if(this.memory.currentPowerSourceId) {
        var position = new RoomPosition(Memory.sources[this.memory.currentPowerSourceId].sourceContainer.x, Memory.sources[this.memory.currentPowerSourceId].sourceContainer.y, this.room.name);
        var returnObj = {
            pos : position,
            sourceId : this.memory.currentPowerSourceId
        };
        return returnObj;
    }
    this.room.refreshMemory(false);
    var sourceInfo = this.room.memory.sources;
    for(var i =0; i < sourceInfo.length; i++) {
        var sourceId = sourceInfo[i];
        var sourceObj = Game.getObjectById(sourceId);
        if(sourceObj.addCreepPowerHarvester(this)) {
            var returnObj = {
                pos : new RoomPosition(Memory.sources[sourceId].sourceContainer.x, Memory.sources[sourceId].sourceContainer.y, this.room.name),
                sourceId : sourceId
            };
            this.memory.currentPowerSourceId = sourceId;
            return returnObj;
        }
    }
    
    return null;
        
}

Creep.prototype.getClosestEnergyStorageId = function(priority) {
    if(this.memory.currentEnergyStorageId) {
        var storage = Game.getObjectById(this.memory.currentEnergyStorageId);
        if(storage && storage.energy > 0) {
            return this.memory.currentEnergyStorageId;
        }
    }
    var target;
    if(priority && priority == STRUCTURE_CONTAINER) {
        target = this.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0);
            }
        });
        if(target) {
            return target.id;
        }
    } else {
        target = this.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] > 0);
            }
        });
        if(target) {
            return target.id;
        }
    }
    

    
    target = this.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0);
        }
    });
    if(target) {
        return target.id;
    }
    return null;
}

Creep.prototype.getConstructionId = function() {
    if (this.memory.currentConstructionTargetId) {
        return this.memory.currentConstructionTargetId;
    }
    var construction = this.room.find(FIND_CONSTRUCTION_SITES);
   
    if(construction.length) {
        return construction[0].id;
    }
    if(Object.keys(Game.constructionSites).length > 0) {
        //console.log("role.base test: " + Object.keys(Game.constructionSites)[0]);
        return Object.keys(Game.constructionSites)[0];
    }
    return constants.ERR_NO_CONSTRUCTION;
}

Creep.prototype.removeConstructionId = function() {
    delete this.memory.currentConstructionTargetId;
}

Creep.prototype.getStructureIdNeedingEnergyWithPriority = function(priority, carryCapacity) {
    if(this.memory.currentTargetStructureId) {
        var structure = Game.getObjectById(this.memory.currentTargetStructureId);
        if(structure.energy < structure.energyCapacity) {
            return this.memory.currentTargetStructureId;
        } else {
            this.removeConstructionId();
        }
    }
    
    var targets;
    
    if(!priority) {
        targets = this.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_TOWER ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_CONTAINER ||
                            structure.structureType == STRUCTURE_STORAGE) && structure.energy < structure.energyCapacity;
                    }
            });
    } else {
        for(var i = 0; (i < priority.length) && (!targets); i++) {
            if(priority[i] == STRUCTURE_STORAGE) {
                targets = this.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == priority[i]);
                    }
            });
            } else {
                targets = this.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == priority[i]) && structure.energy < structure.energyCapacity;
                    }
                });
            }

        }
    }
    if(targets) {
        this.memory.currentTargetStructureId = targets.id;
        return this.memory.currentTargetStructureId;
    } else {
        return null;
    }
}

Creep.prototype.getCurrentEnergySource = function() {
    if(this.memory.currentEnergySourceId) {
        return Game.getObjectById(this.memory.currentEnergySourceId);
    }
    return null;
}
 
module.exports = null;