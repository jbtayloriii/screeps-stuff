/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('memory.room');
 * mod.thing == 'a thing'; // true
 */
 
 /*
 * Room
 *  -   mapped
 *  -   sources
 *  -   -   [id]
 *
 *
 */

function mapSources(room) {
    var sources = room.find(FIND_SOURCES);
    room.memory.sources = [];
    for(var i = 0; i < sources.length; i++) {
        room.memory.sources.push(sources[i].id);
    }
}

function mapSpawns(room) {
    var spawns = room.find(FIND_MY_SPAWNS);
    room.memory.spawns = [];
        for(var i = 0; i < spawns.length; i++) {
        room.memory.spawns.push(spawns[i].id);
    }
}
 
Room.prototype.refreshMemory = function(hardRefresh) {
    if(this.memory.mapped && !hardRefresh) {
        return this;
    }
    console.log("Refreshing memory for room " + this.name);
    
    delete Memory.rooms[this.name];
    mapSources(this);
    mapSpawns(this);
    this.memory.mapped = true;
    return this;
}

module.exports = null;