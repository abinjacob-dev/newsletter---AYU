const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function (req, res) {
  const firstName = req.body.fname;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us11.api.mailchimp.com/3.0/lists/9f3b537d45";
  const options = {
    method: "POST",
    auth: "Apikey:6681b841cec4e8a98949e6330dd5b200-us11",
  };
  const request = https.request(url, options, function (response) {
    console.log(response.statusCode)
    if (response.statusCode === 200) {
      
      res.sendFile(__dirname+"/success.html");
    } else {
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
 // request.write(jsonData);
      request.end();
});

app.post("/failure.html",function(req,res){
  res.redirect("/")
})
app.listen(process.env.PORT || 3000, function (response) {
  console.log("server started");
});

// apiKey = 6681b841cec4e8a98949e6330dd5b200-us11
// id = 9f3b537d45
