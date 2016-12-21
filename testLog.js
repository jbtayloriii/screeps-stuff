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
//var testf = require('room.test');


var testLog = {
    
    
    testLogLoopFunc : function() {
        return;
        console.log("hey there");
        for(var i = 0; i < 75; i++) {
            journal.addEntry("testing " + i);
        }

        var expName = 'W74S47';
        //console.log(memoryExpansion.getClaimerName(expName));
    }
}

module.exports = testLog;