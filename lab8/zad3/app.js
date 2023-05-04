const express = require("express");
const redis = require("redis");
const { Pool } = require("pg");

const app = express();
const client = redis.createClient({ host: "redis" });
const pool = new Pool({
  host: "postgres",
  port: 5432,
  user: "postgres",
  password: "password",
  database: "mydatabase",
});

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

app.post("/user", (req, res) => {
  const { username, email } = req.body;
  pool.query(`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
  );`);
  pool.query(
    "INSERT INTO users (username, email) VALUES ($1, $2)",
    [username, email],
    (err, result) => {
      if (err) {
        console.error("Error inserting user into PostgreSQL:", err);
        return res.status(500).json({ error: "Failed to create user" });
      }

      client.hset("users", username, email, (redisErr, redisResult) => {
        if (redisErr) {
          console.error("Error inserting user into Redis:", redisErr);
          return res.status(500).json({ error: "Failed to create user" });
        }

        return res.status(201).json({ message: "User created successfully" });
      });
    }
  );
});

const port = 3000;
app.listen(port, () => {
  console.log(`Serwer Express nasłuchuje na porcie ${port}`);
});
