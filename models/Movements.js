const mongoose = require("mongoose");

getCurrentYear = () => {
    return new Date().getFullYear();
}

const movementsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true, enum: ["income", "expense"] },
    dMonth: { type: String, required: true, enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
    dYear: { type: String, required: true, default: getCurrentYear() },
}, { collection: 'movements', timestamps: false });

module.exports = mongoose.model("Movements", movementsSchema);