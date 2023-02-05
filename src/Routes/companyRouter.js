const { saveCompanies } = require('../Controllers/companyController');
const { validateUrl } = require('../Middlewares/company.validator');
const express = require('express');
const router = express.Router();

router.post('/save', validateUrl, saveCompanies);

module.exports = router;