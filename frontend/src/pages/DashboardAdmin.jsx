import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import { UserContext } from "../contexts/UserContext";
import "../styles/Dashboard.scss";

function DashboardAdmin() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  const { user } = useContext(UserContext);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users`
      );
      setUsers(response.data);

      await axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/userroles`)
        .then((res) => {
          setRoles(res.data);
        });
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    // if (user && user.role !== 2) {
    //   window.location.href = `/`;
    // } else if (user && user.role === 2) {
    fetchUsers();
    // }
  }, [user]);

  const addNewRole = async (userId) => {
    try {
      const roleId = 2;

      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/userroles`, {
        userId,
        roleId,
      });

      fetchUsers();
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const removeRoleAdmin = async (userId) => {
    const roleId = 2;

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/userroles`, {
        data: { userId, roleId },
      });
      console.info("Role successfully deleted");
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const getRoleName = (roleId) => (roleId === 1 ? "Member" : "Admin");

  // const accountDelete = async () => {
  //   try {
  //     await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/users`);
  //   } catch (error) {
  //     console.error("Error deleting account:", error);
  //   }
  // };

  return (
    <div className="dashboardAdmin">
      <NavBar />
      <SearchBar />
      <h2>Member Management</h2>
      <section className="dashboard">
        <div>
          <ul className="dashboard-category">
            <li>Email and Id</li>
            <li>Id and Role</li>
          </ul>
        </div>
        <div className="dashboard-info">
          <div className="dashboard-mail">
            {users.map((us) => (
              <ul key={us.id}>
                <li> Id : {us.id}</li>
                <li className="mail"> {us.email}</li>
                {/* <li>
                  <button type="button" onClick={accountDelete(user.id)}>
                    Delete Account
                  </button>
                </li> */}
              </ul>
            ))}
          </div>
          <div className="dashboard-role">
            {roles.map((role) => {
              const oneKey = `${role.user_id}-${role.role_id}`;
              const isAdmin = role.role_id === 2;
              return (
                <ul key={oneKey}>
                  <li> Id : {role.user_id}</li>
                  <li className="role"> Role : {getRoleName(role.role_id)}</li>
                  <li>
                    {isAdmin ? (
                      <button
                        type="button"
                        onClick={() => removeRoleAdmin(role.user_id)}
                      >
                        Remove Admin role
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => addNewRole(role.user_id)}
                      >
                        Give Admin role
                      </button>
                    )}
                  </li>
                </ul>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default DashboardAdmin;
