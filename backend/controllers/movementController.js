const Movement = require("../models/Movements");
const { default: mongoose } = require("mongoose");


// Create a new movement
const createNewMovement = async (req, res) => {
    try {
        const { userId, description, amount, category, type, dMonth } = req.body;

        if (!userId || !description || !amount || !category || !type || !dMonth) {
            console.log(req.body);
            return res.status(400).json({ error: "Missing required fields" });
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid userId" });
        }

        const newMovement = new Movement({
            userId, description, amount, category, type, dMonth
        });

        if (!newMovement) {
            return res.status(400).json({ error: "Invalid movement data" });
        }

        const savedNewMovement = await newMovement.save();
        res.status(201).json(savedNewMovement);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// Get all movements from user
const getAllMovementsFromUser = async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid userId" });
        }

        const movements = await Movement.find({ userId: userId }).sort({ createdAt: -1 });
        if (!movements) {
            return res.status(404).json({ error: "Movements not found!" });
        }

        res.json(movements);
    } catch (error) {
        res.status(400).json({ error: err.message });
    }
}

// Get all expenses from user for a month and year
const getMovementsSpificUserSpecificMonth = async (req, res) => {
    try {

        const { userId, dMonth, dYear } = req.query;

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid userId" });
        }

        const month = parseInt(dMonth);
        if (!month || month < 1 || month > 12) {
            return res.status(400).json({ error: "Invalid month" });
        }

        const year = parseInt(dYear);
        if (!year) {
            return res.status(400).json({ error: "Invalid year" });
        }

        const movements = await Movement.find({ "userId": userId, "dMonth": dMonth, "dYear": dYear });

        res.json(movements);
    } catch (error) {
        res.status(400).json({ error: err.message });
    }
}

// Update an expense by id
const editMovementById = async (req, res) => {
    try {
        const updateFields = req.body;
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid movemnt id!" });
        }
        const updatedMovement = await Movement.findByIdAndUpdate(_id = id,
            { $set: updateFields },
            { new: true, runValidators: true });
        res.json(updatedMovement);

        if (!updatedMovement) {
            return res.status(404).json({ error: "Movement not found!" });
        }
    } catch (error) {
        res.status(400).json({ error: err.message });
    }
}

// Delete an expense by id
const deleteMovementById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid movemnt id!" });
        }
        await Movement.findByIdAndDelete(id);
        res.json({ message: "Movement deleted" });
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    createNewMovement,
    getAllMovementsFromUser,
    getMovementsSpificUserSpecificMonth,
    editMovementById,
    deleteMovementById
}