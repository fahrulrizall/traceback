import { _Get, _Post, _Patch, _Delete } from "./base";

const endpoint = "receiving";

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

const CreateNewReceiving = (data) => {
  let _options = { headers: { contentType: "application/json" } };
  return _Post(`${process.env.REACT_APP_API_URL}/${endpoint}`, data, _options);
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

export { PagedSearh, CreateNewReceiving, ReadByUuid, Update, Delete };
