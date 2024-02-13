export const generatePublicUrl = (fileName) => {
  return `http://192.168.29.211:8080/public/${fileName}`;

  // return `${process.env.REACT_APP_API_HOST}/public/${fileName}`;
};
