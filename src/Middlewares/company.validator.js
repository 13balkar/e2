const joi = require('joi');

const urlSchema = joi.object({
  urlLink: joi.string().uri().required(),
});
const sectorSchema = joi.object({
  sector: joi.string().required()
}).required();
const idSchema = joi.object({
  id: joi.string().alphanum().required().regex(/^[0-9]*$/)
}).required();

const companySchema = joi.object({
  companyName: joi.string(),
  ceoName: joi.string()
}).required().min(1);

const validateUrl = (req, res, next) => {
  const { error } = urlSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  else
    next();
};
const validateSector = (req, res, next) => {
  const { error } = sectorSchema.validate(req.query);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  else
    next();
};

const validateCompany = (req, res, next) => {
  const { error1 } = companySchema.validate(req.params);
  if (error1) {
    return res.status(400).json({ error: error1.details[0].message });
  } else {
    const { error2 } = idSchema.validate(req.body);
    if (error2) {
      return res.status(400).json({ error: error1.details[0].message });
    }
    else
      next();
  }
};

module.exports = { validateUrl, validateSector, validateCompany };