const express = require("express");
const router = express.Router();
const {
    createNewMovement,
    getAllMovementsFromUser,
    getMovementsSpificUserSpecificMonth,
    editMovementById,
    deleteMovementById
} = require('../controllers/movementController');

// Create a new movement
router.post("/createNewMovement", createNewMovement)

// Get all movements from user
router.get("/getAllMovementsFromUser", getAllMovementsFromUser)

// Get all expenses from user for a month and year
router.get("/getMovementsSpificUserSpecificMonth", getMovementsSpificUserSpecificMonth)

// Update an expense by id
router.put("/editMovement/:id", editMovementById)

// Delete an expense by id
router.delete("/deleteMovement/:id", deleteMovementById);

module.exports = router;