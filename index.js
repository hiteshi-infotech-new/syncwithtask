const fs = require("fs");
const url = require("url");
const express = require("express");
const app = express();
const path = require("path");
const { google } = require("googleapis");
const { signinTemplate } = require("./templates/signin");
const {
  onGetCode,
  getAuthURL,
  listConnectionNames,
} = require("./helpers/services");

// APP ROUTES STARTS
///////////////////////////////////////////////////
/////////////// Entry Point ///////////////////////
app.get("/", async (req, res) => {
  return new Promise((resolve, reject) => {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    if (query.code) {
      resolve(onGetCode(res, query.code, listConnectionNames));
    } else {
      getAuthURL().then((url) => {
        if (url) {
          var html = signinTemplate(url);
          resolve(res.send(html));
        } else {
          resolve(res.send("Error fetching url."));
        }
      });
    }
  });
});
///////////////////////////////////////////////////
/////////////// Download Contacts File (*.JSON) /////////////////////
app.get("/download/:file(*)", (req, res) => {
  try {
    var file = req.params.file;
    var fileLocation = path.join("./uploads", file);
    if (fs.existsSync(fileLocation)) {
      res.download(fileLocation, file);
    } else {
      res.write("File not found, Please try with valid file.");
      res.end();
    }
  } catch (error) {
    res.write("File not found, Please try with valid file.");
    res.end();
  }
});

///////////////////////////////////////////////////
/////////////// View Contacts in Browser /////////////////////
app.get("/view/:file(*)", (req, res) => {
  try {
    var file = req.params.file;
    var fileLocation = path.join("./uploads", file);
    if (fs.existsSync(fileLocation)) {
      fs.readFile(fileLocation, (err, content) => {
        res.status(200).send(JSON.parse(content));
      });
    } else {
      res.write("File not found, Please try with valid file.");
      res.end();
    }
  } catch (error) {
    res.write("File not found, Please try with valid file.");
    res.end();
  }
});

// Run the APP on PORT No. 3000
var server = app.listen(3000);
if (server) console.log("Application is running on: ", server.address().port);
