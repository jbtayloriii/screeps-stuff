/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('expansion.memory');
 * mod.thing == 'a thing'; // true
 */
 
module.exports.getExpansionObj = function(mRoomName) {
    if(!Memory.rooms[mRoomName].expansions) {
        return null;
    }
}

module.exports.getExpansionCount = function(mRoomName) {
    
    if(Memory.rooms[mRoomName].expansions) {
        return Object.keys(Memory.rooms[mRoomName].expansions).length;
    }
    return 0;
}