const controller = require('../../src/Controllers/companyController');
const services = require('../../src/Services/companyServices');

describe('Company Controller', () => {
  describe('Store information about companies', () => {
    it('should store the companies infromation when url have a valid data', async () => {
      const mockReq = { body: { urlLink: 'https://abc' } };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      jest.spyOn(services, 'saveCompanies').mockResolvedValue([{ name: 'Company 1' }, { name: 'Company 2' }]);
      await controller.saveCompanies(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.status().json).toBeCalledWith([{ name: 'Company 1' }, { name: 'Company 2' }]);
    });
    it('should return an empty array when url have no data or invalid data', async () => {
      const mockReq = { body: { urlLink: 'https://abc' } };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      jest.spyOn(services, 'saveCompanies').mockResolvedValue([]);
      await controller.saveCompanies(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.status().json).toBeCalledWith([]);
    });
    it('should return intetnal server error when services throw an error', async () => {
      const mockReq = { body: { urlLink: 'https://abc' } };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      jest.spyOn(services, 'saveCompanies').mockRejectedValue(new Error('Internal Server Error'));
      await controller.saveCompanies(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.status().json).toBeCalledWith({ message: 'Internal Server Error' });
    });
  });
});