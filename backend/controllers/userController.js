const Users = require("../models/Users");
const { default: mongoose } = require("mongoose");

// Create a new user
const createNewUser = async (req, res) => {
    try {
        const user = new Users(req.body);
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// Get all users
// I need to dont show the password
const getAllUsers = async (req, res) => {
    try {
        const users = await Users.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}

// Falta apagar o user e dar update nas infos do user... fazer mais tarde...


// ----------------- Arrays of CATEGORIES ----------------- //
const getAllCategoriesFromUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Verifica se o ID do usuário é válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid userId" });
        }

        // Busca o usuário pelo ID
        const user = await Users.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({
            expenses: user.listOfExpensesCategories,
            incomes: user.listOfIncomeCategories
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Create a new category for expenses/income array
const createNewCategoryForMovements = async (req, res) => {
    const { id, type, categoryName } = req.body;

    try {
        // Verifica se o ID do usuário é válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid userId" });
        }

        // Determina o campo correto a ser atualizado
        let fieldToUpdate;
        if (type === "expense") {
            fieldToUpdate = "listOfExpensesCategories";
        } else if (type === "income") {
            fieldToUpdate = "listOfIncomeCategories";
        } else {
            return res.status(400).json({ error: "Invalid type, must be 'expense' or 'income'" });
        }

        // Busca o usuário pelo ID
        const user = await Users.findById(id, '-password -email -username');
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Verifica se a categoria já existe
        if (user[fieldToUpdate].includes(categoryName)) {
            return res.status(400).json({ error: "Category already exists!" });
        }

        // Atualiza o usuário, adicionando a nova categoria
        const update = {};
        update[fieldToUpdate] = categoryName; // Define o campo dinamicamente

        const updatedUser = await Users.findByIdAndUpdate(
            id,
            { $push: update },
            { new: true } // Retorna o usuário atualizado
        ).select("-password -email -username");;

        res.status(200).json({ message: "Category added successfully!", user: updatedUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const deleteCategoryFromMovements = async (req, res) => {
    try {
        const { id, type, categoryName } = req.body;

        // Verifica se o ID do usuário é válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid userId" });
        }

        const user = await Users.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        let fieldToUpdate;
        if (type === "expense") {
            fieldToUpdate = "listOfExpensesCategories";
        } else if (type === "income") {
            fieldToUpdate = "listOfIncomeCategories";
        } else {
            return res.status(400).json({ error: "Invalid type, must be 'expense' or 'income'" });
        }

        if (!user[fieldToUpdate] || !user[fieldToUpdate].includes(categoryName)) {
            return res.status(400).json({ message: "Categoria não existe no campo especificado." });
        }

        // Atualiza o usuário removendo a categoria
        const updatedUser = await Users.findByIdAndUpdate(
            id,
            { $pull: { [fieldToUpdate]: categoryName } },
            { new: true }
        );

        res.status(200).json({ message: "Category deleted successfully!", user: updatedUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    createNewUser,
    getAllUsers,
    getAllCategoriesFromUser,
    createNewCategoryForMovements,
    deleteCategoryFromMovements
}