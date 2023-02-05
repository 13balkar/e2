const { saveCompanies, getCompaniesBySector, updateCompany } = require('../Controllers/companyController');
const { validateUrl, validateSector, validateCompany } = require('../Middlewares/company.validator');
const express = require('express');
const router = express.Router();

router.post('/save', validateUrl, saveCompanies);
router.get('/companies', validateSector, getCompaniesBySector);
router.patch('/companies/:id', validateCompany, updateCompany);
module.exports = router;