import React from "react";
import { Provider } from "react-redux";
import store from "../store";

const providers = (props) => {
  return <Provider store={store}>{props.children}</Provider>;
};

export default providers;
