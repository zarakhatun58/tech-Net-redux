const express = require("express");
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
// mongoose.connect("mongodb://localhost:27017/mydatabase", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const uri =
  "mongodb+srv://product:4QBUIIVYOXoVUnIX@atlascluster.j0plgij.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    await client.connect();
    const database = client.db("TechNet");
    const productsCollection = database.collection("products");
    //console.log("hit the data base");
    // const doc = { name: "saha", age: "45", phone: "779879" };
    // const result = await productsCollection.insertOne(doc);
    // console.log(`insert success ${result.insertedId}`);

    app.post("/products", async (req, res) => {
      console.log("hit post");
      res.send("hit post");
    });
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

// Define routes and middleware as needed
app.get("/", (req, res) => {
  res.send("Running my crud operation");
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
