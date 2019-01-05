var Helper = require("BattleHelper");
var currentGenerateUnitID = 0;
var listTower = [];
var listCharacter = [];
var battleHistory = [];
var pingTime = [0,0];

var PLAYER_READY        = 1;
var SPAWN_CHARACTER     = 2;
var CHARACTER_ATTACK    = 3;
var CHARACTER_DAMAGE    = 4;
var CHARACTER_SUMMON    = 5;
var CHARACTER_SKILL     = 6;
var GAME_END            = 7;
var IN_GAME_MESSAGE     = 8;
var PING                = 9;
var CLIENT_PING         = 10;
var PLAYER_CONNECT      = 11;
var PLAYER_DISCONNECT   = 12;
var PLAYER_RECONNECT    = 13;
var DOUBLE_ENERGY       = 14;
var MATCH_TIME          = 125000;
var X2_TIME             = 60000;
var defaultSpace        = 1.5;
var maxUnit             =0;

var isMatchStart = false;
var star1 = 0.7;
var star2 = 0.4;
var star3 = 0;
var matchEndTimeOut = null;
var doubleEnergyTimeOut = null;
var isDie = false;
//player ready+
RTSession.onPacket(PLAYER_READY, function(packet){

    currentGenerateUnitID+=100;
    var genID = currentGenerateUnitID;
    var tower = {
        "genID":0,
        "level":0,
        "userID":"",
        "maxHealth":0,
        "currentHealth":0
    };
    tower.genID = genID;
    tower.userID = packet.getSender().getPlayerId();
    tower.level = packet.getData().getNumber(1);
    tower.maxHealth = packet.getData().getNumber(2);
    tower.currentHealth = tower.maxHealth;
    listTower.push(tower);
 
    if(listTower.length==2){
        var time = Date.now()+Helper.GetTimeDelay(pingTime);
        var rtData = RTSession.newData()
        .setNumber(1, listTower[0].level) 
        .setNumber(2, listTower[0].genID)
        .setString(3, listTower[0].userID) 
        .setNumber(4, listTower[1].level) 
        .setNumber(5, listTower[1].genID)
        .setString(6, listTower[1].genID)
        .setDouble(7,  time);
        RTSession.newPacket().setData(rtData).setOpCode(PLAYER_READY).setReliable(true).send();
        matchEndTimeOut = RTSession.setTimeout(function(){
            // tinh toan crown roi tra ve ket qua
            CalculateCrown();
        }, MATCH_TIME);
        // doubleEnergyTimeOut = RTSession.setTimeout(function(){
            
        //     RTSession.newPacket().setOpCode(DOUBLE_ENERGY).setReliable(true).send();
        // }, 66000);
        isMatchStart = true;
        var data = [listTower[0].level,listTower[0].genID,listTower[0].userID,listTower[1].level,listTower[1].genID,listTower[1].userID,time];
        
        // set battle history
        var battleStep = {
            "packetType":PLAYER_READY,
            "data":Helper.ArrayToJSON(data)
        };
        battleHistory.push(battleStep);
    }
});

// play unit
RTSession.onPacket(SPAWN_CHARACTER, function(packet){
    currentGenerateUnitID+=100;
    
    var genID = currentGenerateUnitID;
    var id = packet.getData().getNumber(1);
    var level = packet.getData().getNumber(2);
    var maxHealth = packet.getData().getNumber(3);
    var pos  = packet.getData().getFloatArray(4);
    var number = packet.getData().getNumber(5);
    var userID = packet.getSender().getPlayerId();
    var time =Date.now()+ Helper.GetTimeDelay(pingTime);
    maxUnit = number>maxUnit?number:maxUnit;
    var rtData = RTSession.newData()
    .setString    (1, userID)
    .setNumber    (2, genID)
    .setNumber    (3, id) 
    .setNumber    (4, level)
    .setFloatArray(5, pos)
    .setDouble    (6,  time);
    RTSession.newPacket().setData(rtData).setOpCode(SPAWN_CHARACTER).setReliable(true).send();  
    
    var currentgenID  = currentGenerateUnitID;
    if(number <=1){
        var character = {
            "id" : id,
            "genID": currentgenID,
            "level" : level,
            "maxHealth":maxHealth,
            "currentHealth" : maxHealth,
            "position":pos,
            "userID":userID
        };
                
        listCharacter.push(character);
    }
    else{
        for(var i =0;i<number;i++){
            var character = {
                "id" : id,
                "genID": currentgenID+1+i,
                "level" : level,
                "maxHealth":maxHealth,
                "currentHealth" : maxHealth,
                "position":pos,
                "userID":userID
            };
            
            listCharacter.push(character);
        }
        
    }
     // set battle history
    var data = [userID,genID,id,level,pos,time];
    var battleStep = {
        "packetType":SPAWN_CHARACTER,
        "data":Helper.ArrayToJSON(data)
    };
    battleHistory.push(battleStep);
});
//unit attack
RTSession.onPacket(CHARACTER_ATTACK, function(packet){
    var playerID =  packet.getSender().getPlayerId();
    var genID  =  packet.getData().getNumber(1);
    var pos = packet.getData().getFloatArray(2);
    var damageMultiple = packet.getData().getFloat(3);
    var currentHealth = 0;
    var maxHealth =0;
    
    if(genID <= 200){ // tower attack
        var towerIndex = Helper.GetTowerIndex(genID, listTower);
        currentHealth = listTower[towerIndex].currentHealth;
        if(currentHealth<=0) return;
    }    
    else{
        var characterIndex = Helper.GetCharacterIndex(genID, listCharacter);
        
        if(characterIndex==-1){ // character da chet
            return;
        }
        currentHealth = listCharacter[characterIndex].currentHealth;
        listCharacter[characterIndex].position = pos;
    }
    var time = Date.now()+Helper.GetTimeDelay(pingTime);
    
    var rtData = RTSession.newData()
    .setString      (1, playerID) 
    .setNumber      (2, genID)
    .setFloatArray  (3, pos)
    .setFloat       (4, damageMultiple)
    .setDouble      (5,  time);
    RTSession.newPacket().setData(rtData).setOpCode(CHARACTER_ATTACK).setReliable(true).send();
    
    // battle history
    var data = [playerID,genID,pos,damageMultiple,maxHealth,currentHealth,time];
    var battleStep = {
        "packetType":CHARACTER_ATTACK,
        "data":Helper.ArrayToJSON(data)
    };
    battleHistory.push(battleStep);
});

