// Load 3rd Party Packages
const firebase = require("firebase");
const bodyParser = require("body-parser");
const express = require('express');
const config = require("../firebase-config");

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}