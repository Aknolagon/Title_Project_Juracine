import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import NavBar from "../components/NavBar";
import { UserContext } from "../contexts/UserContext";
import "../styles/Dashboard.scss";

function DashboardAdmin() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
          },
        }
      );
      setUsers(response.data);

      await axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/userroles`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
          },
        })
        .then((res) => {
          setRoles(res.data);
        });
    } catch (error) {
      if (error.response.status === 401) {
        console.error("Session expired, please log in again.");
        navigate("/");
      }
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [user]);

  const addNewRole = async (userId) => {
    try {
      const roleId = 2;

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/userroles`,
        {
          userId,
          roleId,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
          },
        }
      );

      Swal.fire({
        title: "Role given successfully!",
        text: "The member is now admin.",
        icon: "success",
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
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      });
      Swal.fire({
        title: "Role removed successfully!",
        text: "Member is no longer admin.",
      });
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const getRoleName = (roleId) => (roleId === 1 ? "Member" : "Admin");

  const getRoleEmail = (userId) => {
    const userMail = users.find((us) => us.id === userId);
    return userMail ? userMail.email : "Email not found";
  };

  const accountDelete = async (userId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
          },
        }
      );
      Swal.fire({
        title: "Account removed successfully!",
        text: "Member is now deleted.",
        icon: "success",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <div className="dashboardAdmin">
      <NavBar />
      <h1 className="title">Member Management</h1>
      <section className="dashboard">
        <ul className="dashboard-category">
          <li>Email || Member</li>
        </ul>
        <div className="dashboard-mail">
          {users.map((us) => (
            <ul key={us.id}>
              <li> Member : {us.id}</li>
              <li> Email : {us.email}</li>
              <li>
                <button
                  className="remove-account"
                  type="button"
                  onClick={() => accountDelete(us.id)}
                >
                  Delete Account
                </button>
              </li>
            </ul>
          ))}
        </div>
        <ul className="dashboard-category">
          <li>Roles</li>
        </ul>
        <div className="dashboard-role">
          {roles.map((role) => {
            const oneKey = `${role.user_id}-${role.role_id}`;
            const isAdmin = role.role_id === 2;
            return (
              <ul key={oneKey}>
                <li> {getRoleEmail(role.user_id)}</li>
                <li> Role : {getRoleName(role.role_id)}</li>
                <li>
                  {isAdmin ? (
                    <button
                      type="button"
                      className="remove-admin"
                      onClick={() => removeRoleAdmin(role.user_id)}
                    >
                      Remove Admin role
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="add-admin"
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
      </section>
    </div>
  );
}

export default DashboardAdmin;
