const Registration = require("../models/Registration");

// Controller function for registering a user
exports.registerUser = async (req, res) => {
  const { name, country, studentId, about } = req.body;

  try {
    const registration = new Registration({
      name,
      country,
      studentId,
      about,
    });

    await registration.save();
    console.log(
      `Received registration: Name=${name}, Country=${country}, Student ID=${studentId}, About=${about}`
    );
    res.json({ message: "Registration successful!" });
  } catch (error) {
    console.error("Error saving registration:", error);
    res.status(500).json({ message: "Registration failed!" });
  }
};
