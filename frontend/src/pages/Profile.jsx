import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import "../styles/Profile.scss";

function Profile() {
  const pwdRef = useRef();

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/profiles/${id}`
        );
        const result = response.data;
        setUsername(result.username || "");
        setLastName(result.last_name || "");
        setFirstName(result.first_name || "");
        setAddress(result.address || "");
        setPhoneNumber(result.phone_number || "");
        setCity(result.city || "");
      } catch (error) {
        console.error("Error with getting your profile:", error);
      }
    };

    fetchProfileData();
  }, [id]);

  const updateProfile = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`, {
        password: pwdRef.current.value,
      });

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/profiles/${id}`,
        {
          username,
          first_name: firstName,
          last_name: lastName,
          address,
          phone_number: phoneNumber,
          city,
        }
      );

      navigate(`/profile/${id}`);
    } catch (error) {
      console.error(
        "Error while updating the profile, please try again later.",
        error
      );
    }
  };

  // Supprimer le compte
  const handleDelete = () => {
    setShowConfirmation(true);
  };

  // Confirmer la suppression du compte
  const confirmDelete = () => {
    console.info("Account deleted !");
    window.location.href = "/";
  };

  // Annuler la suppression du compte
  const cancelDelete = () => {
    setShowConfirmation(false);
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          name="firstname"
          autoComplete="on"
          placeholder="Firstname"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          name="lastname"
          autoComplete="on"
          placeholder="Lastname"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          name="address"
          placeholder="Full Adress"
          autoComplete="on"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="number"
          name="phoneNumber"
          autoComplete="on"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="text"
          name="city"
          autoComplete="on"
          placeholder="City"
          className="input-city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="btn-update" type="submit">
          Update your profile
        </button>
      </form>
      <div className="btn-details">
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
