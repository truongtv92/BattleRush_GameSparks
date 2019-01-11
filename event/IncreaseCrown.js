var crown = Spark.getData().value;
require("UserAssestHelper");
require("ChestHelper");
if(GetAllVictoryChest().length>0){
    IncreaseCrown(crown);
}
else{
    IncreaseCrown(-100);
}