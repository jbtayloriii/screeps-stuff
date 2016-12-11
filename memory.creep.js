/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('memory.creep');
 * mod.thing == 'a thing'; // true
 */
 
var creepRoles = require('creep.roles');

Creep.prototype.setupCreepActionMemory = function(creep, role) {
    var roleChart = creepRoles.role[role];
    if(!roleChart) {
        console.log("Error with role chart for creep " + creep.name + " with role " + role);
        return;
    }
    delete creep.memory.action;
    creep.memory.action = roleChart;
    creep.memory.action.currentAction = creep.memory.action.start;
    creep.memory.roleMapped = true;
}

Creep.prototype.setupRole = function(role) {
    if(!this.memory.role) {
        this.memory.role = role;
    }
    
    console.log("Setting up role memory for " + this.name + " with role " + role);
    this.setupCreepActionMemory(this, role);
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
        source.removeCreep(creepName);
    }
    if(Memory.creeps[creepName].currentCarrierSourceId) {
        var source = Game.getObjectById(Memory.creeps[creepName].currentCarrierSourceId);
        source.removeCreep(creepName);
    }
    
    if(Memory.creeps[creepName].currentPowerSourceId) {
        var source = Game.getObjectById(Memory.creeps[creepName].currentPowerSourceId);
        source.removeCreep(creepName);
    }
    delete Memory.creeps[creepName];
    
};