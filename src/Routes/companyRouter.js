const { saveCompanies, getCompaniesBySector } = require('../Controllers/companyController');
const { validateUrl, validateSector } = require('../Middlewares/company.validator');
const express = require('express');
const router = express.Router();

router.post('/save', validateUrl, saveCompanies);
router.get('/companies', validateSector, getCompaniesBySector);
module.exports = router;