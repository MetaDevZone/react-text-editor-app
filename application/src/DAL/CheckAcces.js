import { invokeApi } from "../bl_libs/invokeApi";

export const CheckAccessDataApi = async (data) => {
  const requestObj = {
    path: `https://reacteditorapi.metadevzone.com/validate`,
    method: "POST",
    postData: data,
  };
  return invokeApi(requestObj);
};
