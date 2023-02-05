const controller = require('../../src/Controllers/companyController');
const services = require('../../src/Services/companyServices');
describe('Company Controller', () => {
  describe('Store information about companies', () => {
    it('should store the companies infromation when url have a valid data', async () => {
      const mockReq = { body: { urlLink: 'https://abc' } };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      jest.spyOn(services, 'saveCompanies').mockResolvedValue([{ name: 'Company 1' }, { name: 'Company 2' }]);
      await controller.saveCompanies(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(201);
      expect(mockRes.status().json).toBeCalledWith([{ name: 'Company 1' }, { name: 'Company 2' }]);
    });
    it('should return an empty array when url have no data or invalid data', async () => {
      const mockReq = { body: { urlLink: 'https://abc' } };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      jest.spyOn(services, 'saveCompanies').mockResolvedValue([]);
      await controller.saveCompanies(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(201);
      expect(mockRes.status().json).toBeCalledWith([]);
    });
    it('should throw intetnal server error when services throw an error', async () => {
      const mockReq = { body: { urlLink: 'https://abc' } };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      jest.spyOn(services, 'saveCompanies').mockRejectedValue(new Error('Internal Server Error'));
      await controller.saveCompanies(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.status().json).toBeCalledWith({ message: 'Internal Server Error' });
    });
  });
  describe('Get companies by sector', () => {
    it('should return companies by sector', async () => {
      const mockReq = { query: { sector: 'abc' } };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const resolvedValue = [{ dataValues: { name: 'Company 1', score: 12 } }, { dataValues: { name: 'Company 2', score: 12 } }];
      jest.spyOn(services, 'getCompaniesBySector').mockResolvedValue(resolvedValue);
      await controller.getCompaniesBySector(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.status().json).toBeCalledWith([{ dataValues: { name: 'Company 1', score: 12, rank: 1 } }, { dataValues: { name: 'Company 2', score: 12, rank: 2 } }]);
    });
    it('should return an empty array when no company found', async () => {
      const mockReq = { query: { sector: 'abc' } };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      jest.spyOn(services, 'getCompaniesBySector').mockResolvedValue([]);
      await controller.getCompaniesBySector(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.status().json).toBeCalledWith([]);
    });
    it('should throw intetnal server error when services throw an error', async () => {
      const mockReq = { query: { sector: 'abc' } };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      jest.spyOn(services, 'getCompaniesBySector').mockRejectedValue(new Error('Internal Server Error'));
      await controller.getCompaniesBySector(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.status().json).toBeCalledWith({ message: 'Internal Server Error' });
    });
  });
  describe('update company', () => {
    it('should update company', async () => {
      const mockReq = { body: { companyName: 'abc' }, params: { id: 'a13s' } };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      jest.spyOn(services, 'updateCompany').mockResolvedValue({ name: 'abc', score: 12 });
      await controller.updateCompany(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.status().json).toBeCalledWith({ name: 'abc', score: 12 });
    });
    it('should throw intetnal server error when services throw an error', async () => {
      const mockReq = { body: { name: 'abc' } };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      jest.spyOn(services, 'updateCompany').mockRejectedValue(new Error('Internal Server Error'));
      await controller.updateCompany(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.status().json).toBeCalledWith({ message: 'Internal Server Error' });
    });

  });
});