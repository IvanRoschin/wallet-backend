const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();
const checkFolders = require("./helpers");

const { DB_HOST, PORT = 3030 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, async () => {
      await checkFolders.createUploadDir();
      await checkFolders.createAvatarsDir();
      console.log(`Database connection successful. API is on port: ${PORT}`);
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

const client = new MongoClient(DB_HOST);

client.connect(function (err) {
  if (err) {
    console.error("Error connecting to MongoDB:", err);
    return;
  }

  console.log("Connected successfully to the MongoDB server");

  const db = client.db(DB_HOST);
  const collection = db.collection("yourCollectionName");

  // Disable all indexes for the collection
  collection.dropIndexes(function (err, result) {
    if (err) {
      console.error("Error disabling indexes:", err);
      return;
    }

    console.log("Indexes disabled for the collection:", result);
    client.close();
  });
});
