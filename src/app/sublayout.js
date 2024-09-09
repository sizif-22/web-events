"use client";
import Footer from "./components/footer";
import SetData from "./components/setData.component";
import store from "@/lib/store";
import { Provider } from "react-redux";

const SubLayout = ({ child }) => {
  return (
    <Provider store={store}>
      <SetData />
      {child}
      <Footer />
    </Provider>
  );
};
export default SubLayout;
