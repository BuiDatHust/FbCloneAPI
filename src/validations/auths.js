const Joi = require('joi')

exports.signUpValidate = async (req, res, next) => {
  const data = req.body

  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    phone: Joi.string()
      .regex(/^\d{3}-\d{3}-\d{4}$/)
      .required(),
    birthday: Joi.date().max('1-1-2004').iso(),
  })
  const result = await Joi.valid(data, schema)
  if (!result) {
    res.status(422).json({
      status: 'error',
      message: 'Invalid request data',
      data: data,
    })
  } else {
    res.json({
      status: 'success',
      message: 'User created successfully',
      data: Object.assign({ id }, value),
    })
  }
}
