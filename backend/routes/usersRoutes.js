const express = require("express");
const router = express.Router();
const {
    createNewUser,
    getAllUsers,
    getAllCategoriesFromUser,
    createNewCategoryForMovements,
    deleteCategoryFromMovements
} = require('../controllers/userController');


// Create a new user
router.post("/createNewUser", createNewUser)

// Get all users
// I need to dont show the password
router.get("/getAllUsers", getAllUsers)

// Falta apagar o user e dar update nas infos do user... fazer mais tarde...

// ----------------- Arrays of CATEGORIES ----------------- //
router.get("/getAllCategories/:id", getAllCategoriesFromUser)

// Create a new category for expenses/income array
router.post("/addMovementCategory", createNewCategoryForMovements)

router.delete("/deleteCategory", deleteCategoryFromMovements)

module.exports = router;