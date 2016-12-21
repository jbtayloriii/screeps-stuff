/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('creep.actions');
 * mod.thing == 'a thing'; // true
 */
 
var logMsg = true;
var constants = require('base.constants');
var memoryWar = require('memory.war');
var journal = require('log.journal');
var roomExpansion = require('room.expansion');
var memorySource = require('memory.source');
 
var actionReturnVal = {
    nextAction : 1,
    sameAction : 0,
    killCreep : -3
}


module.exports.actions = {
    harvestClosestSource : "harvestClosestSource",
    returnEnergyToStructures : "returnEnergyToStructures",
    buildConstruction : "buildConstruction",
    upgradeSource : "upgradeSource",
    repairBuilding : "repairBuilding",
    getClosestEnergyStorage : 'getClosestEnergyStorage',
    travelToRoom : 'travelToRoom',
    travelToSpawnRoom : 'travelToSpawnRoom',
    powerHarvestSource : 'powerHarvestSource',
    getCarrierContainerEnergy : 'getCarrierContainerEnergy',
    meleeAttackEnemies : 'meleeAttackEnemies',
    claimControllerInRoom : 'claimControllerInRoom',
    recordRoom : 'recordRoom',
    getNewScoutingRoom : 'getNewScoutingRoom',
    die : 'die'
}
 
