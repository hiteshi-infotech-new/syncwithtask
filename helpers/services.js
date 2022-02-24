const fs = require("fs");
const http = require("http");
const path = require("path");
const { google } = require("googleapis");
const { dashboardTemplate } = require("../templates/dashboard");
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, GET_FIELDS } = require("../config");

// CONFIGRATIONS
///////////////////////////////////////
//// CONSTANT -> DON'T CHANGE ANYTHING IN THIS FILE ////
///////////////////////////////////////
const SCOPES = ["https://www.googleapis.com/auth/contacts.readonly"];
const TOKEN_PATH = "token.json";
const listingConfig = {
  resourceName: "people/me",
  pageSize: 10,
  personFields: GET_FIELDS,
};

async function onGetCode(res, code, callback) {
  return new Promise((resolve, reject) => {
    try {
      const oAuth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
      );
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error("Error retrieving access token", err);
        oAuth2Client.setCredentials(token);
        callback(oAuth2Client).then((data) => {
          if (data) {
            var html = dashboardTemplate(data);
            res.send(html);
          } else {
            res.send("Failed!");
          }
        });
      });
    } catch (error) {
      res.end("error");
    }
  });
}

async function getAuthURL() {
  return new Promise((resolve, reject) => {
    try {
      const oAuth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
      );
      const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
      });
      if (authUrl) {
        return resolve(authUrl);
      }
    } catch (error) {
      resolve(null);
    }
  });
}

async function listConnectionNames(auth) {
  return new Promise((resolve, reject) => {
    const service = google.people({ version: "v1", auth });
    service.people.connections.list(listingConfig, (err, res) => {
      if (err) return console.error("The API returned an error: " + err);
      const connections = res.data.connections;
      if (connections) {
        let contactsData = [];
        connections.forEach((person, index) => {
          contactsData.push({
            sn : index + 1,
            name: person.names[0].displayName,
            email: person.emailAddresses[0].value,
            phone: person.phoneNumbers[0].canonicalForm,
          });
        });
        console.log(contactsData);
        fs.writeFileSync(
          path.resolve("./uploads/mycontacts.json"),
          JSON.stringify(contactsData),
          { flag: "w" }
        );
        resolve(contactsData);
      } else {
        console.log("No connections found.");
        resolve(null);
      }
    });
  });
}

module.exports = {
  listConnectionNames,
  getAuthURL,
  onGetCode,
};
