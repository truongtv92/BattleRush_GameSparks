var name  = Spark.getData().displayName;
require("UserHelper");
UpdateUserDisplayName(name);
var request = new SparkRequests.ChangeUserDetailsRequest();
            request.displayName =name;
            var response = request.Send();