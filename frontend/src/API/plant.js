import { _Delete, _Get, _Patch, _Post } from "./base";
import Cookies from "js-cookie";

const endpoint = "plants";
let accessToken = Cookies.get("accessToken");

const PagedSearh = (pageIndex, pageSize) => {
  let _options = {
    headers: {
      contentType: "application/json",
      authorization: `bearer ${accessToken}`,
    },
    withCredentials: true,
  };
  return _Get(`${process.env.REACT_APP_API_URL}/${endpoint}/search`, {
    params: {
      pageIndex,
      pageSize,
    },
    ..._options,
  });
};

const Create = (data) => {
  let _options = {
    headers: {
      contentType: "application/json",
      authorization: `bearer ${accessToken}`,
    },
    withCredentials: true,
  };
  return _Post(`${process.env.REACT_APP_API_URL}/${endpoint}`, data, _options);
};

const GetAll = () => {
  let _options = {
    headers: {
      contentType: "application/json",
      authorization: `bearer ${accessToken}`,
    },
    withCredentials: true,
  };
  return _Get(`${process.env.REACT_APP_API_URL}/${endpoint}`, {
    ..._options,
  });
};

const ReadByUuid = (uuid) => {
  let _options = {
    headers: {
      contentType: "application/json",
      authorization: `bearer ${accessToken}`,
    },
    withCredentials: true,
  };
  return _Get(`${process.env.REACT_APP_API_URL}/${endpoint}/${uuid}`, {
    ..._options,
  });
};

const Update = (uuid, data) => {
  let _options = {
    headers: {
      contentType: "application/json",
      authorization: `bearer ${accessToken}`,
    },
    withCredentials: true,
  };
  return _Patch(
    `${process.env.REACT_APP_API_URL}/${endpoint}/${uuid}`,
    data,
    _options
  );
};

const Delete = (uuid) => {
  let _options = {
    headers: {
      contentType: "application/json",
      authorization: `bearer ${accessToken}`,
    },
    withCredentials: true,
  };
  return _Delete(
    `${process.env.REACT_APP_API_URL}/${endpoint}/${uuid}`,
    _options
  );
};

export { PagedSearh, Create, GetAll, ReadByUuid, Update, Delete };
