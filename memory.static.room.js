/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('memory.static.room');
 * mod.thing == 'a thing'; // true
 */
 
require('memory.core');

function getStaticRoomObj(mRoomName) {
    if(!Memory.static.rooms[mRoomName]) {
        return null;
    }
    return Memory.static.rooms[mRoomName];
}

module.exports.getSourceCount = function(mRoomId) {
    var staticRoomObj = getStaticRoomObj(mRoomName);
    if(!staticRoomObj) {
        return null;
    }
    if(!staticRoomObj.sources) {
        return 0;
    }
    return staticRoomObj.sources.length;
}