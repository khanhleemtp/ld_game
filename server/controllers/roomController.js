const Game = require("../models/Game");

const handleError = err => {
  // duplicate error code
  if (err.code === 11000) {
    return "That room name is already registered";
  }
  // validation errors
  if (err.message) {
    return err.message;
  }
};

module.exports.get_rooms = async (req, res) => {
  try {
    const games = await Game.find({});
    res.status(200).json(games);
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json(errors);
  }
};

module.exports.create_room = async (req, res) => {
  const { name, maxPerson, maxWolf } = req.body;
  try {
    const room = await Room.create({ name, maxPerson, maxWolf });
    res.status(201).json({ room });
  } catch (err) {
    console.log(err.code);
    const errors = handleError(err);
    res.status(400).json(errors);
  }
};