module.exports.functions = {

    recordRoom : function(creep, args) {
        return actionReturnVal.sameAction;
    },

    getNewScoutingRoom : function(creep, args) {
        return 1;
    },
     
    harvestClosestSource : function(creep, args) {
        if(creep.carry.energy == creep.carryCapacity) {
            creep.forgetCurrentSourceId();
            return actionReturnVal.nextAction;
        }
        
        var sourceId = creep.getClosestEnergySourceId();
        if(sourceId == constants.ERR_SOURCES_FULL) {
            creep.say("Waiting on source");
            return actionReturnVal.sameAction;
        }
        if(!sourceId) {
            if(logMsg) {
                console.log("creep.actions: harvestClosestSource: No source Id; creep: " + creep.name);
            }
            creep.forgetCurrentSourceId();
            return -1;
        }
        
        var source = Game.getObjectById(sourceId);
        
        var harvestCode = creep.harvest(source);
        
        if(harvestCode == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
            return 0;
        } else if(harvestCode == OK) {
            if(creep.carry.energy < creep.carryCapacity) {
                return 0;
            } else {
                creep.forgetCurrentSourceId();
                return 1;
            }
        }
        if(creep.carry.energy == creep.carryCapacity) {
            creep.forgetCurrentSourceId();
            return 1;
        }
        
        creep.forgetCurrentSourceId();
        return -2;
    },
    
    die : function(creep, args) {
        creep.suicide();
    },
    
    powerHarvestSource : function(creep, args) {
        var sourceCont;
        if(creep.memory.targetRoom && (creep.room.name != creep.memory.targetRoom)) {
            console.log(creep.name + " is not in the correct room to power harvest");
            var exit = creep.room.findExitTo(creep.memory.targetRoom);
            creep.moveTo(creep.pos.findClosestByRange(exit));
            return 0;
        }        
        var harvestPos;
        var harvestSourceId;

        if(creep.memory.targetSource) {
            //console.log(creep.name +"; " + creep.memory.targetSource);
            harvestPos = memorySource.getPowerHarvesterHarvestPosition(creep.memory.targetSource);
            if(!harvestPos) {
                return 0;
            }
            harvestSourceId = creep.memory.targetSource;
        } else {
            sourceCont = creep.getOpenPowerSourcePosition();
            if(!sourceCont) {
                journal.addEntry(creep.name + " cannot find a source to power harvest");
                return 0;
            }
            harvestSourceId = sourceCont.sourceId;
            harvestPos = sourceCont.pos;
            if(!harvestPos) {
                console.log('powerHarvest: trouble finding position for ' + creep.name);
                return 0;
            }
        }
        

        if(!(creep.pos.x == harvestPos.x) || !(creep.pos.y == harvestPos.y)) {
            creep.moveTo(harvestPos);
            return 0;
        }
        
        
        var harvestCode = creep.harvest(Game.getObjectById(harvestSourceId));
        return 0;
    },
    
    getCarrierContainerEnergy : function(creep, args) {
        var containerObj, sourceObj;
        if(creep.memory.targetRoom && (creep.room.name != creep.memory.targetRoom)) {
            var exit = creep.room.findExitTo(creep.memory.targetRoom);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }

        if(creep.memory.targetSource) {
            creep.memory.currentCarrierSourceId = creep.memory.targetSource;
            sourceObj = Game.getObjectById(creep.memory.targetSource);
            if((!Memory.sources[sourceId]) || (!Memory.sources[sourceId].sourceContainer)) {
                //console.log(creep.name + " is picking things up, should get container built");
                var resourceObj = creep.room.find(FIND_DROPPED_ENERGY);
                var pickupCode = creep.pickup(resourceObj[0]);
                //console.log(creep.name + resourceObj[0]);
                if(pickupCode == ERR_NOT_IN_RANGE) {
                    creep.moveTo(resourceObj[0]);
                }
                if(creep.carry.energy == creep.carryCapacity) {
                    return 1;
                }
                return 0;
            }
        }
        
        var goodObj = false;
        
        
        if(creep.memory.currentCarrierSourceContainerId) {
            if(Memory.sources[creep.memory.currentCarrierSourceId].storageCarrier == creep.name) {
                containerObj = Game.getObjectById(creep.memory.currentCarrierSourceContainerId);
                goodObj = true;
            }
        }
        
        if(!goodObj) {
            var sourceInfo = creep.room.memory.sources;
            for(var i = 0; i < sourceInfo.length && !creep.memory.currentCarrierSourceId; i++) {
                var sourceId = sourceInfo[i];
                sourceObj = Game.getObjectById(sourceId);
                if(sourceObj.addCreepCarrierStorage(creep)) {
                    creep.memory.currentCarrierSourceContainerId = Memory.sources[sourceId].sourceContainer.containerId;
                    creep.memory.currentCarrierSourceId = sourceId;
                    console.log(creep.name + " carrying for source " + sourceId);
                    containerObj = Game.getObjectById(creep.memory.currentCarrierSourceContainerId);
                }
            }
        }
        
        if(!containerObj) {
            if(sourceObj)
            console.log("creep.actions: " + creep.name + ": No container Id found for carrier");
            return 0;
        }
        
        var transferCode = creep.withdraw(containerObj, RESOURCE_ENERGY);
        if(creep.carry.energy == creep.carryCapacity) {
            return 1;
        }
        
        if(transferCode == ERR_NOT_IN_RANGE) {
            creep.moveTo(containerObj);
            return 0;
        }
        return -2;
    },
    
    meleeAttackEnemies : function(creep,args) {
        var enemy;
        enemy = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
        if(!enemy) {
            enemy = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES);
        }
        if(!enemy) {
            enemy = creep.pos.findClosestByPath(FIND_HOSTILE_SPAWNS);
        }
        if(!enemy) {
            //enemy = creep.pos.findClosestByPath(FIND_HOSTILE_CONSTRUCTION_SITES);
        }
        
        if(enemy) {
            //console.log(creep.name + " is attacking " + enemy)
            if(creep.attack(enemy) == ERR_NOT_IN_RANGE) {
                creep.moveTo(enemy);
                return 0;
            }
            return 0;
        } else {
            console.log(creep.name + " is removing room " + creep.memory.targetRoom + " from war with our room " + creep.memory.spawnId);
            memoryWar.removeWarTarget(Game.getObjectById(creep.memory.spawnId).room, creep.memory.targetRoom);
            return -3;
        }
        
        return 0;
        
    },
    
    getClosestEnergyStorage : function(creep, args) {
        var spawnRoom = Game.getObjectById(creep.memory.spawnId).room.name;
        if(creep.room.name != spawnRoom) {

            var exit = creep.room.findExitTo(spawnRoom);
            creep.moveTo(creep.pos.findClosestByRange(exit));
            return 0;
        }
        var storageId = creep.getClosestEnergyStorageId(args.priority);
        var storageObj = Game.getObjectById(storageId);
        if(!storageId || ! storageObj) {
            console.log(creep.name + ": No storage Id found");
            return 0;
        }
        
        var transferCode = creep.withdraw(storageObj, RESOURCE_ENERGY);
        if(creep.carry.energy == creep.carryCapacity) {
            return 1;
        }
        
        if(transferCode == ERR_NOT_IN_RANGE) {
            creep.moveTo(storageObj);
            return 0;
        }
        return -2;
    },
    
    claimControllerInRoom : function(creep, args) {
        var spawnObj = Game.getObjectById(creep.memory.spawnId);
        if(roomExpansion.registerCreepForExpansion(spawnObj.room.name, creep.memory.targetRoom, creep.id)) {
            creep.memory.claimRoomId = creep.memory.targetRoom;
        } else {
            console.log("cannot add");
            //journal.addEntry(creep.name + " cannot add itself as the claimer to room " + creep.memory.targetRoom);
            return 0;
        }
        
        if(!(creep.memory.targetRoom == creep.room.name)) {
            console.log("cannot add2");
            journal.addEntry(creep.name + " is in the wrong room to claim, moving to next action");
            return 0;
        }
        
        var targetContObj = creep.room.controller;
        
        var claimCode = creep.reserveController(targetContObj);
        if(claimCode == ERR_NOT_IN_RANGE) {
            creep.moveTo(targetContObj);
        }
        return 0;
    },

    //args : priority - a list of the priority to return energy to structures
    returnEnergyToStructures : function(creep, args) {
        var structureId = creep.getStructureIdNeedingEnergyWithPriority(args.priority, creep.carry);
        if(!structureId) {
            delete creep.memory.currentTargetStructureId;
            return -1;
        }
        
        var structure = Game.getObjectById(structureId);
        
        var transferCode = creep.transfer(structure, RESOURCE_ENERGY);
        if(creep.carry.energy == 0) {
            delete creep.memory.currentTargetStructureId;
            return 1;
        }

        if(transferCode == ERR_NOT_IN_RANGE) {
            creep.moveTo(structure);
            return 0;
        } else if(transferCode == OK) {
            if(creep.carry.energy > 0) {
                return 0;
            } else {
                delete creep.memory.currentTargetStructureId;
                return 1;
            }
        } else if(transferCode == ERR_NOT_ENOUGH_ENERGY) {
            delete creep.memory.currentTargetStructureId;
            return 1;
        }
        
        if(creep.carry.energy == 0) {
            delete creep.memory.currentTargetStructureId;
            return 1;
        }
        
        return -2;
    },
    
    //args : None
    buildConstruction : function(creep, args) {
        var constructionId = creep.getConstructionId();
        if(constructionId == constants.ERR_NO_CONSTRUCTION) {
            //console.log(creep.name + " would remove builder here");
            creep.removeConstructionId();
            //return -1;
            return -3;
        }
        
        var construction = Game.getObjectById(constructionId);
        var buildCode = creep.build(construction);
        if(buildCode == ERR_NOT_IN_RANGE) {
            creep.moveTo(construction);
            return 0;
        } else if(buildCode == OK) {
            if(creep.carry.energy > 0) {
                return 0;
            }
        }
        
        if(creep.carry.energy == 0) {
            creep.removeConstructionId();
            return 1;
        }
        return -2;
    },
    
    //args : none
    upgradeSource : function(creep, args) {
        if(!creep.room.controller) {
            if(logMsg) {
                console.log("creep.actions: upgradeSource: No controller");
            }
            return -1;
        }
        
        var upgradeCode = creep.upgradeController(creep.room.controller);
        if(upgradeCode == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
            return 0;
        } else if(upgradeCode == OK){
            if(creep.carry.energy > 0) {
                return 0;
            }
        }
        
        if(creep.carry.energy == 0) {
            return 1;
        }
        if(logMsg) {
            console.log("bad upgrade code reached " + upgradeCode);
        }
        return -2;
    },
    
    repairBuilding : function(creep, args) {
        if(creep.carry.energy == 0) {
            delete creep.memory.currentRepairId;
            return 1;
        }

        var repairId;

        if(this.memory.currentRepairId) {
            var repairObjMem = Game.getObjectById(this.memory.currentRepairId);
        
            if(repairObjMem && repairObjMem.hits < repairObjMem.hitsMax && repairObjMem.hits <= constants.repairCutoff) {
                repairId = this.memory.currentRepairId;
            } else {
                delete this.memory.currentRepairId;
            }
        }
    
        var structureArr = this.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => (structure.hits < structure.hitsMax) && (structure.hits <= constants.criticalRepairCutoff)
        });
    
    
        if(!structureArr) {
            structureArr = this.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => (structure.hits < structure.hitsMax) && (structure.hits <= constants.repairCutoff)
            });
        }
        
        if (structureArr) {
            this.memory.currentRepairId = structureArr.id;
            repairId = this.memory.currentRepairId;
        }
        if(!repairId) {
            delete creep.memory.currentRepairId;
            return -1;
        }
        var repairObj = Game.getObjectById(repairId);
        
        var repairCode = creep.repair(repairObj);
        if(repairCode == ERR_NOT_IN_RANGE) {
            creep.moveTo(repairObj);
            return 0;
        }
        if(repairCode == OK && repairObj.hits < repairObj.hitsMax && repairObj.hits <= constants.repairCutoff) {
            return 0;
        }
        if(repairCode == OK || repairObj.hits == repairObj.hitsMax || repairObj.hits > constants.repairCutoff) {
            delete creep.memory.currentRepairId;
            return 1;
        }
        
        return -2;
    },
    
    travelToRoom : function(creep, args) {
        var roomName = creep.memory.targetRoom;
        if(creep.room.name == roomName) {
            return actionReturnVal.nextAction;
        } else {
            var exit = creep.room.findExitTo(roomName);
            creep.moveTo(creep.pos.findClosestByRange(exit));
            return actionReturnVal.sameAction;
        }
    },
    
    travelToSpawnRoom : function(creep, args) {
        var spawnId = creep.memory.spawnId;
        if(!spawnId) {
            console.log("Creep does not have home spawn ID");
        }
        var spawnRoomName = Game.getObjectById(spawnId).room.name;
        if(creep.room.name == spawnRoomName) {
            return 1;
        } else {
            var exit = creep.room.findExitTo(spawnRoomName);
            creep.moveTo(creep.pos.findClosestByRange(exit));
            return 0;
        }
        return -2
    }
}


