/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('memory.source');
 * mod.thing == 'a thing'; // true
 */

function mapSource(source, memory) {
    
    Memory.sources[this.id].x = this.pos.x;
    Memory.sources[this.id].y = this.pos.y;
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
    Memory.sources[this.id].currentUsers = 0;
    Memory.sources[this.id].openSpaces = openSpaces;
}
 
Source.prototype.refreshMemory = function(hardRefresh) {
    if(!Memory.sources) {
        Memory.sources = {};
    }
    
    if(!Memory.sources[this.id]) {
        Memory.sources[this.id] = {};
    }
    
    if(Memory.sources[this.id].mapped && !hardRefresh) {
        return this;
    }
    mapSource(this, Memory.sources[this.id]);
     
    Memory.sources[this.id].mapped = true;
    return this;
}

module.exports = null;