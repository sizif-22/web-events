const Viewer = ({ data , eventId }) => {
  const {
    title,
    organization,
    date,
    time,
    where,
    head1,
    body1,
    logo,
    features,
    form,
  } = data;
  return  (
    <div className="flex flex-col h-screen w-full p-4 sm:p-8 bg-gray-900 text-gray-200">
      <h2 className="mb-4 border-b border-gray-600 pb-2 text-xl sm:text-2xl font-semibold">
        {title}
      </h2>
      <div className="flex flex-col sm:flex-row flex-1 justify-between items-start">
        <div className="flex-1 mb-4 sm:mb-0 sm:mr-4 bg-gray-800 p-4 rounded-lg overflow-auto">
          {/* <p>{description}</p> */}
        </div>
        <div className="flex-1 sm:max-w-xs bg-gray-800 p-4 rounded-lg">
          {/* <img
            src={img}
            alt={title}
            className="w-full h-auto rounded-lg"
          /> */}
        </div>
      </div>
    </div>
  );
};
export default Viewer;
