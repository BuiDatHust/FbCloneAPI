const NoData = {
    code: 8,
    message: 'No data available',
};
  
const InternalError = {
    code: 131,
    message: 'Internal error',
};

const BadAuthentication = {
    code: 215,
    message: 'Bad authentication data',
};

const Unauthorized = {
    code: 403,
    message: 'Not authorize to access this route',
};

module.exports = {
    NoData,
    InternalError,
    BadAuthentication,
    Unauthorized
}