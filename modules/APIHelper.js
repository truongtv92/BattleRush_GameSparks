var BASE_SERVICE            = "http://br-gateway-service.jx-production.35.234.74.252.nip.io/";
var COMPOSITE_SERVICE       = "br-chest-system-composite/user/";
var USER_SERVICE            = "br-user-service/";
var USER_ASSETS_SERVICE     = "br-user-assets-service/";
var CHEST_DEFAULT_SERVICE   = "br-chest-default-service/";
var CHEST_SERVICE           = "br-chest-service/";
var BATTLE_DECK_SERVICE     = "br-battle-deck-service/";
var BATTLE_HISTORY_SERVICE  = "br-battle-history-service/";
var BATTLE_RESULT_SERVICE   = "br-chest-system-composite/result-battle/";
var ARENA_SERVICE           = "br-arena-service/";
var UPDATE_CHEST_SERVICE    = "br-chest-system-composite/chest/";
var CAMPAIGN_CHEST          = "br-chest-system-composite/result-battle-campaign";

function GetBattleDeckServiceURL(){
    return BASE_SERVICE+BATTLE_DECK_SERVICE;   
}
function GetUserServiceURL(){
    return BASE_SERVICE+ USER_SERVICE;
}
function GetUserAssetsServiceURL(){
    return BASE_SERVICE+USER_ASSETS_SERVICE;
}
function GetCompositeServiceURL(){
    return BASE_SERVICE+COMPOSITE_SERVICE;
}
function GetChestDefaultServiceURL(){
    return BASE_SERVICE+CHEST_DEFAULT_SERVICE;   
}
function GetChestServiceURL(){
    return BASE_SERVICE+ CHEST_SERVICE;
}
function GetBattleHistoryServiceURL(){
    return BASE_SERVICE+BATTLE_HISTORY_SERVICE;
}
function GetBattleResultServiceURL(){
    return BASE_SERVICE+BATTLE_RESULT_SERVICE;
}
function GetArenaServiceURL(){
    return BASE_SERVICE+ARENA_SERVICE;
}
function GetUpdateChestServiceURL(){
    return BASE_SERVICE + UPDATE_CHEST_SERVICE;
}
function GetCampaignChestServiceURL(){
    return BASE_SERVICE + CAMPAIGN_CHEST;
}
