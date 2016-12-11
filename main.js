var roleBase = require('role.base');
var creepCreator = require('room.creepCreator');
var creepAction = require('creep.action');
var creepActions = require('creep.actions');
var memoryMain = require('memory.main');

require('prototype.tower');

require('memory.source');

var spawnManager = require('spawn.manager');

var testLog = require('testLog');

var memorySpawn = require('memory.spawn');

module.exports.loop = function () {
    //console.log(Game.time);
    
    var spawn = Game.spawns['spawn1'];
    
    testLog.testLogLoopFunc();
    
    spawnManager.manage(spawn);
    
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