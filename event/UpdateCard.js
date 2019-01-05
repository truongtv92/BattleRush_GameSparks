var id = Spark.getData().id;
var value = Spark.getData().value;
requireOnce("BattleDeckHelper");
UpdateCard(id, value);
var currentValue = GetCardNumber(id);
Spark.setScriptData("id", id);
Spark.setScriptData("number", currentValue);
