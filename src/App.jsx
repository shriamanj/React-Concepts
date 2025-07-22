import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import Profile from "./pages/profile/Profile";
import UserList from "./pages/users/UsersList";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation
} from "react-router-dom";
import profile from "./assets/profile.jpg";
import ToDoList from "./pages/todo/ToDoList";
import UserInfo from "./pages/auth/Info";
import Stopwatch from "./pages/stopwatch/Stopwatch";
import RestApi from "./pages/rest-api/RestAPI";
import DebouncedApiList from "./pages/debounce/Debounce";
import TrottleScroll from "./pages/throttle/Throttle";
import Home from "./pages/home/Home";

const profileInfo = {
  name: "Aman Jain",
  bio: "Web Developer",
  img: profile,
  skills: ["HTML5", "CSS3", "JavaScript"],
};

const App = () => {
  const location = useLocation();
  return (
    <>
      <nav className="flex justify-between items-center px-4 py-2 bg-black">
        <NavLink to={'/'} className="text-2xl text-white font-semibold">3A Softwares</NavLink>
        <div>
          <Link
            to="/signIn"
            className={`rounded-sm text-white px-4 py-1 ${
              location.pathname !== "/signIn" && "bg-gray-700"
            }`}
          >
            SignIn
          </Link>
          
        </div>
      </nav>
      <div className="flex w-[95%] sm:w-3/4 md:w-[60%] lg:w-1/2 mx-auto mt-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/profile" element={<Profile profile={profileInfo} />} />
           <Route path="/todo" element={<ToDoList />} /> 
           <Route path="/add-info" element={<UserInfo />} />
           <Route path="/stopwatch" element={<Stopwatch />} /> 
           <Route path="/debounce" element={<DebouncedApiList />} /> 
           <Route path='/trottle' element={<TrottleScroll />}/>
           <Route path="/rest-api" element={<RestApi />} /> 
        </Routes>
         
      </div>
    </>
  );
};
export default App;
