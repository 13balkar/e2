const utitlity = require('../../src/Utils/companyUtilities');
const axios = require('axios');
describe('companyUtilities', () => {
  describe('fetchDetails', () => {
    it('should fetch details from the given url when it have details', () => {
      const url = 'http://abc.com';
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: 'data' }));
      const result = utitlity.fetchDetails(url);
      expect(result).resolves.toEqual('data');
    });
    it('should throw error when url is not valid', () => {
      const url = 'http://abc.com';
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error('error')));
      const result = utitlity.fetchDetails(url);
      expect(result).rejects.toThrow('error');
    });
  });
  describe('convertCsvToJson', () => {
    it('should convert csv to json', async () => {
      const csv = 'company_id,sector\n1,abc\n2,def';
      const result = await utitlity.convertCsvToJson(csv);
      expect(result).toEqual([{ companyId: '1', sector: 'abc' }, { companyId: '2', sector: 'def' }]);
    });
    it('should return an empty array when csv have only headings', async () => {
      const csv = 'company_id,sector';
      const result = await utitlity.convertCsvToJson(csv);
      expect(result).toEqual([]);
    });
  });
  describe('getDetailsById', () => {
    it('should return details of the given company id', async () => {
      const details = [{ companyId: '1', sector: 'abc' }, { companyId: '2', sector: 'def' }];
      jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({ json: () => Promise.resolve({ name: 'abc', ceo: 'def' }) }));
      const result = await utitlity.getDetailsById(details);
      expect(result).toEqual([{ companyId: '1', companyName: 'abc', ceoName: 'def', sector: 'abc' }, { companyId: '2', companyName: 'abc', ceoName: 'def', sector: 'def' }]);
    });
    it('should return empty array when url is not valid', async () => {
      const details = [{ companyId: '1', sector: 'abc' }, { companyId: '2', sector: 'def' }];
      jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({ json: () => Promise.resolve({}) }));
      const result = await utitlity.getDetailsById(details);
      expect(result).toEqual([]);
    });
  });
  describe('addScore', () => {
    it('should add score to the given details', async () => {
      const details = [{ companyId: '1', companyName: 'abc', ceoName: 'def', sector: 'abc' }];
      jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({ json: () => Promise.resolve([{ companyId: '1', performanceIndex: [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }] }]) }));
      const result = await utitlity.addScore(details);
      expect(result).toEqual([{ companyId: '1', companyName: 'abc', ceoName: 'def', sector: 'abc', score: '11.000' }]);
    });
    it('should not call the api when details is already available', async () => {
      const details = [{ companyId: '1', companyName: 'abc', ceoName: 'def', sector: 'abc' }, { companyId: '1', companyName: 'abc', ceoName: 'def', sector: 'abc' }];
      const result = await utitlity.addScore(details);
      expect(result).toEqual([{ companyId: '1', companyName: 'abc', ceoName: 'def', sector: 'abc', score: '11.000' }, { companyId: '1', companyName: 'abc', ceoName: 'def', sector: 'abc', score: '11.000' }]);
    });
  });
});