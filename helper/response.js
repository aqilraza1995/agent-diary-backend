import httpStatus from "http-status";

const generateJsonResponse = (response, statusCode, message) => {
  const responseData = response || [];
  return {
    data: responseData,
    statusCode,
    responseMessage: message,
  };
};

export default generateJsonResponse;
