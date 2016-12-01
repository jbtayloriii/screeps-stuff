/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.base');
 * mod.thing == 'a thing'; // true
 */
 
require('roomMemory');

var creepLog = true;
 
Creep.prototype.getClosestEnergySourceId = function() {
    if(this.memory.currentEnergySourceId) {
        return this.memory.currentEnergySourceId;
    }
    this.room.refreshMemory();
    sourceInfo = this.room.memory.sources;
    for(var i =0; i < sourceInfo.length; i++) {
        
        //For now we will just grab the first source that has open spaces
        if(sourceInfo[i].currentUsers >= sourceInfo[i].openSpaces) {
            continue;
        }
        this.room.memory.sources[i].openSpaces = sourceInfo[i].openSpaces + 1;
        this.memory.currentEnergySourceId = sourceInfo[i].id;
        
        if(creepLog) {
            console.log("Creep " + this.name + " on source " + sourceInfo[i].id);
        }
        
        this.say("get src");
        return sourceInfo[i].id;
        
    }
}

Creep.prototype.getConstructionId = function() {
    if (this.memory.currentConstructionTargetId) {
        var construction = this.room.find(FIND_CONSTRUCTION_SITES);
    }
    
    if(targets.length) {
        return targets[0].id;
    }
    return null;
}

Creep.prototype.removeConstructionId = function() {
    delete this.memory.currentConstructionTargetId;
}

Creep.prototype.getStructureIdNeedingEnergyWithPriority = function(priority, carryCapacity) {
    if(this.memory.currentTargetStructureId) {
        var structure = Game.getObjectById(this.memory.currentTargetStructureId);
        if(structure.energy < structure.energyCapacity) {
            return this.memory.currentTargetStructureId;
        }
    }
    
    var targets = [];
    
    if(!priority) {
        targets = this.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_CONTAINER) && structure.energy < structure.energyCapacity;
                    }
            });
    } else {
        for(var i = 0; (i < priority.length) && (targets.length == 0); i++) {
            targets = this.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == priority[i]) && structure.energy < structure.energyCapacity;
                    }
            });
        }
    }
    
    if(targets.length > 0) {
        this.memory.currentTargetStructureId = targets[0].id;
        return this.memory.currentTargetStructureId;
    } else {
        return null;
    }
}

Creep.prototype.forgetCurrentSourceId = function() {
    if(this.memory.currentEnergySourceId) {
        if(creepLog) {
            console.log("Creep " + this.name + " forgetting source " + this.memory.currentEnergySourceId);
        }
        this.say("rm src");
        delete this.memory.currentEnergySourceId;
    }
}

Creep.prototype.getCurrentEnergySource = function() {
    if(this.memory.currentEnergySourceId) {
        return Game.getObjectById(this.memory.currentEnergySource);
    }
    return null;
}
 
module.exports = null;