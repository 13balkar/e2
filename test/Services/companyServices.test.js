const services = require('../../src/Services/companyServices');
const utitlity = require('../../src/Utils/companyUtilities');
const { company } = require('../../database/models');
const HttpError = require('../../errors/HttpErrors');

describe('Company Services', () => {
  describe('Save companies information', () => {
    it('should return an array of companies when url have valid data', async () => {
      jest.spyOn(utitlity, 'fetchDetails').mockResolvedValue('company,sector\nc1,s1');
      jest.spyOn(utitlity, 'convertCsvToJson').mockResolvedValue([{ company: 'c1', sector: 's1' }]);
      jest.spyOn(utitlity, 'getDetailsById').mockResolvedValue([{ company: 'c1', sector: 's1', ceoName: 'ceo1', companyId: 'id1' }]);
      jest.spyOn(utitlity, 'addScore').mockResolvedValue([{ company: 'c1', sector: 's1', ceoName: 'ceo1', companyId: 'id1', score: 1 }]);
      jest.spyOn(company, 'bulkCreate').mockResolvedValue([{ company: 'c1', sector: 's1', ceoName: 'ceo1', companyId: 'id1', score: 1 }]);
      jest.spyOn(company, 'findAll').mockResolvedValue([{ company: 'c1', sector: 's1', ceoName: 'ceo1', companyId: 'id1', score: 1 }]);
      const url = 'https://abc';
      const result = await services.saveCompanies(url);
      expect(result).toEqual([{ company: 'c1', sector: 's1', ceoName: 'ceo1', companyId: 'id1', score: 1 }]);
    });
    it('should throw error when url have no data', async () => {
      jest.spyOn(utitlity, 'fetchDetails').mockResolvedValue('');
      jest.spyOn(utitlity, 'convertCsvToJson').mockResolvedValue([]);
      jest.spyOn(utitlity, 'getDetailsById').mockResolvedValue([]);
      jest.spyOn(utitlity, 'addScore').mockResolvedValue([]);
      jest.spyOn(company, 'bulkCreate').mockResolvedValue([]);
      jest.spyOn(company, 'findAll').mockResolvedValue([]);
      const url = 'https://abc';
      await expect(services.saveCompanies(url)).rejects.toThrow(HttpError);
    });
    it('should throw error when url have data but failed to fetch data by id', async () => {
      jest.spyOn(utitlity, 'fetchDetails').mockResolvedValue('company,sector\nc1,s1');
      jest.spyOn(utitlity, 'convertCsvToJson').mockResolvedValue([{ company: 'c1', sector: 's1' }]);
      jest.spyOn(utitlity, 'getDetailsById').mockResolvedValue([]);
      jest.spyOn(utitlity, 'addScore').mockResolvedValue([]);
      jest.spyOn(company, 'bulkCreate').mockResolvedValue([]);
      jest.spyOn(company, 'findAll').mockResolvedValue([]);
      const url = 'https://abc';
      await expect(services.saveCompanies(url)).rejects.toThrow(HttpError);
    });
    it('should throw error when url have data but failed to add score', async () => {
      jest.spyOn(utitlity, 'fetchDetails').mockResolvedValue('company,sector\nc1,s1');
      jest.spyOn(utitlity, 'convertCsvToJson').mockResolvedValue([{ company: 'c1', sector: 's1' }]);
      jest.spyOn(utitlity, 'getDetailsById').mockResolvedValue([{ company: 'c1', sector: 's1', ceoName: 'ceo1', companyId: 'id1' }]);
      jest.spyOn(utitlity, 'addScore').mockResolvedValue([]);
      jest.spyOn(company, 'bulkCreate').mockResolvedValue([]);
      jest.spyOn(company, 'findAll').mockResolvedValue([]);
      const url = 'https://abc';
      await expect(services.saveCompanies(url)).rejects.toThrow(HttpError);
    });
    it('should throw error when url have data but failed to create companies', async () => {
      jest.spyOn(utitlity, 'fetchDetails').mockResolvedValue('company,sector\nc1,s1');
      jest.spyOn(utitlity, 'convertCsvToJson').mockResolvedValue([{ company: 'c1', sector: 's1' }]);
      jest.spyOn(utitlity, 'getDetailsById').mockResolvedValue([{ company: 'c1', sector: 's1', ceoName: 'ceo1', companyId: 'id1' }]);
      jest.spyOn(utitlity, 'addScore').mockResolvedValue([{ company: 'c1', sector: 's1', ceoName: 'ceo1', companyId: 'id1', score: 1 }]);
      jest.spyOn(company, 'bulkCreate').mockResolvedValue([]);
      jest.spyOn(company, 'findAll').mockResolvedValue([]);
      const url = 'https://abc';
      await expect(services.saveCompanies(url)).rejects.toThrow(HttpError);
    });


  });
  describe('Get companies information by sector', () => {
    it('should return an array of companies when sector is valid', async () => {
      jest.spyOn(company, 'findAll').mockResolvedValue([{ company: 'c1', sector: 's1', ceoName: 'ceo1', companyId: 'id1', score: 1 }]);
      const sector = 's1';
      const result = await services.getCompaniesBySector(sector);
      expect(result).toEqual([{ company: 'c1', sector: 's1', ceoName: 'ceo1', companyId: 'id1', score: 1 }]);
    });
    it('should throw error when sector is invalid', async () => {
      jest.spyOn(company, 'findAll').mockResolvedValue([]);
      const sector = 's1';
      const result = await services.getCompaniesBySector(sector);
      expect(result).toEqual([]);
    });
  });
  describe('Update companies', () => {
    // it('should return the updated company when id is valid', async () => {
    //   jest.spyOn(company, 'update').mockResolvedValue([{ company: 'c1', sector: 's1', ceoName: 'ceo1', companyId: 'id1', score: 1 }]);
    //   jest.spyOn(company, 'findOne').mockResolvedValue([{ company: 'c1', sector: 's1', ceoName: 'ceo1', companyId: 'id1', score: 1 }]);
    //   const id = 'id1';
    //   const result = await services.updateCompany(id, { companyName: 'bhusan' });
    //   expect(result).toEqual([{ company: 'c1', sector: 's1', ceoName: 'ceo1', companyId: 'id1', score: 1 }]);
    // });
    // it('should throw error when id is invalid', async () => {
    //   jest.spyOn(company, 'update').mockResolvedValue([]);
    //   jest.spyOn(company, 'findOne').mockResolvedValue([]);
    //   const id = 'id1';
    //   const result = await services.updateCompany(id, { companyName: 'bhusan' });
    //   expect(result).rejects.toThrow(HttpError);
    // });
  });
});