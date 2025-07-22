import { useState, memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";

const InputError = memo(({ isError, loginDetails }) => {
  return (
    isError &&
    loginDetails?.email === "" && (
      <p className="text-sm font-medium  text-red-700">Please Enter Email</p>
    )
  );
});

const Signin = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [isError, setIsError] = useState(false);
  const handleEmail = (e) => {
    setLoginDetails({ ...loginDetails, email: e.target.value });
  };
  const handlePassword = (e) => {
    setLoginDetails({ ...loginDetails, password: e.target.value });
  };
  const signin = (e) => {
    e.preventDefault();
    if (loginDetails.email && loginDetails.password) {
      const users = JSON.parse(localStorage.getItem("users"));
      const user = users.find((user) => user.email === loginDetails.email);
      if (user) {
        if (
          loginDetails.email === user.email &&
          loginDetails.password === user.password
        ) {
          navigate("/users");
        } else {
          alert("Entered Password is Invalid");
        }
      } else {
        alert("This email is not register with us. Please signup first");
      }
    } else {
      setIsError(true);
    }
  };
  return (
    <div className="flex justify-center w-full ">
      <form onSubmit={signin} className="my-6">
        <Input
          label={"Email ID"}
          onChange={handleEmail}
          type="email"
          name="email"
          value={loginDetails.email}
          isError={isError && loginDetails?.email === ""}
        />
        <Input
          label={"Password"}
          onChange={handlePassword}
          type="password"
          name="password"
          value={loginDetails.password}
          isError={isError && loginDetails?.password === ""}
        />
        <Button type="submit">Signin</Button>
      </form>
    </div>
  );
};

export default Signin;
