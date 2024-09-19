import NavBar from "./components/nav";
import HowToCreateEvent from "./HomePage body/howToCreateEvent";
import Overview from "./HomePage body/overview";
const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
      <div className="flex-1 flex flex-col lg:flex-row">
        <div className="flex-1 flex flex-col">
            <NavBar className="bg-blue-600 text-white" />
          <main className="flex-1 p-6 bg-white">
            <div className="ml-auto mr-auto bg-gray-500 h-screen max-w-6xl">
              <Overview />
              <HowToCreateEvent />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
export default Home;
