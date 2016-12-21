/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('scheduler');
 * mod.thing == 'a thing'; // true
 */
 
var schedulerMemory = require('memory.scheduler');
var spawnMemory = require('memory.spawn');

module.exports.createNewScheduler = function() {
    return "tammy";
}

module.exports.createNewSchedulerForSpawn = function(spawnName) {
    if(!Memory.spawns[spawnName]) {
        return null;
    }
    var schedulerName = module.exports.createNewScheduler();
}