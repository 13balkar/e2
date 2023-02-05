const services = require('../Services/companyServices');
const HttpErrors = require('../../Errors/HttpErrors');
const saveCompanies = async (req, res) => {
  try {
    let companies = await services.saveCompanies(req.body.urlLink);

    res.status(201).json(companies);
  }
  catch (error) {
    if (error instanceof HttpErrors)
      res.status(error.status).json({ error: error.message });
    else
      res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getCompaniesBySector = async (req, res) => {
  try {
    let companies = await services.getCompaniesBySector(req.query.sector);

    let output = [];
    for (let i = 0; i < companies.length; i++) {
      companies[i].dataValues.rank = i + 1;
      output.push(companies[i]);
    }
    res.status(200).json(output);

  }
  catch (error) {
    if (error instanceof HttpErrors)
      res.status(error.status).json({ error: error.message });
    else
      res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { saveCompanies, getCompaniesBySector };