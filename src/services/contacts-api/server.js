
import express from "express";
import cors from "cors";
import { JSONFilePreset } from "lowdb/node";

const app = express();
const PORT = process.env.PORT || 3000;

const db = await JSONFilePreset("db.json", {
  countacts: [],
  groups: [],
});

app.use(cors());
app.use(express.json());

// Get all contacts
app.get("/countacts", (req, res) => {
  res.json(db.data.countacts);
});

// Get one contact
app.get("/countacts/:id", (req, res) => {
  const contact = db.data.countacts.find(
    (item) => String(item.id) === req.params.id
  );

  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }

  res.json(contact);
});

// Create contact
app.post("/countacts", async (req, res) => {
  const newContact = {
    ...req.body,
    id: String(Date.now()),
  };

  await db.update(({ countacts }) => countacts.push(newContact));

  res.status(201).json(newContact);
});

// Update contact
app.put("/countacts/:id", async (req, res) => {
  const index = db.data.countacts.findIndex(
    (item) => String(item.id) === req.params.id
  );

  if (index === -1) {
    return res.status(404).json({ message: "Contact not found" });
  }

  const updatedContact = {
    ...db.data.countacts[index],
    ...req.body,
    id: db.data.countacts[index].id,
  };

  await db.update(({ countacts }) => {
    countacts[index] = updatedContact;
  });

  res.json(updatedContact);
});

// Delete contact
app.delete("/countacts/:id", async (req, res) => {
  const index = db.data.countacts.findIndex(
    (item) => String(item.id) === req.params.id
  );

  if (index === -1) {
    return res.status(404).json({ message: "Contact not found" });
  }

  await db.update(({ countacts }) => countacts.splice(index, 1));

  res.status(200).json({ message: "Contact deleted" });
});

// Get groups
app.get("/groups", (req, res) => {
  res.json(db.data.groups);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API running on port ${PORT}`);
});
