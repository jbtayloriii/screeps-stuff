/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawn.manager');
 * mod.thing == 'a thing'; // true
 */

 var creepCreator = require('room.creepCreator');
var constants = require('base.constants');
 
var spawnManager = {
    manage : function(spawn) {
        //spawnManager.manageCreeps(spawn);
        spawnManager.manageCreepQueue(spawn);
    },
    
    manageCreepQueue : function(spawn) {
        if(spawn.canCreateCreep([MOVE]) == ERR_BUSY) {
            return;
        }
        
        var creepCount = spawn.room.find(FIND_MY_CREEPS).length;
        if(creepCount == constants.maxCreeps) {
            return;
        }
        var memObj = creepCreator.getMemoryObjNeeded(spawn.room);
        //console.log("Need role: " + memObj.role);
        if(memObj && memObj.role) {
            var body = creepCreator.getBestBody(memObj.role, spawn.room.energyCapacityAvailable);
            memObj.spawnId = spawn.id;
            var result = spawn.createCreep(body, undefined, memObj);
            
            //console.log(spawn.name + " is thinking about creating " + role + " with body " + body);
            if(_.isString(result)) {
                console.log("Creating creep " + result + " at spawn " + spawn.name + " with role " + memObj.role + " with body " + body + " using energy " + spawn.room.energyCapacityAvailable);
            }
        }
    }
}

module.exports = spawnManager;