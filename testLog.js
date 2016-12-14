/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('testLog');
 * mod.thing == 'a thing'; // true
 */
 
var creepRoles = require('creep.roles');
var creepActions = require('creep.actions');
var journal = require('log.journal');
var memoryExpansion = require('memory.expansions');
var memoryOwned = require('memory.ownedRooms');


var testLog = {
    
    
    testLogLoopFunc : function() {
        return;
        var roomName = 'W73S47';
        for(var key in memoryOwned.getExpansions(roomName)) {
            console.log(key);
        }
        return;
        console.log(memoryExpansion.createNewExpansion('W73S47','W74S47'));
        console.log(memoryExpansion.getOpenSources(roomName));
    }
}

module.exports = testLog;