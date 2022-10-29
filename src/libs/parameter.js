const permitParameter = (body, parameter) => {
  Object.keys(body).forEach((keyParam) => {
    if(!parameter.includes(keyParam)) delete body[keyParam]
  })
  return body
}

module.exports = permitParameter
