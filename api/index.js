import express from "express";
import { MongoClient } from "mongodb";
import assert from "assert";
import config from "../config";

let mdb;
MongoClient.connect(
  config.mongodbUri,
  (err, db) => {
    assert.equal(null, err);

    mdb = db;
  }
);

const router = express.Router();

router.get("/forms", (req, res) => {
  let forms = {};
  mdb
    .collection("forms")
    .find({})
    .each((err, form) => {
      assert.equal(null, err);
      if (!form) {
        res.send({ forms });
        return;
      }
      forms[form.id] = form;
    });
});

router.get("/forms/:Id", (req, res) => {
  mdb
    .collection("forms")
    .findOne({ id: Number(req.params.Id) })
    .then(form => res.send(form))
    .catch(console.error);
});

router.get("/submissions", (req, res) => {
  let submissions = {};
  mdb
    .collection("submissions")
    .find({})
    .each((err, submission) => {
      assert.equal(null, err);
      if (!submission) {
        res.send({ submissions });
        return;
      }
      submissions[submission.id] = submission;
    });
});

router.get("/submissions/:Id", (req, res) => {
  mdb
    .collection("submissions")
    .findOne({ id: Number(req.params.Id) })
    .then(submission => res.send(submission))
    .catch(console.error);
});

router.post("/newform", (req, res) => {
  const name = req.body.name;
  const fields = req.body.fields;
  mdb
    .collection("forms")
    .count()
    .then(id => {
      mdb.collection("forms").insert({
        id: id + 1,
        Name: name,
        Submissions: 0,
        fields: fields
      });
      mdb.collection("submissions").insert({
        id: id + 1,
        Name: name,
        Submissions: []
      });
    })
    .catch(console.error);
});
router.post("/newSubmission", (req, res) => {
  const id = req.body.id;
  const fields = req.body.fields;
  mdb
    .collection("forms")
    .findOne({ id: id })
    .then(resp => {
      resp.Submissions = resp.Submissions + 1;

      mdb.collection("forms").updateOne({ id: id }, resp);
    });

  mdb
    .collection("submissions")
    .findOne({ id: id })
    .then(resp => {
      resp.Submissions.push(fields);

      mdb.collection("submissions").updateOne({ id: id }, resp);
    });
});

export default router;
