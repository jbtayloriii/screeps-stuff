/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('manual.expansion');
 * mod.thing == 'a thing'; // true
 */
 
var memoryOwned = require('memory.ownedRooms');
var memoryExpansion = require('memory.expansions');

// var man = require('manual.expansion'); man.addExpansion(room, expansionRoom);
// var man = require('manual.expansion'); man.addExpansion('W73S47', 'W74S47');
module.exports = {
    addExpansion(mRoomId, mExpRoomId) {
        var result = memoryOwned.addExpansion(mRoomId, mExpRoomId);
        if(!result) {
            console.log("Error adding expansion " + mExpRoomId + " to owned room " + mRoomId + " memory");
            return;
        }
        result = result && memoryExpansion.createNewExpansion(mRoomId, mExpRoomId);
        
        if(!result) {
            console.log("Error adding owned room " + mRoomId + " to expansion room " + mExpRoomId + " memory");
            return;
        }
        
        console.log("Successfully added " + mExpRoomId + " as an expansion to " + mRoomId);
    }

};