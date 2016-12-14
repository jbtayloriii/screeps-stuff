/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('log.journal');
 * mod.thing == 'a thing'; // true
 */

var logBase = require('log.base');
var journalMaxSpace = 200; //max KB of journal space

module.exports.addEntry = function(text) {
    logBase.initLog();
    if(!text) {
        return;
    }
    //TODO: remove the last oldest if we go over the max space
    
    Memory.log.journal.entries.push(Game.time + ": " + text);
}


module.exports.readNewEntries = function() {
    logBase.initLog();
    for(var index = Memory.log.journal.oldEntries; index < module.exports.getEntryCount(); index++) {
        var nextEntry = Memory.log.journal.entries[index];
        console.log(nextEntry);
        Memory.log.journal.oldEntries++;
    }
}

module.exports.getEntryCount = function() {
    logBase.initLog();
    return Memory.log.journal.entries.length;
}

module.exports.getOldEntryCount = function() {
    logBase.initLog();
    return Memory.log.journal.oldEntries;
}

module.exports.deleteOldEntries = function(maxDeleteCount) {
    if(!maxDeleteCount) {
        maxDeleteCount = module.exports.getEntryCount();
    }
    
    var deleteCount = Math.min(maxDeleteCount, Memory.log.journal.oldEntries);
    if(deleteCount == 0) {
        return;
    }
    console.log("Deleting oldest " + deleteCount + "journal entries.");
    Memory.log.journal.entries.splice(0, deleteCount);
    Memory.log.journal.oldEntries = Math.max(0, Memory.log.journal.oldEntries - deleteCount);
}