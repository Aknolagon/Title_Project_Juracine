import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import "../styles/Home.scss";

function DashboardAdmin() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

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
    fetchUsers();
  }, []);

  // const handleRoleChange = async (userId, newRole) => {
  //   try {
  //     // Envoyer une requête au backend pour mettre à jour le rôle de l'utilisateur
  //     await axios.put(
  //       `${import.meta.env.VITE_BACKEND_URL}/api/userroles/${userId}`,
  //       { roleId: newRole }
  //     );

  //     // Mettre à jour la liste des utilisateurs après le changement de rôle
  //     fetchUsers();
  //   } catch (error) {
  //     console.error("Error updating user role:", error);
  //   }
  // };

  // const getRoleName = (roleId) => {
  //   const rolesMap = {
  //     1: "Member",
  //     2: "Admin",
  //     3: "Fan",
  //   };
  //   return rolesMap[roleId] || "Member";
  // };

  return (
    <div className="DashboardAdmin">
      <NavBar />
      <div>
        <SearchBar />
        <h2>Member Management</h2>
        <section>
          <div>
            <ul>
              <li>Email</li>
              <li>Role</li>
              <li>Action</li>
            </ul>
          </div>
          <div>
            {users.map((user) => (
              <ul key={user}>
                <input
                  type="text"
                  value={user.email}
                  onChange={(e) => setUsers(e.target.value)}
                  className="email"
                />
              </ul>
            ))}
            {roles.map((role) => (
              <ul key={role}>
                <input
                  type="text"
                  value={role.role_id}
                  onChange={(e) => setRoles(e.target.value)}
                  className="role"
                />
                {/* <li>
                  <button
                    type="button"
                    // value={userRoles.role_id}
                    onClick={() => handleRoleChange(user.role_id, "3")}
                  >
                    Change to Fan
                  </button> */}
                {/* Ajouter un autre bouton pour le changement en admin */}
                {/* </li> */}
              </ul>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default DashboardAdmin;
