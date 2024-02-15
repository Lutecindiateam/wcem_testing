// export const generatePublicUrl = (fileName) => {
//   return `http://192.168.29.211:8080/public/${fileName}`;

//   // return `${process.env.REACT_APP_API_HOST}/public/${fileName}`;
// };

import { Storage } from 'aws-amplify';

export const generatePublicUrl = async (key) => {
  const url = await Storage.get(key, { validateObjectExistence: true })
  window.open(url, "_blank");
  return url;
};