import React, { createContext, useState, useContext } from "react";

const context = {
  lastDataModificationTimestamp: 0,
  setLastDataModificationTimestamp: () => {},
  isShowModal: false,
  setIsShowModal: () => {},
};

const ApplicationStoreContext = createContext(context);

export const ApplicationStoreProvider = ({ children }) => {
  const [lastDataModificationTimestamp, setLastDataModificationTimestamp] =
    useState(0);
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <ApplicationStoreContext.Provider
      value={{
        lastDataModificationTimestamp,
        setLastDataModificationTimestamp,
        isShowModal,
        setIsShowModal,
      }}
    >
      {children}
    </ApplicationStoreContext.Provider>
  );
};

export const useApplicationStoreContext = () =>
  useContext(ApplicationStoreContext);
