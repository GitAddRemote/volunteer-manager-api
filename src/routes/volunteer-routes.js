// Load 3rd Party Packages
const firebase = require('firebase');
const bodyParser = require('body-parser');
const express = require('express');
const config = require('../firebase-config');

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

/**
 * TODO: Comments
 * @param {} req
 * @param {*} res
 * @param {*} next
 */
const getVolunteers = async (req, res, next) => {
  try {

    // Set reference
    const dbVolunteers = firebase.firestore().collection('volunteers');
    const collection = await dbVolunteers.get();

    const responseObj = {
      list: collection.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
      })
    };
    return res.status(200).send(responseObj);
  } catch (error) {
    return res.status(404).send({ error: 'Unable to retrieve volunteers' });
  }
};

/**
 * TODO: Comments
 * @param {} req
 * @param {*} res
 * @param {*} next
 */
const getVolunteer = async (req, res, next) => {
  try {

    // Set reference
    const dbVolunteers = firebase.firestore().collection('volunteers');
    const volunteerId = req.params.id;
    const volunteer = await dbVolunteers.doc(volunteerId).get();

    const responseObj = {
      id: volunteer.id,
      ...volunteer.data()
    };
    return res.status(200).send(responseObj);
  } catch (error) {
    return res.status(404).send({ error: 'unable to retrieve volunteer' });
  }
};

/**
 * TODO: Comments
 * TODO: Validation of object before set, (validation middleware?)
 * @param {} req
 * @param {*} res
 * @param {*} next
 */
const createVolunteer = async (req, res, next) => {
  try {
    // Set reference
    const dbVolunteers = firebase.firestore().collection('volunteers');
    const volunteer = req.body.volunteer;

    let ref = await dbVolunteers.add(volunteer);
    const addedVolunteer = await dbVolunteers.doc(ref.id).get();

    const responseObj = {
      id: ref.id,
      ...addedVolunteer.data()
    };
    return res.status(201).send(responseObj);
  } catch (error) {
    console.log("ER:", error);
    return res.status(404).send({ error: 'unable to add volunteer' });
  }
};

/**
 * TODO: Comments
 * @param {} req
 * @param {*} res
 * @param {*} next
 */
const updateVolunteer = async (req, res, next) => {
  try {
    // Set reference
    const dbVolunteers = firebase.firestore().collection('volunteers');
    const id = req.params.id;
    const volunteer = req.body.volunteer;

    await dbVolunteers.doc(id).update(volunteer);
    let updatedVolunteer = await dbVolunteers.doc(id).get();

    const responseObj = {
      id: id,
      ...updatedVolunteer.data()
    };
    return res.status(201).send(responseObj);
  } catch (error) {
    return res.status(404).send({ error: 'unable to update volunteer' });
  }
};

/**
 * TODO: Comments
 * @param {} req
 * @param {*} res
 * @param {*} next
 */
const deleteVolunteer = async (req, res, next) => {
  try {
    // Set reference
    const dbVolunteers = firebase.firestore().collection('volunteers');
    const id = req.params.id;

    await dbVolunteers.doc(id).delete();
    return res.sendStatus(204);

  } catch (error) {
    return res.status(404).send({ error: 'unable to delete volunteer' });
  }
};




// Setup Router
const volunteerRouter = express.Router();
const urlEncodedBodyParser = bodyParser.urlencoded({
  extended: true
});

volunteerRouter.route('/')
  .get(getVolunteers)
  .post(bodyParser.json(), createVolunteer);

volunteerRouter.route('/:id')
  .get(getVolunteer)
  .patch(bodyParser.json(), urlEncodedBodyParser, updateVolunteer)
  .delete(deleteVolunteer);

module.exports = volunteerRouter;
