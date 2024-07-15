const fs = require("fs");

const getAllRecipes = (req, res) => {
  try {
    const stringVideos = fs.readFileSync("./data/Recipe.json", "utf-8");
    const jsonVideos = JSON.parse(stringVideos);

    const result = jsonVideos.reduce((vidarr, video) => {
      vidarr.push({
        id: video.id,
        title: video.title,
        name: video.name,
        image: video.image,
      });
      return vidarr;
    }, []);

    res.send(result);
  } catch (error) {
    console.log("Error not getting recipe data", error);
    res.status(500).send("Error not getting recipe data");
  }
};

const getRecipeById = (req, res) => {
  try {
    const stringVideos = fs.readFileSync("./data/Recipe.json", "utf-8");
    const jsonVideos = JSON.parse(stringVideos);

    const foundVideo = jsonVideos.find(
      (video) => video.id === req.params.recipeId
    );

    foundVideo ? res.send(foundVideo) : res.status(404).send("No recipe found");
  } catch (error) {
    console.log("Error not getting recipe details data", error);
    res.status(500).send("Error not getting recipe details data");
  }
};

module.exports = {
  getAllRecipes,
  getRecipeById,
};
