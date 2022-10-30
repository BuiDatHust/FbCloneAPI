const permitParameter = (body, parameter) => {
  const permitedParam = JSON.parse(JSON.stringify(body));
  Object.keys(permitedParam).forEach((keyParam) => {
    if(!parameter.includes(keyParam)) delete body[keyParam]
  })
  return permitedParam
}

module.exports = permitParameter