// card damage
RTSession.onPacket(CHARACTER_DAMAGE, function(packet){
    var genID = packet.getData().getNumber(1);
    var damage = packet.getData().getNumber(2);
    var isPoison = packet.getData().getNumber(3);
    var pos = packet.getData().getFloatArray(4);
   // RTSession.getLogger().debug("card  damage");
    var rtData = RTSession.newData()
        .setNumber(1,  genID) //character id1
        .setNumber(2,  damage) 
        .setNumber(3, isPoison)
        .setFloatArray(4, pos);
    RTSession.newPacket().setData(rtData).setOpCode(CHARACTER_DAMAGE).setReliable(true).send();
    
    //battle history
    var data = [genID,damage,isPoison,pos];
    var battleStep = {
        "packetType":CHARACTER_DAMAGE,
        "data":Helper.ArrayToJSON(data)
    };
    battleHistory.push(battleStep);
    
    if(genID<=200){
        var towerIndex = Helper.GetTowerIndex(genID, listTower);
        if(listTower[towerIndex].currentHealth>0){
            listTower[towerIndex].currentHealth -= damage;
        }
        //RTSession.getLogger().debug("damage tower");
        if(listTower[towerIndex].currentHealth<=0 && !isDie){
            isDie = true;
           CalculateCrown();
        }
    }
    else{
        var index = Helper.GetCharacterIndex(genID, listCharacter);
        if(index==-1) return;
        listCharacter[index].currentHealth -= damage;
        if(listCharacter[index].currentHealth<=0){
            listCharacter.splice(index, 1);
        }
    }      
});
function CalculateCrown(){
    var crown0 = listTower[0].currentHealth/listTower[0].maxHealth;
    if(crown0<=star3) crown0=3;
    else if(crown0>star3 && crown0<=star2) crown0 = 2;
    else if(crown0>star2 && crown0<=star1) crown0 = 1;
    else crown0 = 0;
        
    var crown1 = listTower[1].currentHealth/listTower[1].maxHealth;
    if(crown1<=star3) crown1=3;
    else if(crown1>star3 && crown1<=star2) crown1 = 2;
    else if(crown1>star2 && crown1<=star1) crown1 = 1;
    else crown1 = 0;
    
    var data = [crown1+":"+crown0,""];
    var battleStep = {
        "packetType":GAME_END,
        "data":Helper.ArrayToJSON(data)
    };
    //RTSession.getLogger().debug("end game");
    battleHistory.push(battleStep);
    var history = JSON.stringify(battleHistory);
    Helper.GetResult(history, listTower[0].userID, listTower[1].userID, crown1+":"+crown0,EndGame);
}

