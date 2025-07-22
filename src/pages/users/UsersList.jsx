import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { NavLink } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const deleteUser = (email) => {
    const filteredUsers = users.filter((user) => {
      return user.email !== email;
    });
    setUsers([...filteredUsers]);
    localStorage.setItem("users", JSON.stringify(filteredUsers));
  };

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    setUsers([...users]);
  }, []);

  return (
    <div className="flex justify-center flex-col w-full border border-gray-500">
      <div className="flex justify-between items-center mx-4 my-4">
        <h2 className="font-semibold text-2xl text-center">All Users Record</h2>
        <NavLink to={"/signup?actionType=add"}>
          <Button>Add User</Button>
        </NavLink>
      </div>

      <table className="table-auto mt-2 mb-6 mx-2">
        <thead>
          <tr className="text-left h-10">
            <th className="px-2">Name</th>
            <th>Email</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr className="even:bg-gray-200 odd:bg-white h-10" key={index}>
                <td className="px-2">{user.name}</td>
                <td className="">{user.email}</td>
                <td className="">
                  <button
                    className="border border-black mt-1 px-2 rounded-sm  hover:bg-gray-700 hover:text-white"
                    onClick={() => deleteUser(user.email)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
