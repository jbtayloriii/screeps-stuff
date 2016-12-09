/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('room.manager');
 * mod.thing == 'a thing'; // true
 */
 
 var creepCreator = require('room.creepCreator');
var constants = require('base.constants');
 
var roomManager = {
    manage : function(mRoom) {
        //roomManager.manageCreeps(mRoom);
    },
    
    manageCreeps : function(mRoom){
        return;
        var creepCount = mRoom.find(FIND_MY_CREEPS).length;
        if(creepCount < constants.maxCreeps && !mRoom.memory.creepQueue) {
            var role = creepCreator.getCreepRoleNeeded(mRoom);

            mRoom.memory.creepQueue = role;
        }
    }
}

module.exports = roomManager;