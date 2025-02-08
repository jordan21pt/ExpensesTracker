const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    description: { type: String, require: true },
    amount: { type: Number, require: true },
    category: { type: String, require: true },
    date: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Expense", expenseSchema);