var json = Spark.getData().data;
var deckID = Spark.getData().id;
require("BattleDeckHelper");
requireOnce("ERROR_CODE");
var battleDeck = Spark.getPlayer().getScriptData("battleDeck");
var deck = JSON.parse(json);
var isNotFound = false;
for(var i =0;i<deck.length;i++){
    if(!IsCardExist(deck[i].id)){
        isNotFound = true;
        Spark.setScriptError(CARD_NOT_FOUND, "");
        break;
    }
}
if(!isNotFound){
    UpdateBattleDeck(deckID, deck);
    Spark.setScriptData("deck", deck);
}
