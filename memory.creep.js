/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('memory.creep');
 * mod.thing == 'a thing'; // true
 */
 
var creepRoles = require('creep.roles');
var memoryExpansion = require('memory.expansions');

module.exports.setupCreepMemory = function(creep, role, targets) {
    var roleChart = creepRoles.role[role];
    if(!roleChart) {
        console.log("Error with role chart for creep " + creep.name + " with role " + role);
        return;
    }
    delete creep.memory.action;
    creep.memory.action = roleChart;
    creep.memory.action.currentAction = creep.memory.action.start;
    if(targets) {
        creep.memory.targets = targets;
    } else {
        creep.memory.targets = {};
    }
}

Creep.prototype.setupRole = function(role) {
    if(!this.memory.role) {
        this.memory.role = role;
    }
    
    if(this.memory.role == 'claimer' && this.memory.targetRoom) {
        if(memoryExpansion.setClaimerName(this.memory.targetRoom, this.name)) {
            console.log('was able to set myself as the claimer');
        }
    }
    if(this.memory.role == 'expansionPowerHarvester' && this.memory.targetSource) {
        if(memoryExpansion.addPowerHarvester(this.memory.targetRoom, this.name, this.memory.targetSource)) {
            console.log('memory.creep: ' + this.name + ' is power harvesting for expansion ' + this.memory.targetRoom + ' at source ' + this.memory.targetSource);
        }
    }
    if(this.memory.role == 'expansionStorageCarrier' && this.memory.targetSource) {
        if(memoryExpansion.addStorageCarrier(this.memory.targetRoom, this.name, this.memory.targetSource)) {
            console.log('memory.creep: ' + this.name + ' is carrying for expansion ' + this.memory.targetRoom + ' at source ' + this.memory.targetSource);
        }
    }
    
    console.log("Setting up role memory for " + this.name + " with role " + role);
    module.exports.setupCreepMemory(this, role);
}

Creep.prototype.refreshMemory = function(hardRefresh) {
    if(hardRefresh) {
        delete this.memory.action;
        delete this.memory.currentEnergySourceId;
        delete this.memory.currentTargetStructureId;
        delete this.memory.currentConstructionTargetId;
        delete this.memory.currentRepairId;
        
        delete this.memory.currentEnergyStorageId;
        delete this.memory.currentPowerSourceId;
        delete this.memory.currentCarrierSourceId;
        delete this.memory.currentCarrierSourceContainerId;
    }

    if(this.memory.mapped && !hardRefresh) {
        return this;
    }
     
    this.memory.mapped = true;
    return this;
}

module.exports.deleteCreep = function(creepName) {
    console.log("Deleting nonexistent creep " + creepName);
    if(Memory.creeps[creepName].currentEnergySourceId) {
        var source = Game.getObjectById(Memory.creeps[creepName].currentEnergySourceId);
        //source.removeCreep(creepName);
    }
    
    if(Memory.creeps[creepName].role == 'claimer') {
        //console.log(creepName + ": Removing myself as claimer from ");

        
    }

    if(Memory.creeps[creepName].role == 'expansionPowerHarvester' && Memory.creeps[creepName].targetSource) {
        if(memoryExpansion.removePowerHarvester(Memory.creeps[creepName].targetRoom, Memory.creeps[creepName].targetSource)) {
            console.log('removed ' + creepName + ' from expansion source');
        } else {
            console.log('Error removing ' + creepName + ' from expansion source');
        }
    }

    if(Memory.creeps[creepName].role == 'expansionStorageCarrier' && Memory.creeps[creepName].targetSource) {
        if(memoryExpansion.removeStorageCarrier(Memory.creeps[creepName].targetRoom, Memory.creeps[creepName].targetSource)) {
            console.log('removed ' + creepName + ' from expansion source carrier');
        } else {
            console.log('Error removing ' + creepName + ' from expansion source carrier');
        }
    }
    
    if(Memory.creeps[creepName].claimRoomId) {
        //return;
        var sourceRoom = Game.getObjectById(Memory.creeps[creepName].spawnId).room;
        console.log(sourceRoom);
        Memory.rooms[sourceRoom.name].expansions[Memory.creeps[creepName].claimRoomId].claimer = null;
    }
    
    if(Memory.creeps[creepName].currentCarrierSourceId) {
        var source = Game.getObjectById(Memory.creeps[creepName].currentCarrierSourceId);
                if(source) {
            //source.removeCreep(creepName);
        } else {
            console.log('memory.creep: ' + 'error 2 with source ' + Memory.creeps[creepName].currentCarrierSourceId);
        }
    }
    
    if(Memory.creeps[creepName].currentPowerSourceId) {
        var source = Game.getObjectById(Memory.creeps[creepName].currentPowerSourceId);
        if(source) {
            //source.removeCreep(creepName);
        } else {
            console.log('memory.creep: ' + 'error 3 with source ' + Memory.creeps[creepName].currentPowerSourceId);
        }
    }
    delete Memory.creeps[creepName];
    
};