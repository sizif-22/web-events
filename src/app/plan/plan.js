export default function Plan({ title, describtion, price }) {
  return (
    <div className=" rounded-md mt-20 hover:mt-16 border-blue-900 border-2 flex items-center w-44 h-80 transition-all flex-col justify-between p-5">
      <div className="flex items-start flex-col w-full">
        <h2>{title}</h2>
        <p>{describtion}</p>
      </div>
      <div className="flex flex-col items-end  w-full">{price}</div>
    </div>
  );
}
