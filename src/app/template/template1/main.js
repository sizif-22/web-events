import standards from "./standards.json";
import Editor from "./editor";
import Viewer from "./viewer";
const Template1 = ({ Edit }) => {
  return Edit ? <Editor /> : <Viewer data={standards} />;
};
export default Template1;
