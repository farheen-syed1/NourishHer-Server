const fs = require("fs");

const getAllExercises = (req, res) => {
  try {
    const stringVideos = fs.readFileSync("./data/Exercise.json", "utf-8");
    const jsonVideos = JSON.parse(stringVideos);

    const result = jsonVideos.reduce((vidarr, video) => {
      vidarr.push({
        id: video.id,
        title: video.title,
        channel: video.channel,
        image: video.image,
      });
      return vidarr;
    }, []);

    res.send(result);
  } catch (error) {
    console.log("Error not getting video data", error);
    res.status(500).send("Error not getting video data");
  }
};

const getExerciseById = (req, res) => {
  try {
    const stringVideos = fs.readFileSync("./data/Exercise.json", "utf-8");
    const jsonVideos = JSON.parse(stringVideos);

    const foundVideo = jsonVideos.find(
      (video) => video.id === req.params.exerciseId
    );

    foundVideo ? res.send(foundVideo) : res.status(404).send("No video found");
  } catch (error) {
    console.log("Error not getting video details data", error);
    res.status(500).send("Error not getting video details data");
  }
};

module.exports = {
  getAllExercises,
  getExerciseById,
};
