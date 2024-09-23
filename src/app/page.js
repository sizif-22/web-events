"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import NavBar from "./components/nav";

const Card = ({ title, children }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden w-2/3">
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{title}</div>
      {children}
    </div>
  </div>
);

const Button = ({ children, onClick, variant = "primary" }) => (
  <button
    onClick={onClick}
    className={`px-5 py-2 rounded-3xl  transition-colors ${
      variant === "primary"
        ? "bg-blue-600 text-white hover:bg-blue-700"
        : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"
    }`}
  >
    {children}
  </button>
);

const Home = () => {
  const userState = useSelector((state) => state.user.userState);
  const { isLoggedIn } = userState;
  const router = useRouter();

  const handleThemeSelection = () => {
    router.push("/theme");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavBar className="bg-blue-600 text-white" />

      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Your Website Builder
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Our website builder project aims to empower users to create
            professional-looking websites without any coding knowledge. With a
            wide range of customizable themes and an intuitive interface, you
            can bring your vision to life quickly and easily.
          </p>
          <div className="space-x-4">
            {!isLoggedIn && (
              <>
                <Button
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  Log In
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    router.push("/plan");
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </section>
        <div className="w-full flex items-center justify-center">
          <Card title="How to Create Your Website">
            <ol className="list-decimal list-inside space-y-4 text-gray-700">
              <li>
                Choose the right theme that fits your website{"'"}s purpose
              </li>
              <li>Customize colors to match your brand</li>
              <li>Add high-quality images that represent your content</li>
              <li>
                Fill in all text fields with engaging and relevant content
              </li>
              <li>
                Press the {'"'}Save{'"'} button to generate your custom website
              </li>
            </ol>
            <br />
            <div className="flex items-center justify-center">
              <Button onClick={handleThemeSelection}>get Start</Button>
            </div>
          </Card>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Your Website Builder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
