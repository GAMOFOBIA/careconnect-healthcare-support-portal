const Patient = require('../models/Patient');
const { generateSummary } = require('../utils/summaryGenerator');

const createPatient = async (req, res, next) => {
  try {
    const { fullName, age, city, phoneNumber, supportType, description } = req.body;

    if (!fullName || !age || !city || !phoneNumber || !supportType || !description) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const summary = generateSummary(description, supportType);

    const patient = await Patient.create({
      fullName,
      age,
      city,
      phoneNumber,
      supportType,
      description,
      summary,
    });

    res.status(201).json({
      success: true,
      message: 'Support request submitted successfully',
      data: patient,
    });
  } catch (error) {
    next(error);
  }
};

const getPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: patients.length,
      data: patients,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createPatient, getPatients };
