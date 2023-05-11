const express = require("express");
const redis = require("redis");

const app = express();
const client = redis.createClient({ host: "redis" });

app.use(express.json());

app.post("/message", (req, res) => {
  const { message } = req.body;

  client.rpush("messages", message, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Wystąpił błąd serwera Redis" });
      return;
    }

    res.json({ message: "Wiadomość została dodana" });
  });
});

app.get("/message", (req, res) => {
  client.lrange("messages", 0, -1, (err, messages) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Wystąpił błąd serwera Redis" });
      return;
    }

    res.json({ messages });
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Serwer Express nasłuchuje na porcie ${port}`);
});