//// This is the main loop for creep acting. Each action will return one of a number of values

Creep.prototype.act = function() {
    if(!this.memory.action) {
        console.log(this.name + " has no actions");
        this.setupRole(this.memory.role);
        return;
    }
    
    var currentAction = this.memory.action.currentAction;
    if(!currentAction) {
        console.log("creep.action: " + this.name + " has an error performing action " + currentAction);
        return;
    }
    
    if(!this.memory.action.actions) {
        console.log(this.name + " has no actions");
        if(this.memory.role) {
            console.log("creep.action: " + "Attempting to setup creep again with role " + this.memory.role);
            this.setupRole(this.memory.role);
        }
        return;
    }
    
    var returnVal = 0;
    var currentActionObject = this.memory.action.actions[currentAction];

    var actionFunction = currentActionObject.action;
    if(!(typeof module.exports.functions[actionFunction] === "function")) {
        console.log("creep.action: " + this.name + " Action " + actionFunction + " is not a function");
        return;
    }
    var args = currentActionObject.args;
    if(!args) {
        args = {};
    }
    
    returnVal = module.exports.functions[actionFunction](this, args);
    if(returnVal == actionReturnVal.nextAction) {
        var nextAction = currentActionObject.next;
        if(nextAction) {
            this.memory.action.currentAction = nextAction;
            currentAction = this.memory.action.currentAction;
        }
    } else if(returnVal == -3 || (this.ticksToLive < 50 && this.memory.role != 'powerHarvester' && this.memory.role != 'expansionPowerHarvester')) {
        //Remove the creep
        if(!(this.memory.role == 'returnEnergyAndDie')){
            console.log(this.name + " is removing itself with role " + this.memory.role);
            this.memory.role = 'returnEnergyAndDie';
            this.setupRole(this.memory.role);
        }
    } else {
        //repeat
    }
}