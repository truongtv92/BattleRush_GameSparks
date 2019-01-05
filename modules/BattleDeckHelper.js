
require("APIHelper");

function UpdateCardCollection(id,level,number){
    
}
function UpGradeCard(id,level,number){
    var battleDeck = Spark.getPlayer().getScriptData("battleDeck");
    for(var i =0;i<battleDeck.characterFound.length;i++){
        if(battleDeck.characterFound[i].id==id){
            battleDeck.characterFound[i].level +=1;
            battleDeck.characterFound[i].number -=number;
        }
    }
    for(var i =0;i<battleDeck.deck.length;i++){
        for(var j = 0;j<battleDeck.deck[i].deck.length;j++){
            if(battleDeck.deck[i].deck[j].id==id){
                battleDeck.deck[i].deck[j].level +=1;
                battleDeck.deck[i].deck[j].number -=number;
            }
        }
    }
    Spark.getPlayer().setScriptData("battleDeck", battleDeck);
}
function UpdateBattleDeck(id,data){
    var battleDeck = Spark.getPlayer().getScriptData("battleDeck");
    battleDeck.deck[id].deck = data;
    Spark.getPlayer().setScriptData("battleDeck", battleDeck);
}
function SaveBattleDeck(){
    var battleDeck = Spark.getPlayer().getScriptData("battleDeck");
   

    var baseBattleDeck = Spark.getPlayer().getScriptData("baseBattleDeck");
    if(battleDeck!=baseBattleDeck){
        var characterFound =battleDeck.characterFound;
        var deck = battleDeck.deck;
        characterFound = JSON.stringify(characterFound);
        deck = JSON.stringify(deck);
        battleDeck.characterFound = characterFound;
        battleDeck.deck = deck;
        var url = GetBattleDeckServiceURL();
        //Spark.getLog().debug(url);
        //Spark.getLog().debug(battleDeck);
        
        var response = Spark.getHttp(url).putJson(battleDeck);
        if(response.getResponseCode()!=200){
            Spark.getLog().error("http error code = "+response.getResponseCode()+"  info: "+response.getResponseJson());
            Spark.getLog().error(response.getResponseJson());
        }
        
        
    }
    
}
function IsCardExist(id){
    var battleDeck = Spark.getPlayer().getScriptData("battleDeck");
    for(var i =0;i<battleDeck.characterFound.length;i++){
        if(battleDeck.characterFound[i].id==id){
            return true;
        }
    }
    return false;
}
function GetCardNumber(id){
    if(IsCardExist(id)){
        var battleDeck = Spark.getPlayer().getScriptData("battleDeck");
        for(var i =0;i<battleDeck.characterFound.length;i++){
            if(battleDeck.characterFound[i].id==id){
                return battleDeck.characterFound[i].number;
            }
        }
    }
    else return -1;
    return  0;
}
function GetCardLevel(id){
    var battleDeck = Spark.getPlayer().getScriptData("battleDeck");
    for(var i =0;i<battleDeck.characterFound.length;i++){
        if(battleDeck.characterFound[i].id==id){
            return battleDeck.characterFound[i].level;
        }
    }
    return  0;
}
function UpdateCard(id,value){
    var battleDeck = Spark.getPlayer().getScriptData("battleDeck");
    if(IsCardExist(id)){
        for(var i =0;i<battleDeck.characterFound.length;i++){
            if(battleDeck.characterFound[i].id==id){
                battleDeck.characterFound[i].number+=value;
            }
        }
        for(var i =0;i<battleDeck.deck.length;i++){
            for(var j = 0;j<battleDeck.deck[i].deck.length;j++){
                if(battleDeck.deck[i].deck[j].id==id){
                    battleDeck.deck[i].deck[j].number +=value;
                }
            }
        }
    }
    else{
        var card={
            "id":id,
            "level":1,
            "number":value
        }
        battleDeck.characterFound.push(card);
    }
    Spark.getPlayer().setScriptData("battleDeck", battleDeck);
}