const { sendError } = require('../libs/response')

exports.create = async (req,res) => {
    try {
        
    } catch (error) {
        sendError(res, 500, error.message, error)
    }
}

exports.index = (req,res) => {
    try {
        
    } catch (error) {
        sendError(res, 500, error.message, error)
    }
}