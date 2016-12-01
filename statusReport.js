/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('statusReport');
 * mod.thing == 'a thing'; // true
 */

var statusReport = {

    /** @param {Creep} creep **/
    creepStatus: function(creeps) {
        console.log("Printing creep status");
        for (var creep in creeps) {
            console.log(creep.toString());
        }
        
    }
};

module.exports = statusReport;