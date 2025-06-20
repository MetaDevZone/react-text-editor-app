import { invokeApi } from "../bl_libs/invokeApi";

export const CheckAccessDataApi = async (apiKey) => {
  const requestObj = {
    path: `http://192.168.1.72:8080/api/validatekey/${apiKey}`,
    method: "GET",
    headers: {
      // "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};
