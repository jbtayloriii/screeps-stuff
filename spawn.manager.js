/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawn.manager');
 * mod.thing == 'a thing'; // true
 */

 var creepCreator = require('room.creepCreator');
 
var maxCreeps = 10;
 
var spawnManager = {
    manage : function(spawn) {
        spawnManager.manageCreeps(spawn);
        spawnManager.manageCreepQueue(spawn);
    },
    
    manageCreeps : function(spawn){
        if(spawn.canCreateCreep([MOVE]) == ERR_BUSY) {
            return;
        }
        
        var creepCount = spawn.room.find(FIND_MY_CREEPS).length;
        if(creepCount < maxCreeps && !Memory.spawns[spawn.name].creepQueue) {
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
            if(spawn.canCreateCreep) {
                spawn.createCreep([WORK,CARRY,MOVE], undefined, {role: role});
                delete Memory.spawns[spawn.name].creepQueue;
                console.log("Creating creep at spawn " + spawn.name + " with role " + role + " with body " + "body test");
            }
        }
    }
}

module.exports = spawnManager;