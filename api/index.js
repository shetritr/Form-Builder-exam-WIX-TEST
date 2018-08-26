import express from "express";
import { MongoClient } from "mongodb";
import assert from "assert";
import config from "../config";

let mdb;
MongoClient.connect(
  config.mongodbUri,
  (err, db) => {
    assert.equal(null, err); ////temp need to del

    mdb = db;
  }
);

const router = express.Router();

router.get("/contests", (req, res) => {
  let contests = {};
  mdb
    .collection("contests")
    .find({})
    .each((err, contest) => {
      assert.equal(null, err);
      if (!contest) {
        res.send({ contests });
        return;
      }
      contests[contest.id] = contest;
    });
});

router.get("/contests/:Id", (req, res) => {
  mdb
    .collection("contests")
    .findOne({ id: Number(req.params.Id) })
    .then(contest => res.send(contest))
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
    .collection("contests")
    .count()
    .then(id => {
      mdb.collection("contests").insert({
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
    });
});
router.post("/newSubmission", (req, res) => {
  const id = req.body.id;
  const fields = req.body.fields;
  mdb
    .collection("submissions")
    .findOne({ id: id })
    .then(resp => {
      resp.Submissions.push(fields);

      mdb.collection("submissions").updateOne({ id: id }, resp);
    });
});

export default router;
