import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/Profile.scss";

function Profile() {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = () => {
    // Afficher la boîte de dialogue de confirmation
    setShowConfirmation(true);
  };

  // Fonction pour confirmer la suppression du compte
  const confirmDelete = () => {
    // Mettez ici la logique pour supprimer réellement le compte
    console.info("Account deleted !");
    // Après la suppression, vous pouvez rediriger l'utilisateur vers une autre page ou effectuer d'autres actions nécessaires
  };

  // Fonction pour annuler la suppression du compte
  const cancelDelete = () => {
    // Masquer la boîte de dialogue de confirmation
    setShowConfirmation(false);
  };

  return (
    <div className="profile">
      <NavBar />
      <h1>Update your profile ?</h1>
      <form className="form">
        <input
          type="text"
          name="username"
          autoComplete="username"
          placeholder="Username"
          // onChange={(e) => setLastNameParent(e.target.value)}
        />
        <input
          type="text"
          name="firstname"
          autoComplete="firstname"
          placeholder="Firstname"
          // value={firstNameParent}
          // onChange={(e) => setFirstNameParent(e.target.value)}
        />
        <input
          type="text"
          name="lastname"
          autoComplete="lastname"
          placeholder="Lastname"
          // value={firstNameBaby}
          // onChange={(e) => setFirstNameBaby(e.target.value)}
        />
        <input
          type="mail"
          name="email"
          autoComplete="email"
          placeholder="Mail"
          disabled
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          autoComplete="password"
          placeholder="Password"
          // value={firstNameBaby}
          // onChange={(e) => setFirstNameBaby(e.target.value)}
        />
        <input
          type="number"
          name="phoneNumber"
          autoComplete="number"
          placeholder="Phone Number"
          // value={phoneNumber}
          // onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="text"
          name="address"
          placeholder="Full Adress"
          className="input-adress"
          // value={address}
          // onChange={(e) => setAddress(e.target.value)}
        />
      </form>
      <div className="btn-details">
        <button className="btn-update" type="submit">
          Update your profile
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
