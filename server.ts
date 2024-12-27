import express from 'express';

const port = 3000;

const app = express();

// todo: query db data as an accessible resource thorugh /api interface
app.get("/api", (req, res) => {
  res.send({ some: "json" });

});

// todo: handle POST request, store data into database

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});
