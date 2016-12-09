/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('script.creeps');
 * mod.thing == 'a thing'; // true
 */

// var script = require('script.creeps'); script.sayRole();
module.exports.sayRole = function() {
    var roleCount = {};
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        creep.say(creep.memory.role);
        if(!roleCount[creep.memory.role]) {
            roleCount[creep.memory.role] = 1;
        } else {
            roleCount[creep.memory.role]++;
        }
    }
    
    console.log("Roles:")
    
    for(var role in roleCount) {
        console.log(role + ": " + roleCount[role] + " creeps");
    }
}

// var script = require('script.creeps'); script.saySource('5836b6e08b8b9619519ef7fd');
module.exports.saySource = function(sourceId) {
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.currentEnergySourceId == sourceId) {
            creep.say("On source");
        }
    }
}

// var script = require('script.creeps'); script.getDistanceTicks(new RoomPosition(19, 12, 'W73S47'), new RoomPosition(24, 5, 'W73S47'));
module.exports.getDistanceTicks = function(storagePos, roomPos, plainCosts, swampCosts) {
    var roomGoal = {
        pos : roomPos,
        range : 1
    };
    
    var ret = PathFinder.search(storagePos, roomGoal,
    {
        plainCost: plainCosts,
        swampCost: swampCosts,
        roomCallback: function(roomName) {
            let room = Game.rooms[roomName];
            // In this example `room` will always exist, but since PathFinder 
            // supports searches which span multiple rooms you should be careful!
            if (!room) return;
            let costs = new PathFinder.CostMatrix;
    
            room.find(FIND_STRUCTURES).forEach(function(structure) {
              if (structure.structureType === STRUCTURE_ROAD) {
                // Favor roads over plain tiles
                costs.set(structure.pos.x, structure.pos.y, 1);
              } else if (structure.structureType !== STRUCTURE_CONTAINER && 
                         (structure.structureType !== STRUCTURE_RAMPART ||
                          !structure.my)) {
                // Can't walk through non-walkable buildings
                costs.set(structure.pos.x, structure.pos.y, 0xff);
              }
            });
    
            return costs;
        }
    });
    
    if(!ret || ret.incomplete) {
        return -1;
    }
    console.log(ret.cost);
    console.log(ret.path);
    return ret.cost;
}