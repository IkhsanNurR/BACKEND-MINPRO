const messageHelper: any = (status: any, message: any, result?: any) => {
  return {
    result: result,
    message: message,
    status: status,
  };
};
export default messageHelper;