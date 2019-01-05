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
}
else{ // co thang co thua
    winData = response.battleWin;
    loseData =response.battleLose;
    if(winData.userId ==APIHomeID ){ // home is winner
        homeAssest.coins+=winData.coins;
        homeAssest.exp +=winData.exp;
        homeAssest.trophies +=winData.trophies;
        homeAssest.highestTrophies += winData.highestTrophies;
        homeAssest.crowns += winData.crowns;
        homeAssest.threeCrownWins += winData.threeCrownWins;
        homeAssest.wins += winData.wins;
        
        visitorAssest.loses +=loseData.loses;
        visitorAssest.trophies -=loseData.trophies;
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
        
        homeAssest.loses +=loseData.loses;
        homeAssest.trophies -=loseData.trophies;
        if(homeAssest.trophies<0){
            homeAssest.trophies =0;
        }
    }
    
}
homeUser.setScriptData("userAssets", homeAssest);
visitorUser.setScriptData("userAssets", visitorAssest);
