requireOnce("UserAssestHelper");
var coin = Spark.getData().coin;
var gem = Spark.getData().gem;
var result = IncreaseCurrency(coin, gem);
if(result){
    var userAssets = Spark.getPlayer().getScriptData("userAssets");
    Spark.setScriptData("coin", userAssets.coins);
    Spark.setScriptData("gem", userAssets.gem);
}
else{
    Spark.setScriptError(-2, "currency not enough");
}