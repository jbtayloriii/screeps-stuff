/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('expansion.manual');
 * mod.thing == 'a thing'; // true
 */


// var man = require('expansion.manual'); man.addExpansion(room, targetRoom);
// var man = require('expansion.manual'); man.addExpansion('W73S47', 'W74S47');
module.exports = {
    addExpansion(mRoomName, mExpansionName) {
        if(!Memory.rooms[mRoomName]) {
            console.log("Error adding expansion, parent room is not in memory");
            return;
        }
        
        if(!Memory.rooms[mRoomName].expansions) {
            Memory.rooms[mRoomName].expansions = {};
        }
        
        if(Memory.rooms[mRoomName].expansions[mExpansionName]) {
            console.log("Error adding expansion, expansion room is already listed");
            return;
        }
        
        Memory.rooms[mRoomName].expansions[mExpansionName] = {};
        console.log("Successfully added " + mExpansionName + " to " + mRoomName);
    }

};