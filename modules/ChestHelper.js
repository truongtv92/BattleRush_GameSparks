require("APIHelper");

function GetChestByID(id){
    var chests =Spark.getPlayer().getScriptData("chests");
    for(var i =0;i<chests.length;i++){
        if(chests[i].id==id) return chests[i];
    }
    return null;
}
function UpdateChest(chest){
    var chests =Spark.getPlayer().getScriptData("chests");
    for(var i =0;i<chests.length;i++){
        if(chests[i].id==chest.id) {
            chests[i] = chest;
            Spark.getPlayer().setScriptData("chests",chests);
            return;
        }
    }
    chests.push(chest);
    Spark.getPlayer().setScriptData("chests",chests);
}
function RemoveChest(id){
    var chests =Spark.getPlayer().getScriptData("chests");
    for(var i =0;i<chests.length;i++){
        if(chests[i].id==id) {
            chests.splice(i+1, 1);
            return;
        }
    }
}
function GetAllChest(){
    var chests =Spark.getPlayer().getScriptData("chests");
    return chests;
}
function GetAllVictoryChest(){
    var result = [];
    var chests =Spark.getPlayer().getScriptData("chests");
    for(var i =0;i<chests.length;i++){
        if(chests[i].chestLocation=="CHEST_CROWN"){
            result.push(chests[i]);
        }
    }
    return result;
}
function AddChest(chest){
    var chests =Spark.getPlayer().getScriptData("chests");
    if(chest!=null){
        chests.push(chest);
    }
    Spark.getPlayer().setScriptData("chests",chests);
}
