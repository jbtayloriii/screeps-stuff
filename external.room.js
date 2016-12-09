/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('external.room');
 * mod.thing == 'a thing'; // true
 */


const roomWidth = 50; // 0 to 49
const roomHeight = 50; // 0 to 49

// Make sure to replace mRoomId
// var script = require('external.room'); script.getRoom('W73S47');
module.exports.getRoom = function(mRoomId) {
    
    var terrainChar = {
        "wall" : "w",
        "plain" : "p",
        "swamp" : "s"
    }
    
    setupCache(mRoomId);
    var cacheVar = Memory.external[mRoomId];
    cacheVar.id = mRoomId;
    
    if(!cacheVar.exits) {
        cacheVar.exits = Game.map.describeExits(mRoomId);
    }
    
    cacheVar.isAvailable = Game.map.isRoomAvailable(mRoomId);
    if(!cacheVar.rowStart) {
        cacheVar.rowStart = 0;
    }
    var row = cacheVar.rowStart;

    createNewPropObj(cacheVar, "rows");
    while(row < roomHeight) {
        var rowArr = [];
        for(var col = 0; col < roomWidth; col++) {
            var terrain = Game.map.getTerrainAt(col, row, mRoomId)
            rowArr.push(terrainChar[terrain]);
        }
        var rowStr = rowArr.join("");
        
        cacheVar.rows[row] = rowStr;
        cacheVar.rowStart += 1;
        row = cacheVar.rowStart;
    }
    
    sendJSONObj(cacheVar, mRoomId);
    
    console.log(JSON.stringify(cacheVar));
    //Game.notify(JSON.parse(Memory.external[mRoomId]));
    delete Memory.external[mRoomId];
}

function sendJSONObj(obj, id) {
    initMessage(obj, id);
    
}

function initMessage(obj, id) {
    if(!Memory.message) {
        Memory.message = {};
    }
    if(!Memory.message[id]) {
        Memory.message[id] = {};
    }
}

function createNewPropObj(obj, name) {
    if(!obj[name]) {
        obj[name] = {};
    }
}

function setupCache(cacheId) {
    if(!Memory.external) {
        Memory.external = {};
    }
    if(!Memory.external[cacheId]){
        Memory.external[cacheId] = {};
    }
}