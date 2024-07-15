const express = require("express");
const { getAllExercises, getExerciseById } = require("../controller/exerciseController");
const  { getAllRecipes, getRecipeById } = require("../controller/recipeController");

const router = express.Router();

router.get("/exercise", getAllExercises);
router.get("/exercise/:exerciseId", getExerciseById);
router.get("/recipe", getAllRecipes);
router.get("/recipe/:recipeId", getRecipeById);

module.exports = router;
