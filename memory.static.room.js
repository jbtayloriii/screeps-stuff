/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('memory.static.room');
 * mod.thing == 'a thing'; // true
 */
 
require('memory.core');

module.exports.mapRoom = function(mRoomObj) {
    if(Memory.static.rooms[mRoomObj.name]) {
        return true;
    }
    
    var roomMemObj = {};
    var sources = mRoomObj.find(FIND_SOURCES);
    roomMemObj.sources = [];
    for(var i = 0; i < sources.length; i++) {
        module.exports.mapSource(sources[i]);
        roomMemObj.sources.push(sources[i].id);
    }
    
    //TODO: map room out, see how much space this needs
    var roomMap = {};
    roomMemObj.hasSourceKeepers = false;
    
    //map out room
    for(var i = 0; i < 50; i++) {
        for(var j = 0; j < 50; j++) {
            var look = mRoomObj.getPositionAt(i, j).look();
            var posObj = {};
            look.forEach(function(lookObject) {
                if(lookObject.type == LOOK_TERRAIN) {
                    posObj.terrainType = lookObject[LOOK_TERRAIN];
                }
                
                if((lookObject.type == LOOK_STRUCTURES) && (lookObject[LOOK_STRUCTURES].structureType == STRUCTURE_KEEPER_LAIR)) {
                    roomMemObj.hasSourceKeepers = true;
                }
            });
            roomMap[i + ',' + j] = posObj;
        }
    }
    
    roomMemObj.map = roomMap;
    
    Memory.static.rooms[mRoomObj.name] = roomMemObj;
    
    return true;
}

function getStaticRoomObj(mRoomName) {
    if(!Memory.static.rooms[mRoomName]) {
        return null;
    }
    return Memory.static.rooms[mRoomName];
}

module.exports.getSources = function(mRoomId) {
    var staticRoomObj = getStaticRoomObj(mRoomName);
    if(!staticRoomObj) {
        return null;
    }
    return staticRoomObj.sources;
}