import { _Delete, _Get, _Patch, _Post } from "./base";

const endpoint = "vendors";

const PagedSearh = (pageIndex, pageSize) => {
  let _options = { headers: { contentType: "application/json" } };
  return _Get(`${process.env.REACT_APP_API_URL}/${endpoint}/search`, {
    params: {
      pageIndex,
      pageSize,
    },
    ..._options,
  });
};

const Create = (data) => {
  let _options = { headers: { contentType: "application/json" } };
  return _Post(`${process.env.REACT_APP_API_URL}/${endpoint}`, data, _options);
};

const GetAll = () => {
  let _options = { headers: { contentType: "application/json" } };
  return _Get(`${process.env.REACT_APP_API_URL}/${endpoint}/search`, {
    ..._options,
  });
};

const ReadByUuid = (uuid) => {
  let _options = { headers: { contentType: "application/json" } };
  return _Get(`${process.env.REACT_APP_API_URL}/${endpoint}/${uuid}`, {
    ..._options,
  });
};

const Update = (uuid, data) => {
  let _options = { headers: { contentType: "application/json" } };
  return _Patch(
    `${process.env.REACT_APP_API_URL}/${endpoint}/${uuid}`,
    data,
    _options
  );
};

const Delete = (uuid) => {
  let _options = { headers: { contentType: "application/json" } };
  return _Delete(
    `${process.env.REACT_APP_API_URL}/${endpoint}/${uuid}`,
    _options
  );
};

const GetVendorCode = (code) => {
  let _options = { headers: { contentType: "application/json" } };
  return _Get(
    `${process.env.REACT_APP_API_URL}/${endpoint}/searchcode/${code}`,
    {
      ..._options,
    }
  );
};

export {
  PagedSearh,
  Create,
  GetAll,
  ReadByUuid,
  Update,
  Delete,
  GetVendorCode,
};
