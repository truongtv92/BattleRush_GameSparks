require("UserHelper");
if(Spark.getData().newPlayer === true) {
    CreateUser();
}
else{
    GetUser();
};
//var userAsset = Spark.getPlayer().getScriptData("userAssets")
//var currentTrophies = userAsset.trophies;

requireOnce("ArenaHelper");
var response = GetAllArena();
Spark.setScriptData("arena", response);
/*   doan nay la tinh toan arena roi tra ve chinh xac arena hien co
if(response.length>1){
    for(var i =0;i<response.length-1;i++){
        if(currentTrophies>=response[i].trophies && currentTrophies<response[i+1].trophies){
            Spark.setScriptData("arena", response[i]);
            break;
        }
        if(i==response.length-2 && currentTrophies>=response[i+1].trophies){
            Spark.setScriptData("arena", response[i+1]);
        }
    }
}
else if(response.length==1){
    Spark.setScriptData("arena", response[0]);
}
*/


