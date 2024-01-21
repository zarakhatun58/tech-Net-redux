const express = require("express");
const cors = require("cors");
const mongodb = require("mongodb");
const { MongoClient, ServerApiVersion } = require("mongodb");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@atlascluster.j0plgij.mongodb.net/?retryWrites=true&w=majority`;

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
    const productsCollection = database.collection("product");
    //console.log("hit the data base");
    // const doc = { name: "saha", age: "45", phone: "779879" };
    // const result = await productsCollection.insertOne(doc);
    // console.log(`insert success ${result.insertedId}`);
    app.get("/products", async (req, res) => {
      const cursor = productsCollection.find({});
      const product = await cursor.toArray();
      res.send({ status: true, data: product });
      console.log(product, "product");
    });

    app.post("/product", async (req, res) => {
      const product = req.body;
      const result = await productsCollection.insertOne(product);
      res.send(result);
    });

    app.post("/comment/:id", async (req, res) => {
      try {
        const productId = req.params.id;
        const comment = req.body.comment;
        const result = await productsCollection.updateOne(
          { _id: mongodb.ObjectId(productId) },
          { $push: { comments: comment } }
        );

        if (result.modifiedCount !== 1) {
          console.error("Product not found or comment not added");
          res
            .status(404)
            .json({ error: "Product not found or comment not added" });
          return;
        }

        console.log("Comment added successfully");
        res.status(200).json({ status: "Comment added successfully" });
      } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });
    app.delete("/product/:id", async (req, res) => {
      const id = req.params.id;
      const result = await productsCollection.deleteOne({ _id: ObjectId(id) });
      res.send(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
