import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";

const UserInfo = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  const submitForm = (e) => {
    e.preventDefault();
    if (!userData.name || !userData.email || !userData.password) {
      alert("Enter Details");
    } else {
      alert(
        `Name : ${userData.name}\nEmail : ${userData.email}\nPassword : ${userData.password}`
      );
    }
    setUserData({
      name: "",
      email: "",
      password: "",
    });
  };
  return (
    <>
      <form onSubmit={submitForm}>
        <h1 className="font-semibold text-3xl mb-10">User Detail</h1>
        <Input
          label={"Name"}
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
        />
        <Input
          label={"Email ID"}
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
        <Input
          label={"Password"}
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
        <Button>Submit</Button>
      </form>
    </>
  );
};
export default UserInfo;
