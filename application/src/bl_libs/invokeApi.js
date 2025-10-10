// common business logic related util methods
import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";

export async function invokeApi({
  path,
  method = "GET",
  headers = {},
  queryParams = {},
  postData = {},
}) {
  const reqObj = {
    method,
    url: "" + path,
    headers,
  };

  reqObj.params = queryParams;

  if (method === "POST") {
    reqObj.data = postData;
  }
  if (method === "PUT") {
    reqObj.data = postData;
  }
  if (method === "DELETE") {
    reqObj.data = postData;
  }

  let results;
  if (postData instanceof FormData) {
    console.info(...postData, "<===REQUEST-DATA===>");
  }
  console.info("<===REQUEST-OBJECT===>", reqObj);

  try {
    results = await axios(reqObj);
    console.info("<===Api-Success-Result===>", results);

    return results.data;
  } catch (error) {
    console.info("<===Api-Error===>", error.response.data);

    if (error.response.status === 401) {
      localStorage.clear();
    }
    return {
      code: error.response.status,
      message: error.response.data.message ? error.response.data.message : "",
    };
  }
}
