const Volunteer = require('../models/Volunteer');
const { generateSummary } = require('../utils/summaryGenerator');

const createVolunteer = async (req, res, next) => {
  try {
    const { fullName, email, city, skills, availability, motivation } = req.body;

    if (!fullName || !email || !city || !skills || !availability || !motivation) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const summary = generateSummary(motivation, 'Volunteer Application');

    const volunteer = await Volunteer.create({
      fullName,
      email,
      city,
      skills,
      availability,
      motivation,
      summary,
    });

    res.status(201).json({
      success: true,
      message: 'Volunteer registration submitted successfully',
      data: volunteer,
    });
  } catch (error) {
    next(error);
  }
};

const getVolunteers = async (req, res, next) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: volunteers.length,
      data: volunteers,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createVolunteer, getVolunteers };
