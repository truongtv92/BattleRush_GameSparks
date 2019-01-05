require("APIHelper");

function GetAllArena(){
    var url = GetArenaServiceURL();
    var response = Spark.getHttp(url+"all").get();
    return response.getResponseJson();
}