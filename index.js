const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB!", err));

// Route
app.use("/api/movements", require("./routes/movementsRoutes"));
app.use("/api/users", require("./routes/usersRoutes"));


const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log("Server running on port ${PORT}"));