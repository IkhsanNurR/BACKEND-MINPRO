const messageHelper = (result, status: number, message: string) => {
  return {
    result: result,
    status: status,
    message: message,
  };
};

export default messageHelper;
