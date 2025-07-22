import { Link } from "react-router-dom";
import { routes } from "../../constants";

const Home = () => {
  return (
    <div className="grid grid-cols-5 gap-4">
      {routes.map((item) => {
        return (
          <Link
            to={item.route}
            className={`flex justify-center items-center rounded-sm text-white px-6 py-2 bg-gray-700 h-20`}
          >
            {item.title}
          </Link>
        );
      })}
    </div>
  );
};
export default Home;
