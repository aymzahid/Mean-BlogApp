const express = require("express");
const router = express.Router();
const mongoType = require("mongoose").Types;
const { ObjectId } = require("mongodb");

const Post = require("./Models/post");

//Define Routes Here

router.get("/", async (req, resp) => {
  try {
    let result = await Post.find({});
    resp.send(result);
  } catch (error) {
    console.log("Error Fetching the Data" + error);
    resp.status(400).send("Internal Error" + error);
  }
});

//Create New Post

router.post("/", async (req, resp) => {
  let post = new Post({
    title: req.body.title,
    content: req.body.content,
    username: req.body.username,
  });

  // console.log("Post", post);
  try {
    let result = await post.save();
    console.log("result", result);
    resp.send(result);
  } catch (error) {
    // console.log("Internal Error " + error);
    resp.status(400).send("Internal Error" + error);
  }
});

//Find By Id

router.get("/:id", async (req, resp) => {
  console.log(req.params.id);
  if (mongoType.ObjectId.isValid(req.params.id)) {
    try {
      let result = await Post.findById(req.params.id);
      resp.send(result);
    } catch (error) {
      console.log("Internal Error " + error);

      resp.status(400).send("Internal Error" + error);
    }
  } else {
    resp.status(400).send("No Record Found By This Id -->" + req.params.id);
  }
});

//Delete By Id

router.delete("/:id", async (req, resp) => {
  if (mongoType.ObjectId.isValid(req.params.id)) {
    try {
      let result = await Post.findByIdAndDelete(req.params.id);
      resp.send(result);
    } catch (error) {
      console.log("Internal Error " + error);

      resp.status(400).send("Internal Error" + error);
    }
  } else {
    resp.status(400).send("No Record Found By This Id" + req.params.id);
  }
});

//Update By Id

router.put("/:id", async (req, resp) => {
  let post = {
    title: req.body.title,
    content: req.body.content,
    username: req.body.username,
  };

  console.log(post);

  if (mongoType.ObjectId.isValid(req.params.id)) {
    const {id,name} = req.body;
    try {
      let result = await Post.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: post }
      );

      resp.send(result);
    } catch (err) {
      console.log("Internal Error " + err);

      resp.status(400).send("Internal Error" + err);
    }
  } else {
    resp.status(400).send("No Record Found By This Id" + req.params.id);
  }
});

module.exports = router;
