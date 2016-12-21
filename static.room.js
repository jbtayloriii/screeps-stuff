var memoryStaticRoom = require('memory.static.room');

module.exports.getSources = function(mRoomId) {
    return memoryStaticRoom.getSources(mRoomId);
}

module.exports.getResourceType = function(mRoomId) {
    return 0;
}

module.exports.getMap = function(mRoomId) {
    return [];
}