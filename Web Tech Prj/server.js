import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// API route: POST /contact
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, msg: "All fields are required" });
  }

  const entry = {
    name,
    email,
    message,
    date: new Date().toISOString()
  };

  fs.appendFileSync("messages.txt", JSON.stringify(entry) + "\n");

  res.json({ ok: true, msg: "Message saved successfully" });
});

// server run
app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});
