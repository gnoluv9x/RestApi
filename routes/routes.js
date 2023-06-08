const express = require("express");
const Model = require("../models/model");
const router = express.Router();
const { ObjectId } = require("mongodb");
const uuidv4 = require("uuidv4").uuid;

//Post Method
router.post("/post", async (req, res) => {
  const data = new Model({
    title: req.body.title,
    content: req.body.content,
    createdAt: Date.now(),
    id: uuidv4(),
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json({ status: 200, result: "Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all Method
router.get("/getAll", async (req, res) => {
  try {
    const data = await Model.find();
    const page = req.query?.page;
    const limit = req.query?.limit;

    let responseData = data.map(item => ({ title: item.title, id: item._id.toString() }));

    if (!!page && !!limit) {
      const startItem = (parseInt(page) - 1) * parseInt(limit);
      const endItem = startItem + parseInt(limit);

      responseData = responseData.slice(startItem, endItem);
    }
    res.json(responseData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method
router.get("/getOne/:id", async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Model.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete by ID Method
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.remove({ _id: new ObjectId(id) });
    console.log("Debug_here data: ", data);
    res.json({ message: `Delete successfully...`, status: 200 });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
