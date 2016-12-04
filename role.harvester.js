var roomMemory = require('memory.room');
var spawnMemory = require('memory.spawn');

var bodies = {
    1: [MOVE,WORK,CARRY],
    2: [MOVE,MOVE,WORK,WORK,WORK,CARRY]
}

var roleHarvester = {
    
    getBody: function(spawn) {
        spawn.refreshMemory();
        var harvesters = _.filter(spawn.room.creeps, (creep) => creep.memory.role == 'harvester');
        if(harvesters.length == 0) {
            return bodies[1];
        }
        
        if(spawn.room.energyAvailable < 450) {
            return bodies[1];
        }
        
        return bodies[2];
    },

    /** @param {Creep} creep **/
    run: function(creep) {
        return;
    }
};

module.exports = roleHarvester;