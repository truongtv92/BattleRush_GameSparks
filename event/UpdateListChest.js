require("APIHelper");
var APIid = Spark.getPlayer().getScriptData("user").id;
var url = GetChestServiceURL() +"user-id?user-id="+APIid;
var response = Spark.getHttp(url).get();
if(response.getResponseCode()!=200){
    Spark.getLog().error(response.getResponseJson());
}
else{
    Spark.setScriptData("chests", response.getResponseJson());
}