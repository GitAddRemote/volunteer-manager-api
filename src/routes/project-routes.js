// Load 3rd Party Packages
const firebase = require("firebase");
const bodyParser = require("body-parser");
const express = require('express');
const config = require("../firebase-config");

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}


/**
 * TODO: Comments
 * @param {} req
 * @param {*} res
 * @param {*} next
 */
const projects = async (req, res, next) => {
  try {
      console.log("ROUTE: GET projects");
      const responseObj = {};
      return res.status(200).send(responseObj);
  } catch (error) {
    return res.status(404).send({ error: "Unable to retrieve projects" });
  }
};

/**
 * TODO: Comments
 * @param {} req
 * @param {*} res
 * @param {*} next
 */
const project = async (req, res, next) => {
    try {
      console.log("ROUTE: GET project");
      const responseObj = {};
      return res.status(200).send(responseObj);
    } catch (error) {
      return res.status(404).send({ error: "Unable to retrieve projects" });
    }
};

/**
 * TODO: Comments
 * @param {} req
 * @param {*} res
 * @param {*} next
 */
const addProject = async (req, res, next) => {
  try {
    console.log("ROUTE: POST project");
    const responseObj = {};
    res.status(201);
    return res.send(responseObj);
  } catch (error) {
    return res.status(404).send({ error: "Unable to add project" });
  }
};

/**
 * TODO: Comments
 * @param {} req
 * @param {*} res
 * @param {*} next
 */
const updateProject = async (req, res, next) => {
  try {
    console.log("ROUTE: PATCH project");
    const responseObj = {};
    res.status(201);
    return res.send(responseObj);
  } catch (error) {
    return res.status(404).send({ error: "Unable to update project" });
  }
};

/**
 * TODO: Comments
 * @param {} req
 * @param {*} res
 * @param {*} next
 */
const deleteProject = async (req, res, next) => {
  try {
    console.log("ROUTE: PATCH project");
    const responseObj = {};
    res.Status(204);
    return res.send(responseObj);
  } catch (error) {
    return res.status(404).send({ error: "Unable to delete project" });
  }
};


// Setup Router
const projectRouter = express.Router();
const urlEncodedBodyParser = bodyParser.urlencoded({
  extended: true
});

projectRouter.route("/")
  .get(projects)
  .post(bodyParser.json(), addProject);

  projectRouter.route("/:id")
  .get(project)
  .patch(bodyParser.json(), urlEncodedBodyParser, updateProject)
  .delete(deleteProject);

module.exports = projectRouter;
