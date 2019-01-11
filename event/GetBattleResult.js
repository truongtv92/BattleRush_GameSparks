var battleData = Spark.getData().data;
var homeID = Spark.getData().homeID;
var visitorID = Spark.getData().visitorID;
var battleResult = Spark.getData().score;

var APIHomeID = Spark.loadPlayer(homeID).getScriptData("user").id;
var APIvisitorID = Spark.loadPlayer(visitorID).getScriptData("user").id;
require("BattleResultHelper");
var response = GetBattleResult(battleData, APIHomeID, APIvisitorID, battleResult);
Spark.setScriptData("result", response);
// UpdateUserAsset(homeID,APIHomeID);
// UpdateUserAsset(visitorID,APIvisitorID);

// update data user

var homeUser = Spark.loadPlayer(homeID);
var visitorUser = Spark.loadPlayer(visitorID);
var homeAssest = homeUser.getScriptData("userAssets");
var visitorAssest = visitorUser.getScriptData("userAssets");

if(battleResult=="0:0"||battleResult=="1:1"||battleResult=="2:2"){ // hoa
    drawData = response.battleDraw;
    var draw1 = drawData.homeDraw;
    var draw2 = drawData.visitorDraw;
    homeAssest.draws = drawData.homeDraw;
    visitorAssest.draws = drawData.visitorDraw;
    var crown = battleResult.split(':');
     homeAssest.crowns +=crown[0];
     visitorAssest.crowns += crown[0];
}
else{ // co thang co thua
    
    
    winData = response.battleWin;
    loseData =response.battleLose;
    var crown = battleResult.split(':');
    var loserCrown = 0;
    if(crown[0]==winData.crowns){
            loserCrown = crown[1];
    }
    else{
        loserCrown = crown[0];
    }
    if(winData.userId ==APIHomeID ){ // home is winner
        homeAssest.coins+=winData.coins;
        homeAssest.exp +=winData.exp;
        homeAssest.trophies +=winData.trophies;
        homeAssest.highestTrophies += winData.highestTrophies;
        homeAssest.crowns += winData.crowns;
        homeAssest.threeCrownWins += winData.threeCrownWins;
        homeAssest.wins += winData.wins;
        if(winData.chest!=null){
            var homeChest =  homeUser.getScriptData("chests");
            homeChest.push(winData.chest);
            homeUser.setScriptData("chests",homeChest);
        }
        
        visitorAssest.loses +=loseData.loses;
        visitorAssest.trophies -=loseData.trophies;
        visitorAssest.crowns +=loserCrown;
        if(visitorAssest.trophies<0){
            visitorAssest.trophies =0;
        }
    }
    else{
        visitorAssest.coins+=winData.coins;
        visitorAssest.exp +=winData.exp;
        visitorAssest.trophies +=winData.trophies;
        visitorAssest.highestTrophies += winData.highestTrophies;
        visitorAssest.crowns += winData.crowns;
        visitorAssest.threeCrownWins += winData.threeCrownWins;
        visitorAssest.wins += winData.wins;
        if(winData.chest!=null){
            var visitorChest =  homeUser.getScriptData("chests");
            visitorChest.push(winData.chest);
            visitorUser.setScriptData("chests",visitorChest);
        }
        homeAssest.loses +=loseData.loses;
        homeAssest.trophies -=loseData.trophies;
        homeAssest.crowns +=loserCrown;
        if(homeAssest.trophies<0){
            homeAssest.trophies =0;
        }
    }
    
}
homeUser.setScriptData("userAssets", homeAssest);
visitorUser.setScriptData("userAssets", visitorAssest);
