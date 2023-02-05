const joi = require('joi');

const urlSchema = joi.object({
  urlLink: joi.string().uri().required(),
});

const validateUrl = (req, res, next) => {
  const { error } = urlSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  else
    next();
};



module.exports = { validateUrl };