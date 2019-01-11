require("APIHelper");
var status = Spark.getData().chestStatus;
var chestid =  Spark.getData().id;
var url = GetUpdateChestServiceURL();
Spark.setScriptData("status", status);
switch(status){
    case "WAIT":
        url += chestid+"/wait/";
        break;
    case "OPEN":
        url += chestid+"/open/";
        break;
}
var response = Spark.getHttp(url).putJson({});
if(response.getResponseCode()!=200){
    Spark.getLog().error("http error code = "+response.getResponseCode()+"  info: "+response.getResponseJson());
    Spark.getLog().error(response.getResponseJson());
}
var data = response.getResponseJson();
if(status=="OPEN"){
    require("UserAssestHelper");
    require("BattleDeckHelper");
    require("ChestHelper");
    var coin = data.coins;
    var gem = data.gems;
    var t = IncreaseCurrency(coin,gem);
    var cards = JSON.parse(data.cards);
    for(var i =0;i<cards.length;i++){
        UpdateCard(cards[i].id, cards[i].number);
    }
    var chest = GetChestByID(chestid);
    
     Spark.setScriptData("chest", chest);
     //check chest crown thi tru crown, new khong con chestcrown thi ve 0
     if(chest!=null){
        if(chest.chestLocation=="CHEST_CROWN"){
         UpdateTimeCrown(data.timeCrownDailyActive);
         if(data.chests==2){
             IncreaseCrown(-10);
         }
         else if(data.chests==1){
             IncreaseCrown(-100);
         }
        }
         
     }
      Spark.setScriptData("data", data);
      
      RemoveChest(chestid);
}
else if(status=="WAIT"){
    Spark.setScriptData("chest", data);
}

