import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { UserContext } from "../contexts/UserContext";
import "../styles/Profile.scss";

function Profile() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationUpdate, setConfirmationUpdate] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/profiles/${id}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
            },
          }
        );
        const result = response.data;
        setUsername(result.username);
        setLastName(result.last_name);
        setFirstName(result.first_name);
        setAddress(result.address);
        setCity(result.city);
        setPhoneNumber(result.phone_number);

        await axios
          .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
            },
          })
          .then((res) => {
            setEmail(res.data.email);
          });
      } catch (error) {
        if (error.response.status === 401) {
          console.error("Session expired, please log in again.");
          navigate("/");
        }
        console.error("Error fetching profile:", error);
      }
    };

    if (id !== undefined) {
      fetchProfileData();
      if (user && user.id !== parseInt(id, 10)) {
        navigate(`/home`);
      }
    }
  }, [id, user]);

  const updateProfile = async (event) => {
    event.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/profiles/${id}`,
        {
          username,
          firstName,
          lastName,
          address,
          phoneNumber,
          city,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
          },
        }
      );

      axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`,
        {
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
          },
        }
      );

      setConfirmationUpdate("");
      Swal.fire({
        title: "Profile updated",
        text: "Profile updated successfully!",
        icon: "success",
      });
      navigate(`/profile/${id}`);
    } catch (error) {
      console.error(
        "Error while updating the profile, please try again later.",
        error
      );
    }
  };

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
          },
        }
      );
      Swal.fire({
        title: "Account successfully deleted!",
        text: "You deleted your account. We hope to see you soon!",
        icon: "success",
      });
      sessionStorage.removeItem("userToken");
      navigate("/");
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("userToken");
    navigate("/");
    Swal.fire({
      title: "You are now logged out",
      text: "See you soon!",
    });
  };

  return (
    <div className="profile">
      <NavBar />
      <h1>Update your profile ?</h1>
      <form className="form" onSubmit={updateProfile}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          autoComplete="on"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          name="firstname"
          autoComplete="on"
          placeholder="Firstname"
          value={firstName || ""}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          name="lastname"
          autoComplete="on"
          placeholder="Lastname"
          value={lastName || ""}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          name="address"
          placeholder="Full Adress"
          autoComplete="on"
          value={address || ""}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          name="phone_number"
          autoComplete="on"
          placeholder="Phone Number"
          value={phoneNumber || ""}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="text"
          name="city"
          autoComplete="on"
          placeholder="City"
          value={city || ""}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="mail"
          name="email"
          autoComplete="off"
          placeholder="email"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          autoComplete="off"
          placeholder="New Password"
          value={password || ""}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn-update" type="submit">
          Update
        </button>
      </form>
      {confirmationUpdate && (
        <div className="btn-details">
          <p>{confirmationUpdate}</p>
        </div>
      )}
      <div className="btn-details">
        <button
          type="button"
          className="btn-logout"
          onClick={handleLogout}
          aria-hidden
        >
          Log out
        </button>
        <button className="btn-delete" type="submit" onClick={handleDelete}>
          Delete your account*
        </button>
      </div>
      {showConfirmation && (
        <div className="confirmation-text">
          <p>Are you sure you want to delete your account?</p>
          <button className="btn-confirm" type="button" onClick={confirmDelete}>
            Yes
          </button>
          <button className="btn-confirm" type="button" onClick={cancelDelete}>
            No
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Profile;
