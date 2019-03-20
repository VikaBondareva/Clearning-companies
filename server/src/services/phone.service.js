const conig = require("../config/environment");
var client = require("twilio")(
  conig.twillio.accountSID,
  conig.twillio.authToken
);

module.exports.sendMessage = (message, toPhone) => {
  client.messages.create(
    {
      to: toPhone,
      from: conig.twillio.phoneFrom,
      body: message
    },
    function(err, data) {
      if (err) console.log(err);
      console.log(data);
    }
  );
};
