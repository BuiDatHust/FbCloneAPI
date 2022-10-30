const axios = require("axios");
const FormData = require("form-data");
const settings = require("../configs/settings");

const singleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file.buffer, file.originalname);
    const result = await axios.post(settings.imageUploaderEndpoint, formData, {
      headers: {
        ...formData.getHeaders(),
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });
    return result.data.data.url.src;
}

const singleVideoUpload = async (file) => {
  const formData = new FormData();
  formData.append('file', file.buffer, file.originalname);
  const result = await axios.post(settings.videoUploaderEndpoint, formData, {
    headers: {
      ...formData.getHeaders(),
    },
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  });
  return result.data.data.url.src;
}

const singleFileUpload = async (file, path) => {
  const formData = new FormData();
  formData.append('file', file.buffer, file.originalname);
  const endpoint = path ? `${settings.fileUploaderEndpoint}?path=${path}` : settings.fileUploaderEndpoint;
  const result = await axios.post(endpoint,
    formData,
    {
      headers: {
        ...formData.getHeaders(),
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });
  return result.data.data;
}

module.exports = {
  singleImageUpload,
  singleVideoUpload,
  singleFileUpload
}