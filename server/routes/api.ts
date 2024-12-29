import express from "express"

export const router = express.Router();

router.get("/api", async (req, res) => {
  try {
  } catch (err) {
    console.error(err);
  }
});

router.get("/api/:id", async (req, res) => {
  let id;
  id = req.params.id;
});

router.post("/api", async (req, res) => {

})
