var cardID = Spark.getData().cardID;
var currentLevel = Spark.getData().currentLevel;
var number = Spark.getData().number;
var coin = Spark.getData().coin;
var gem = Spark.getData().gem;
var userAssets = Spark.getPlayer().getScriptData("userAssets");
var battleDeck = Spark.getPlayer().getScriptData("battleDeck");
require("BattleDeckHelper");
requireOnce("UserAssestHelper");
requireOnce("ERROR_CODE");
if(userAssets.coins<coin){
    Spark.setScriptError(COIN_NOT_ENOUGH, "TxtCardUpgradeCoinTitleVisitShop");
    
}
else if(userAssets.gem < gem){
    Spark.setScriptError(GEM_NOT_ENOUGH, "TxtShopGemPurchaseFailDescription");
   
}
else if(!IsCardExist(cardID)){
    Spark.setScriptError(CARD_NOT_FOUND, "");
    
}
else if(GetCardNumber(cardID)<number){
     Spark.setScriptError(NUMBER_CARD_NOT_ENOUGH, "");
}
else if(GetCardLevel(cardID)<currentLevel){
    Spark.setScriptError(CARD_LEVEL_NOT_CORRECT, "");
}
else{
    var result = IncreaseCurrency(-coin, -gem);
    UpGradeCard(cardID, currentLevel, number);
    var userAssets = Spark.getPlayer().getScriptData("userAssets");
    Spark.setScriptData("coin", userAssets.coins);
    Spark.setScriptData("gem", userAssets.gem);
    Spark.setScriptData("id", cardID);
    Spark.setScriptData("level", GetCardLevel(cardID));
    Spark.setScriptData("number", GetCardNumber(cardID));
}

