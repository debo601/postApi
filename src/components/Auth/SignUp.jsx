import React, { useState } from "react";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

 
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

 
  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirm_password ||
      !form.phone
    ) {
      setMessage("Please fill all fields.");
      return;
    }

    if (!validateEmail(form.email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (!validatePhoneNumber(form.phone)) {
      setMessage("Please enter a valid 10-digit phone number.");
      return;
    }

    if (form.password !== form.confirm_password) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://amuma.nodejsdapldevelopments.com/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();
      console.log("this is data", data);

      if (res.ok) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setMessage("Registration successful! You can now login.");
      } else {
        let errorMessage = data.message || "Something went wrong.";
        if (data.errors) {
          for (const field in data.errors) {
            const fieldError = data.errors[field];
            errorMessage += ` ${field}: ${
              Array.isArray(fieldError) ? fieldError.join(", ") : fieldError
            }.`;
          }
        }
        setMessage(errorMessage);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          name="confirm_password"
          type="password"
          placeholder="Confirm Password"
          value={form.confirm_password}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;
