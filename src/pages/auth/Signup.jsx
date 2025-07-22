import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

const Signup = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const actionType = searchParams.get('actionType')
  const [passwordMatched, setPasswordMatched] = useState(true);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const signup = (e) => {
    // save user detail to local storage
    e.preventDefault();
    if (userDetails.name && userDetails.email && userDetails.password) {
      const users = localStorage.getItem("users")
        ? JSON.parse(localStorage.getItem("users"))
        : [];
      const index = users.findIndex((user) => userDetails.email === user.email);
      if (index === -1) {
        delete userDetails.confirmPassword;
        users.push(userDetails);
        localStorage.setItem("users", JSON.stringify(users));
        setUserDetails({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        alert("User register succesfully.");
      } else {
        alert("User already exist with this Email ID.");
      }
    }
  };
  const handleName = (e) => {
    setUserDetails({ ...userDetails, name: e.target.value });
  };
  const handleEmail = (e) => {
    userDetails.email = e.target.value;
    setUserDetails({ ...userDetails });
  };
  const handlePassword = (e) => {
    userDetails.password = e.target.value;
    setUserDetails({ ...userDetails });
  };
  const handleConfirmPassword = (e) => {
    userDetails.confirmPassword = e.target.value;
    setUserDetails({ ...userDetails });
  };

  useEffect(() => {
    setPasswordMatched(
      userDetails.password !== userDetails.confirmPassword ? false : true
    );
  }, [userDetails.confirmPassword, userDetails.password]);

  return (
    <div className="flex justify-center w-full ">
      <form onSubmit={signup} className="flex flex-col my-6">
        <Input
          label={"Name"}
          onChange={handleName}
          type="text"
          name="name"
          value={userDetails.name}
        />
        <Input
          label={"Email ID"}
          onChange={handleEmail}
          type="email"
          name="email"
          value={userDetails.email}
        />
        <Input
          label={"Password"}
          onChange={handlePassword}
          type="password"
          name="password"
          value={userDetails.password}
          customClass={passwordMatched ? "border-gray-500 " : "border-red-500"}
        />
        <Input
          label={"Confirm Password"}
          onChange={handleConfirmPassword}
          type="password"
          name="confirmPassword"
          value={userDetails.confirmPassword}
          customClass={passwordMatched ? "border-gray-500 " : "border-red-500"}
        />
        <Button type="submit" disabled={!passwordMatched}>
          Signup
        </Button>
      </form>
    </div>
  );
};

export default Signup;
