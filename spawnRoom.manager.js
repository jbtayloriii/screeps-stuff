/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawnRoom.manager');
 * mod.thing == 'a thing'; // true
 */
 
 var roomMemory = require('roomMemory');

spawnRoom = {
    
    manageCreepSpawn : function(spawn) {
        roomMemory.map(spawn.room);
    },
    
    manageCreeps : function(spawn) {
        
        for(var name in spawn.room.find(FIND_MY_CREEPS)) {
            
            //console.log(name.memory.role);
            //  roomMemory.map(creep.room);
            // if(creep.memory.role == 'harvester') {
            //     roleHarvester.run(creep);
            // }
            // if(creep.memory.role == 'upgrader') {
            //     roleUpgrader.run(creep);
            // }
            // if(creep.memory.role == 'builder') {
            //     roleBuilder.run(creep);
            // }
        }
    }
    
}

module.exports = spawnRoom;