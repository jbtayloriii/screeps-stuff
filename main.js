var roleBase = require('role.base');
var creepCreator = require('room.creepCreator');
var creepActions = require('creep.actions');
var memoryMain = require('memory.main');

require('prototype.tower');

require('memory.source');

var spawnManager = require('spawn.manager');

var testLog = require('testLog');

module.exports.loop = function () {
    //console.log(Game.time);
     
    var spawns = Game.spawns;
    for(var spawnName in spawns) {
        var spawn = Game.spawns[spawnName];
        spawnManager.manage(spawn);
    }
    
    testLog.testLogLoopFunc();
    
    
    //Refresh indices and everything, switch to true to do a hard reset
    memoryMain.refreshMemory(false);

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        creep.act();
    }
    
    for(var roomName in Game.rooms) {
        var towers = Game.rooms[roomName].find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_TOWER }
        });
        for(var i = 0; i < towers.length; i++) {
            var tower = towers[i];
            if(!tower.attackEnemy()) {
                tower.repairStructures();
            }
        }
    }
}