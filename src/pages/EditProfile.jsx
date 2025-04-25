// src/components/EditProfile.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://amuma.nodejsdapldevelopments.com/api/get-profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setName(response.data.name);
        setEmail(response.data.email);
      } catch (err) {
        setError("Failed to fetch profile.");
        console.error(err.response?.data);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://amuma.nodejsdapldevelopments.com/api/save-profile",
        { name, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update profile.");
      console.error(err.response?.data);
    }
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSaveProfile}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default EditProfile;
