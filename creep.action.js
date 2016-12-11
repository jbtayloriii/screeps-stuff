/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('creep.action');
 * mod.thing == 'a thing'; // true
 */
 
 var creepActions = require('creep.actions');
 var creepCreator = require('room.creepCreator');
 var functions = creepActions.functions;
 var actions = creepActions.actions;
 var roles = require('creep.roles');

Creep.prototype.act = function() {
    if(!this.memory.action) {
        console.log(this.name + " has no actions");
        this.setupRole(this.memory.role);
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
            this.setupRole(this.memory.role);
        }
        return;
    }
    
    var returnVal = 0;
    var tryCount = 0;
   //while(returnVal != 1) {
        if(tryCount == 100) {
            return;
        }
        var currentActionObject = this.memory.action.actions[currentAction];
    
        var actionFunction = currentActionObject.action;
        if(!(typeof functions[actionFunction] === "function")) {
            console.log(this.name + " Action " + actionFunction + " is not a function");
            return;
        }
        var args = currentActionObject.args;
        if(!args) {
            args = {};
        }
        
        returnVal = functions[actionFunction](this, args);
        if(returnVal == 1) {
            var nextAction = currentActionObject.next;
            if(nextAction) {
                this.memory.action.currentAction = nextAction;
                currentAction = this.memory.action.currentAction;
            }
        }
        tryCount++;
    //}

    
    if(returnVal == -3 || (this.ticksToLive < 50 && this.memory.role != 'powerHarvester')) {
        //Remove the creep
        if(!(this.memory.role == 'returnEnergyAndDie')){
            console.log(this.name + " is removing itself");
            this.memory.role = 'returnEnergyAndDie';
            this.memory.action = roles.role['returnEnergyAndDie'];
            this.memory.action.currentAction = "returnEnergy";
        }
    } else if (returnVal == 1) {
        //move to next step
        var nextAction = currentActionObject.next;
        if(nextAction) {
            this.memory.action.currentAction = nextAction;
            var nextActionObj = this.memory.action.actions[nextAction];
            var nextActionFunction = nextActionObj.action;
            var nextArgs = nextActionObj.args;
        }
    } else {
        //repeat
    }
}

module.exports = null;