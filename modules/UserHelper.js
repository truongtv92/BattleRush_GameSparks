require("APIHelper");
function CreateUser(){
    var userID = Spark.getData().userId;
    var data = {
        "sparkId": userID,
        "displayName": "",
        "username": "",
        "dob": "",
        "avatar": "",
        "gender": "Male",
        "email": "",
        "facebookId": "",
        "socialId": []
    };
    var url = GetCompositeServiceURL();
    var response = Spark.getHttp(url).postJson(data);
    ResponseUserData(response);
}
function GetUser(){
    var userData =Spark.getPlayer().getScriptData("user");
    var url = GetCompositeServiceURL()+"spark-id?spark-id="+Spark.getData().userId;
     var response = Spark.getHttp(url).get();
     ResponseUserData(response);
}
function ResponseUserData(response){
    var statusCode = response.getResponseCode();
    
    if(statusCode==200){
        var responsejson = response.getResponseJson();
        var user = responsejson.user;
        var userAssets = responsejson.userAssets;
        var battleDeck = responsejson.battleDeck;
        var chest = responsejson.chests;
       
        battleDeck.characterFound = JSON.parse(battleDeck.characterFound);
        battleDeck.deck = JSON.parse(battleDeck.deck);
        
        Spark.getPlayer().setScriptData("user", user);
        Spark.getPlayer().setScriptData("userAssets", userAssets);
        
        Spark.getPlayer().setScriptData("battleDeck", battleDeck);
        Spark.getPlayer().setScriptData("chests", chest);
        
        Spark.getPlayer().setScriptData("baseUser", user);
        Spark.getPlayer().setScriptData("baseUserAssets", userAssets);
        Spark.getPlayer().setScriptData("baseBattleDeck", battleDeck);
        Spark.getPlayer().setScriptData("baseChests", chest);
        
        Spark.setScriptData("user", user);
        Spark.setScriptData("userAssets", userAssets);
        Spark.setScriptData("battleDeck", battleDeck);
        Spark.setScriptData("chests", chest);
        if(Spark.getPlayer().getDisplayName()==null||Spark.getPlayer().getDisplayName()=="" && user.displayName!=""){
            var request = new SparkRequests.ChangeUserDetailsRequest();
            request.displayName =user.displayName;
            var response = request.Send();

        }
        
    }
    else{
        Spark.getLog().debug("statusCode = "+statusCode+"    +response = "+response.getResponseJson());
    }
}
function UpdateUserDisplayName(_displayName){
   var userData =Spark.getPlayer().getScriptData("user");
   userData.displayName = _displayName;
    Spark.getPlayer().setScriptData("user", userData);
}
function UpdateUsername(_username){
    var userData =Spark.getPlayer().getScriptData("user");
    userData.username = _username;
     Spark.getPlayer().setScriptData("user", user);
}
function UpdateDateOfBirth(_dob){
    var userData =Spark.getPlayer().getScriptData("user");
    userData.dob = _dob;
     Spark.getPlayer().setScriptData("user", user);
}
function UpdateAvatar(_avatarUrl){
    var userData =Spark.getPlayer().getScriptData("user");
    userData.avatarUrl = _avatarUrl;
     Spark.getPlayer().setScriptData("user", user);
}
function UpdateGender(_gender){
    var userData =Spark.getPlayer().getScriptData("user");
    userData.displayName = _gender;
     Spark.getPlayer().setScriptData("user", user);
}
function UpdateEmail(_email){
    var userData =Spark.getPlayer().getScriptData("user");
    userData.email = _email;
    Spark.getPlayer().setScriptData("user", user);
}
function UpdateFacebookID(_facebookId){
    var userData =Spark.getPlayer().getScriptData("user");
    userData.facebookId = _facebookId;
    Spark.getPlayer().setScriptData("user", user);
}
function UpdateCountry(){
    var accountDetailsRequest = new SparkRequests.AccountDetailsRequest();
    var response = Spark.sendRequestAs(accountDetailsRequest, Spark.getPlayer().getPlayerId());
    var location = response.location;
     var country =  response.country;
}
function SaveUserInfo(){
    var userData = Spark.getPlayer().getScriptData("user");
    var userBaseData = Spark.getPlayer().getScriptData("baseUser");
    if(userData!=userBaseData){
    
        var url = GetUserServiceURL();
        var response = Spark.getHttp(url).putJson(userData);
        if(response.getResponseCode()!=200){
            Spark.getLog().error(response.getResponseJson());
        }
    }
    else{
       
    }
}
function RemoveStringpattern(input){
    input = input.replace('\\','');
    return input;
}