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
 *  -   -   [*]
 *  -   -   -   openSpaces
 *  -   -   -   currentUsers
 *  -   -   -   id
 *  -   -   -   x
 *  -   -   -   y
 *
 *
 */

function mapSources(room) {
    var sources = room.find(FIND_SOURCES);
    room.memory.sources = [];
    for(var i = 0; i < sources.length; i++) {
        var source = sources[i];
        console.log("Source position" + source.pos.x + ", " + source.pos.y);
         
        sourceMemory = {};
        sourceMemory.id = source.id;
        sourceMemory.x = source.pos.x;
        sourceMemory.y = source.pos.y;
         
        var openSpaces = 0;
        //get the open spaces
        for(var x = sourceMemory.x - 1; x <= sourceMemory.x + 1; x++) {
            for(var y = sourceMemory.y - 1; y <= sourceMemory.y + 1; y++) {
                var look = room.getPositionAt(x, y).look();
                look.forEach(function(lookObject) {
                    if(lookObject.type == LOOK_TERRAIN && lookObject[LOOK_TERRAIN] != 'wall') {
                        openSpaces++;
                    }
                });
            }
        }
        sourceMemory.openSpaces = openSpaces;
        sourceMemory.currentUsers = 0;
        room.memory.sources[i] = sourceMemory;
    }
}
 
Room.prototype.refreshMemory = function(hardRefresh) {
    if(this.memory.mapped && !hardRefresh) {
        return this;
    }
    console.log("Refreshing memory for room " + this.name);
    
    delete Memory.rooms[this.name];
    mapSources(this);
    this.memory.mapped = true;
    return this;
}

module.exports = null;