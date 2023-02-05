const middleware = require('../../src/Middlewares/company.validator');

describe('Company Validator', () => {
  describe('Validate url', () => {
    it('should return an error when url is not valid', () => {
      const mockReq = { body: { urlLink: 'abc' } };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const mockNext = jest.fn();
      middleware.validateUrl(mockReq, mockRes, mockNext);
      expect(mockRes.status).toBeCalledWith(400);
      expect(mockRes.status().json).toBeCalledWith({ error: '"urlLink" must be a valid uri' });
      expect(mockNext).not.toBeCalled();
    });
    it('should call next when url is valid', () => {
      const mockReq = { body: { urlLink: 'https://abc' } };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const mockNext = jest.fn();
      middleware.validateUrl(mockReq, mockRes, mockNext);
      expect(mockRes.status).not.toBeCalled();
      expect(mockRes.status().json).not.toBeCalled();
      expect(mockNext).toBeCalled();
    });
    it('should return an error when url is not provided', () => {
      const mockReq = { body: {} };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const mockNext = jest.fn();
      middleware.validateUrl(mockReq, mockRes, mockNext);
      expect(mockRes.status).toBeCalledWith(400);
      expect(mockRes.status().json).toBeCalledWith({ error: '"urlLink" is required' });
      expect(mockNext).not.toBeCalled();
    });
  });
  describe('validate sector', () => {
    it('should return an error when sector is not provided', () => {
      const mockReq = { query: {} };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const mockNext = jest.fn();
      middleware.validateSector(mockReq, mockRes, mockNext);
      expect(mockRes.status).toBeCalledWith(400);
      expect(mockRes.status().json).toBeCalledWith({ error: '"sector" is required' });
      expect(mockNext).not.toBeCalled();
    });
    it('should return an error when sector is not string', () => {
      const mockReq = { query: { sector: 123 } };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const mockNext = jest.fn();
      middleware.validateSector(mockReq, mockRes, mockNext);
      expect(mockRes.status).toBeCalledWith(400);
      expect(mockRes.status().json).toBeCalledWith({ error: '"sector" must be a string' });
      expect(mockNext).not.toBeCalled();
    });
    it('should call next when sector is valid', () => {
      const mockReq = { query: { sector: 'abc' } };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const mockNext = jest.fn();
      middleware.validateSector(mockReq, mockRes, mockNext);
      expect(mockRes.status).not.toBeCalled();
      expect(mockRes.status().json).not.toBeCalled();
      expect(mockNext).toBeCalled();
    });
  });
  describe('validate company', () => {
    it('should call next when company name and ceo name are valid', () => {
      const mockReq = { body: { companyName: 'abc' } };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const mockNext = jest.fn();
      middleware.validateCompany(mockReq, mockRes, mockNext);
      expect(mockRes.status).not.toBeCalled();
      expect(mockRes.status().json).not.toBeCalled();
      expect(mockNext).toBeCalled();
    });

  });

});