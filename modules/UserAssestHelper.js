//var USER_ASSETS_SERVICE = "http://br-gateway-service.jx-staging.35.242.252.39.nip.io/br-user-assets-service/";
require("APIHelper");
function UpdateCurrency(coin,gem){
   var userAssets = Spark.getPlayer().getScriptData("userAssets");
   userAssets.coins = coin;
   userAssets.gem = gem;
   Spark.getPlayer().setScriptData("userAssets", userAssets);
}
function IncreaseCurrency(coin,gem){
   var userAssets = Spark.getPlayer().getScriptData("userAssets");
   if(userAssets.coins+coin<0||userAssets.gem + gem<0) return false;
   userAssets.coins += coin;
   userAssets.gem += gem;
   Spark.getPlayer().setScriptData("userAssets", userAssets);
   return true;
}
function UpdateEnergy(value){
    var userAssets = Spark.getPlayer().getScriptData("userAssets");
    userAssets.energy = value;
    Spark.getPlayer().setScriptData("userAssets", userAssets);
}
function UpdateLevel(level,exp){
    var userAssets = Spark.getPlayer().getScriptData("userAssets");
    userAssets.level = level;
    userAssets.exp = exp;
    Spark.getPlayer().setScriptData("userAssets", userAssets);
}
function AddmoreEXP(exp){
    var userAssets = Spark.getPlayer().getScriptData("userAssets");
    userAssets.exp += exp;
    Spark.getPlayer().setScriptData("userAssets", userAssets);
}
function UpdateMaxMapLevel(mapID){
    var userAssets = Spark.getPlayer().getScriptData("userAssets");
    if(mapID==userAssets.mapLevel){
    userAssets.mapLevel ++;
        
    }
    Spark.getPlayer().setScriptData("userAssets", userAssets);
}
function GetUserAsset(){
    return  Spark.getPlayer().getScriptData("userAssets");
    
}
function IncreaseCrown(value){
    var userAssets = Spark.getPlayer().getScriptData("userAssets");
    userAssets.crowns += value;
    if(userAssets.crowns>10) userAssets.crowns = 10;
    Spark.getPlayer().setScriptData("userAssets", userAssets);
}
function SaveUserAssest(){
    var userData = Spark.getPlayer().getScriptData("userAssets");
    var userBaseData = Spark.getPlayer().getScriptData("baseUserAssets");
    
    if(userData!=userBaseData){
        var url = GetUserAssetsServiceURL();
        //Spark.getLog().debug(userData);
        var response = Spark.getHttp(url).putJson(userData);
        if(response.getResponseCode()!=200){
            Spark.getLog().error(response.getResponseJson());
        }
        // if(response.getResponseJson().message!="OK"){
        //     Spark.getLog().error(response.getResponseJson().message);
        // }
         
    }
    
}