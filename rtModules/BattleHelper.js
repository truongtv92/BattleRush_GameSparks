module.exports.GetTimeDelay = function (pingTime) {
    var maxTime =  pingTime[0]>pingTime[1]?pingTime[0]:pingTime[1];
    var time = Math.ceil(maxTime/1000)*1000;
    return time;
}

module.exports.GetRangeCharacterIndex = function (genID,listCharacter) {
   var result = [];
   if(genID%100==0){
       result.push(this.GetCharacterIndex(genID, listCharacter));
   }
   else{
       
   }
   return result;
}

module.exports.GetCharacterIndex = function (genID,listCharacter) {
   for(var i =0;i<listCharacter.length;i++){
       if(listCharacter[i].genID==genID){
           return i;
       }
   }
   
   return -1;
}

module.exports.GetTowerIndex= function (genID,listTower) {
   for(var i =0;i<listTower.length;i++){
       if(listTower[i].genID==genID){
           return i;
       }
   }
   return -1;
}
module.exports.ArrayToJSON= function (data) {
   var jsonObj = {};
   for (var i = 0; i < data.length; i++){
       jsonObj[i] = data[i];
   }
   
   return jsonObj;
}
module.exports.GetResult= function (data,homeID,visitorID,result,func) {
    var request = RTSession.newRequest().createLogEventRequest()
    .setEventKey("GetBattleResult");
    request.setdata(data);
    request.sethomeID(homeID);
    request.setvisitorID(visitorID);
    request.setscore(result);
    request.setPlayerId(homeID);
    request.send(function(response){
            if(func!=null && func!=undefined){
                func(response.scriptData,result);
            }
           // return response.scriptData;
    });
    
}
