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
const volunteers = async (req, res, next) => {
  try {
    
    // Set reference
    const dbVolunteers = firebase.firestore().collection("volunteers");
    const collection = await dbVolunteers.get();

    const responseObj = {
      list: collection.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
      })
    };
    return res.status(200).send(responseObj);
  } catch (error) {
    return res.status(404).send({ error: "unable to retrieve volunteers" });
  }
};

/**
 * TODO: Comments
 * @param {} req
 * @param {*} res
 * @param {*} next
 */
const volunteer = async (req, res, next) => {
  try {

    // Set reference
    const dbVolunteers = firebase.firestore().collection("volunteers");
    const volunteerId = req.params.id;
    const volunteer = await dbVolunteers.doc(volunteerId).get();

    const responseObj = {
      id: volunteer.id,
      ...volunteer.data()
    };
    return res.status(200).send(responseObj);
  } catch (error) {
    return res.status(404).send({ error: "unable to retrieve volunteer" });
  }
};

/**
 * TODO: Comments
 * TODO: Validation of object before set, (validation middleware?)
 * TODO: Figure out why set doesn't return the updated object
 * @param {} req
 * @param {*} res
 * @param {*} next
 */
const addVolunteer = async (req, res, next) => {
  try {
    // Set reference
    const dbVolunteers = firebase.firestore().collection("volunteers");
    const volunteer = req.body.volunteer;

    // TODO: Why is set returning undefined. Based on docs we should be returning this instead of having to pull updated again
    let addedVolunteer = await dbVolunteers.doc().set(volunteer);
    const responseObj = {
    };
    return res.status(200).send(responseObj);
  } catch (error) {
    return res.status(404).send({ error: "unable to add volunteer" });
  }
};

/**
 * TODO: Comments
 * TODO: Figure out why set doesn't return the updated object per docs
 * @param {} req
 * @param {*} res
 * @param {*} next
 */
const updateVolunteer = async (req, res, next) => {
  try {
    // Set reference
    const dbVolunteers = firebase.firestore().collection("volunteers");
    const id = req.params.id;
    const volunteer = req.body.volunteer;
    // TODO: Why is set returning undefined. We shoudl be returning this instead of having to pull updated again
    let vol = await dbVolunteers.doc(id).update(volunteer);
    let updatedVolunteer = await dbVolunteers.doc(id).get();

    const responseObj = {
      ...updatedVolunteer.data()
    };
    return res.status(200).send(responseObj);
  } catch (error) {
    return res.status(404).send({ error: "unable to update volunteer" });
  }
};

/**
 * TODO: Comments
 * TODO: Figure out why delete doesn't return the deleted object per docs
 * @param {} req
 * @param {*} res
 * @param {*} next
 */
const deleteVolunteer = async (req, res, next) => {
  try {
    // Set reference
    const dbVolunteers = firebase.firestore().collection("volunteers");
    const id = req.params.id;
    // TODO: Why is delete returning undefined. We shoudl be returning this
    let deletedVolunteer = await dbVolunteers.doc(id).delete();
    const responseObj = {
      // ...deletedVolunteer.data() || {}
    };

    return res.status(200).send(responseObj);
  } catch (error) {
    return res.status(404).send({ error: "unable to delete volunteer" });
  }
};




// Setup Router
const volunteerRouter = express.Router();
const urlEncodedBodyParser = bodyParser.urlencoded({
  extended: true
});

volunteerRouter.route("/")
  .get(volunteers)
  .post(bodyParser.json(), addVolunteer);

volunteerRouter.route("/:id")
  .get(volunteer)
  .patch(bodyParser.json(), urlEncodedBodyParser, updateVolunteer)
  .delete(deleteVolunteer);

module.exports = volunteerRouter;
