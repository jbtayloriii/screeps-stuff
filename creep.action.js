/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('creep.action');
 * mod.thing == 'a thing'; // true
 */
 
 var creepActions = require('creep.actions');
 var functions = creepActions.functions;
 var actions = creepActions.actions;
 var creepRoles = require('creep.roles');

function setupCreepActionMemory(creep, roleChart) {
    console.log("Setting up role memory for " + creep.name);
    if(!roleChart) {
        console.log("Error with role chart for creep " + creep.name);
        return;
    }
    delete creep.memory.action;
    creep.memory.action = roleChart;
    creep.memory.action.currentAction = creep.memory.action.start;
    creep.memory.roleMapped = true;
}

Creep.prototype.act = function() {
    if(!this.memory.action) {
        console.log(this.name + " has no actions");
        creepAction.setupCreep(this);
        return;
    }
    
    var currentAction = this.memory.action.currentAction;
    if(!currentAction) {
        console.log(this.name + " has an error performing action " + currentAction);
        return;
    }
    
    if(!this.memory.action.actions) {
        console.log(this.name + " has no actions");
        if(this.memory.role) {
            console.log("Attempting to setup creep again with role " + this.memory.role);
            creepAction.setupCreep(this);
        }
        return;
    }
    
    
    var currentActionObject = this.memory.action.actions[currentAction];
    
    var actionFunction = currentActionObject.action;
    if(!(typeof functions[actionFunction] === "function")) {
        console.log(this.name + " Action " + actionFunction + " is not a function");
        return;
    }
    var args = currentActionObject.args;
    
    //test
    var returnVal = functions[actionFunction](this, args);
    
    if(returnVal == -1) {
        //Not doing anything with -1 return right now
    } else if (returnVal == 1) {
        //move to next step
        var nextAction = currentActionObject.next;
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
        setupCreepActionMemory(creep, creepRoles.role[role]);
    }
}
 

module.exports = creepAction;