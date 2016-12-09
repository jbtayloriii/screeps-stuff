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
        spawnManager.manageCreeps(spawn);
        spawnManager.manageCreepQueue(spawn);
    },
    
    manageCreeps : function(spawn){
        spawn.refreshMemory(false);
        if(spawn.canCreateCreep([MOVE]) == ERR_BUSY) {
            return;
        }
        
        var creepCount = spawn.room.find(FIND_MY_CREEPS).length;
        if(creepCount < constants.maxCreeps && !Memory.spawns[spawn.name].creepQueue && spawn.canCreateCreep([WORK]) != ERR_BUSY) {
            var role = creepCreator.getCreepRoleNeeded(spawn.room);

            Memory.spawns[spawn.name].creepQueue = role;
        }
    },
    
    manageCreepQueue : function(spawn) {
        if(spawn.canCreateCreep([MOVE]) == ERR_BUSY) {
            return;
        }
        var role = Memory.spawns[spawn.name].creepQueue;
        if(role) {
            var body = creepCreator.getBestBody(role, spawn.room.energyCapacityAvailable);
            var result = spawn.createCreep(body, undefined, {role: role, spawnId: spawn.id});
            //console.log(spawn.name + " is thinking about creating " + role + " with body " + body);
            if(_.isString(result)) {
                delete Memory.spawns[spawn.name].creepQueue;
                console.log("Creating creep " + result + " at spawn " + spawn.name + " with role " + role + " with body " + body + " using energy " + spawn.room.energyCapacityAvailable);
            }
        }
    }
}

module.exports = spawnManager;