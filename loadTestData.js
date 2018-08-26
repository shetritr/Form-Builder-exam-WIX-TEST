import { MongoClient } from "mongodb";
import assert from "assert";
import config from "./config";

MongoClient.connect(
  config.mongodbUri,
  (err, db) => {
    assert.equal(null, err);

    db.collection("contests")
      .insertMany([])
      .then(() => {
        db.close();
      });
    db.collection("submissions").insert([]);
  }
);
