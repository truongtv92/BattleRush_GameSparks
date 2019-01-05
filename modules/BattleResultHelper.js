require("APIHelper");
function GetBattleResult (data,homeID,visitorID,result){
    var url = GetBattleResultServiceURL();
    var obj ={
        "battleTurn":data,
        "homeId":homeID,
        "score":result,
        "visitorId":visitorID
    }
    var response = Spark.getHttp(url).postJson(obj);
        if(response.getResponseCode()!=200){
            Spark.getLog().error(response.getResponseJson());
        }
        
    return response.getResponseJson();
}

function UpdateUserAsset(gameSparkid,APIid){
    Spark.getLog().debug(gameSparkid +"    "+APIid);
    var url = GetUserAssetsServiceURL()+"user-id?user-id="+APIid;
    Spark.getLog().debug(url);
    var responses = Spark.getHttp(url).get();
    Spark.getLog().debug( responses.getResponseJson());
    Spark.loadPlayer(gameSparkid).setScriptData("userAssets", responses.getResponseJson());
    
}