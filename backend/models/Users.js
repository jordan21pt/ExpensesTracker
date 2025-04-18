const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({ 
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }, // ver o bcrypt...
    listOfExpensesCategories: { type: [String], required: true, default: [] },
    listOfIncomeCategories: { type: [String], required: true, default: [] }
}, { collection: 'users', timestamps: false });

module.exports = mongoose.model( "Users", usersSchema );