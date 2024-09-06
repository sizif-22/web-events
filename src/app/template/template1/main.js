import standards from "./standards.json";
const Template1 = () => {
  console.log(standards);
  return (
    <div>
      <h1>{standards.title}</h1>
      <p>{standards.description}</p>
    </div>
  );
};
export default Template1;