import { _Get, _Post } from "./base";

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

export { PagedSearh, CreateNewReceiving };
