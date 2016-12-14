/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('memory.ownedRooms');
 * mod.thing == 'a thing'; // true
 */

require('memory.core');

module.exports.getRoomMemObj = function(mRoomId) {
    if(!Memory.ownedRooms[mRoomId]) {
        var roomMemObj = {};
        roomMemObj.spawns = {};
        roomMemObj.expansions = {};
        Memory.ownedRooms[mRoomId] = roomMemObj;
    }
    return Memory.ownedRooms[mRoomId];
}

module.exports.addExpansion = function(mRoomId, mExpRoomId) {
    var roomMemObj = module.exports.getRoomMemObj(mRoomId);
    if(roomMemObj.expansions[mExpRoomId]) {
        return false;
    }
    roomMemObj.expansions[mExpRoomId] = {};
    return true;
}

module.exports.getExpansions = function(mRoomId) {
    var roomMemObj = module.exports.getRoomMemObj(mRoomId);
    if(!roomMemObj) {
        return null;
    }
    if(!roomMemObj.expansions) {
        return {};
    }
    return roomMemObj.expansions;
}

module.exports.removeExpansion = function(mRoomId, mExpRoomId) {
    var roomMemObj = module.exports.getRoomMemObj(mRoomId);
    if(!roomMemObj.expansions[mExpRoomId]) {
        return false;
    }
    delete roomMemObj.expansions[mExpRoomId];
    return true;
}