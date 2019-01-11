var userID = Spark.getData().userID;
var mapID = Spark.getData().mapID;
var crown = Spark.getData().crown;
require("APIHelper");
var url = GetCampaignChestServiceURL()+"?user-id="+userID;
var data = Spark.getHttp(url).get();
var response = data.getResponseJson();
Spark.setScriptData("chest", response);
require("UserAssestHelper");
require("ChestHelper");
AddChest(response.chest);
AddmoreEXP(response.exp);
if(GetAllVictoryChest().length>0){
    IncreaseCrown(crown);
}
else{
    IncreaseCrown(-100);
}
IncreaseCurrency(response.coins,0);
UpdateMaxMapLevel(mapID);