function EndGame(response,data){
    var data2 = JSON.stringify(response);
    var rtData2 = RTSession.newData()
    .setString(1, data)
    .setString(2, data2);
    RTSession.newPacket().setData(rtData2).setOpCode(GAME_END).setReliable(true).send();
    RTSession.clearTimeout(matchEndTimeOut);
    RTSession.clearInterval(everySecond);
}
// summon
RTSession.onPacket(CHARACTER_SUMMON, function(packet){
    currentGenerateUnitID+=100;
    var genID =  packet.getData().getNumber(1);
    var id = packet.getData().getNumber(2);
    var level = packet.getData().getNumber(3);
    var pos =  packet.getData().getFloatArray(4);
    var maxHealth = packet.getData().getNumber(5);
    var time =Date.now()+ Helper.GetTimeDelay(pingTime);
    var userID = packet.getSender().getPlayerId();
    
    var rtData = RTSession.newData()
    .setNumber      (1,  genID)
    .setNumber      (2,  currentGenerateUnitID)
    .setNumber      (3,  id)
    .setNumber      (4,  level)
    .setFloatArray  (5,  pos);
        
    RTSession.newPacket().setData(rtData).setOpCode(CHARACTER_SUMMON).setReliable(true).send();
    var currentGenID = currentGenerateUnitID;
    var character = {
            "id" : id,
            "genID": currentGenID,
            "level" : level,
            "maxHealth":maxHealth,
            "currentHealth" : maxHealth,
            "position":pos,
            "userID":userID
    };
    listCharacter.push(character);
    // history
    var data = [genID,id,level,pos,time];
    var battleStep = {
        "packetType":CHARACTER_SUMMON,
        "data":Helper.ArrayToJSON(data)
    };
    battleHistory.push(battleStep);
});
// sync time
RTSession.onPacket(CHARACTER_SKILL, function(packet){ // receive character skill
   
});

RTSession.onPacket(IN_GAME_MESSAGE, function(packet){ // receive message
    var packID = packet.getData().getNumber(1);
    var emotionID = packet.getData().getNumber(2);
    var target = packet.getSender().getPlayerId();
    var rtData = RTSession.newData()
    .setNumber(1, packID)
    .setNumber(2, emotionID)
    .setString(3, target); 
    RTSession.newPacket().setData(rtData).setOpCode(IN_GAME_MESSAGE).setReliable(true).send();
   
});
RTSession.onPacket(CLIENT_PING, function(packet){
    var timeC = packet.getData().getDouble(1);
    var target = packet.getSender().getPeerId();
    
    var rtData = RTSession.newData()
    .setDouble(1, timeC)
    .setDouble(2, Date.now()); 
    RTSession.newPacket().setData(rtData).setOpCode(CLIENT_PING).setTargetPeers([target]).setReliable(true).send();
    
    var length  = packet.getData().getNumber(2);
    for(var i = 0;i<length;i++ ){
        var genID =     packet.getData().getNumber(i*2+3);
        var pos = packet.getData().getFloatArray(i*2+4);
        var index = Helper.GetCharacterIndex(genID, listCharacter);
        if(index!=-1){
            listCharacter[index].position= pos;
        }
    }
});
var everySecond = RTSession.setInterval(function(){
    var rtData = RTSession.newData().setDouble(1, Date.now());
    if(listTower.length == 2){
        rtData.setNumber(2, 2);
        rtData.setNumber(3, listTower[0].genID);
        rtData.setNumber(4, listTower[0].currentHealth);
        
        rtData.setNumber(5, listTower[1].genID);
        rtData.setNumber(6, listTower[1].currentHealth);
        
        rtData.setNumber(7, listCharacter.length);
        for(var i=0;i<listCharacter.length;i++){
            rtData.setNumber(8+i*6, listCharacter[i].genID);
            rtData.setNumber(9+i*6, listCharacter[i].id);
            rtData.setNumber(10+i*6, listCharacter[i].level);
            rtData.setNumber(11+i*6, listCharacter[i].currentHealth);
            rtData.setFloatArray(12+i*6, listCharacter[i].position);
            rtData.setString(13+i*6, listCharacter[i].userID);
        }
    }
    else{
        rtData.setNumber(2, 0);
    }
    RTSession.newPacket().setOpCode(PING).setData(rtData).setReliable(true).send(); // send the packet to all players
}, 1000);


RTSession.onPacket(PING, function(packet){
   var t = packet.getSender().getPeerId();
   var timeserver = packet.getData().getDouble(1);
   pingTime[t-1] = (Date.now()-timeserver)/2;
});


RTSession.onPlayerConnect(function(player){
    var playerPeerId = player.getPeerId(); // gets sender's peerID
    var playerId = player.getPlayerId(); // gets sender's playerID
    var rtData = RTSession.newData().setString(1,playerId );
    RTSession.newPacket().setOpCode(PLAYER_CONNECT).setData(rtData).setReliable(true).send(); // send the packet to all players
});
RTSession.onPlayerDisconnect(function(player){

    var playerPeerId = player.getPeerId(); // gets sender's peerID
    var playerId = player.getPlayerId(); // gets sender's playerID
    var rtData = RTSession.newData().setString(1,playerId );
    RTSession.newPacket().setOpCode(PLAYER_DISCONNECT).setData(rtData).setReliable(true).send(); // send the packet to all players
});


