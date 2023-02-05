const utitlity = require('../Utils/companyUtilities');
const { company } = require('../../database/models');
const HttpError = require('../../errors/HttpErrors');

const saveCompanies = async (url) => {
  const detailsInCsv = await utitlity.fetchDetails(url);
  const detailsInJson = await utitlity.convertCsvToJson(detailsInCsv);
  if (detailsInJson.length === 0) {
    throw new HttpError('No data found', 404);
  }
  let allCompanyDetails = await utitlity.getDetailsById(detailsInJson);
  if (allCompanyDetails.length === 0) {
    throw new HttpError('Failed to fetch data by Id', 404);
  }
  allCompanyDetails = await utitlity.addScore(allCompanyDetails);
  if (allCompanyDetails.length === 0) {
    throw new HttpError('Failed to add score', 404);
  }
  await company.bulkCreate(allCompanyDetails);
  const createdCompanies = await company.findAll({
    attributes: ['companyId', 'companyName', 'ceoName', 'sector', 'score']
  });
  if (createdCompanies.length === 0) {
    throw new HttpError('Failed to create companies', 404);
  }
  return createdCompanies;
};

const getCompaniesBySector = async (Sector) => {
  const companies = await company.findAll({
    where: { sector: Sector }, attributes: ['companyId', 'companyName', 'ceoName', 'sector', 'score'], order: [['score', 'DESC']]
  });
  return companies;
};


module.exports = { saveCompanies, getCompaniesBySector };