import standards from "./standards.json";
import Editor from "./editor";
const Template1 = ({ Edit }) => {
  // console.log(standards);
  return Edit ? (
    <Editor />
  ) : (
    <div className="bg-white h-screen">
      <h1>{standards.title}</h1>
      <p>{standards.description}</p>
    </div>
  );
};
export default Template1;
