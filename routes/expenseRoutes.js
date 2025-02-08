const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// Create a new expense
router.post("/", async (req, res) => {
    try {
        const expense = new Expense(req.body);
        const savedExpense = await expense.save();
        res.status(201).json(savedExpense);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all expenses
router.get("/:id", async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
});

// Update a message
router.put("/:id", async (req, res) => {
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(updatedExpense);
    } catch (error) {
        res.status(400).json({ error: err.message });
    }
});

// Delete an expense
router.delete("/:id", async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense deleted" });
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;