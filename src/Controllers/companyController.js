const services = require('../Services/companyServices');
const HttpErrors = require('../../Errors/HttpErrors');
const saveCompanies = async (req, res) => {
  try {
    const companies = await services.saveCompanies(req.body.urlLink);
    res.status(200).json(companies);
  }
  catch (error) {
    if (error instanceof HttpErrors)
      res.status(error.status).json({ error: error.message });
    else
      res.status(500).json({ message: 'Internal Server Error' });
  }
};



module.exports = { saveCompanies };