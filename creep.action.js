/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('creep.action');
 * mod.thing == 'a thing'; // true
 */
 
 var creepActions = require('creep.actions');
 var creepRoles = require('creep.roles');

function setupCreepActionMemory(creep, roleChart) {
    
    creep.memory.action = {};
    creep.memory.action.actions = roleChart;
    creep.memory.action.currentAction = 1;
    
    creep.memory.roleMapped = true;
}

Creep.prototype.act = function() {
    var currentStep = this.memory.action.currentAction;
    if(!currentStep) {
        console.log(this.name + " has error with step " + currentStep);
        return;
    }
    
    if(!this.memory.action.actions) {
        console.log(this.name + " has no actions");
        creepAction.setupCreep(this);
        return;
    }
    
    
    var currentAction = this.memory.action.actions[currentStep];
    var args = {};
    args.priority = currentAction.priority;
    
    var returnVal;
    //var returnVal = currentAction.action(this, args);
    
    if(currentAction.action == creepRoles.actions.harvestClosestSourceInRoom) {
        returnVal = creepActions.harvestClosestSource(this);
    } else if(currentAction.action == creepRoles.actions.returnEnergyToStructures) {
        returnVal = creepActions.returnEnergyToStructures(this, args);
    } else if(currentAction.action == creepRoles.actions.buildConstruction) {
        returnVal = creepActions.buildConstruction(this);
    }
    
    if(returnVal == -1) {
        //queue alt action if possible
        var altAction = currentAction.alt;
        if(altAction) {
            this.memory.action.currentAction = altAction;
        }
    } else if (returnVal == 1) {
        //move to next step
        var nextAction = currentAction.next;
        if(nextAction) {
            this.memory.action.currentAction = nextAction;
        }
    } else {
        //repeat
    }
}
 
 var creepAction = {
     setupCreep : function(creep) {
         var role = creep.memory.role;
         if(role == 'harvester') {
            console.log(role);
            setupCreepActionMemory(creep, creepRoles.role[role]);
             
         }
         
        //  if(role == 'harvester') {
        //      setupCreepActionMemory(creep, creepRoles.role.harvesterRole);
        //  }
     }
 }
 

module.exports = creepAction;