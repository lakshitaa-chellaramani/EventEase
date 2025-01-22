import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  Link,
  Alert,
} from "@mui/material";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    lName: "",
    contactNumber: "",
    city: "",
    pan_card_number: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (isSignUp) {
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match.");
          return;
        }
        await axios.post("http://localhost:4000/user/register", {
          email: formData.email,
          password: formData.password,
          name: formData.name,
          lName: formData.lName,
          contactNumber: formData.contactNumber,
          city: formData.city,
          pan_card_number: formData.pan_card_number,
        });
        setSuccess("Account created successfully!");
        setIsSignUp(false);
      } else {
        const res = await axios.post("http://localhost:4000/user/login", {
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem("user", res.data.data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}
    >
      <Grid item xs={11} sm={8} md={5}>
        <Paper elevation={6} style={{ margin:"4rem", padding: "2rem", borderRadius: "8px" }}>
          <Typography variant="h4" align="center" gutterBottom>
            {isSignUp ? "Sign Up" : "Sign In"}
          </Typography>

          <Typography variant="body2" align="center" gutterBottom>
            <Link
              href="#"
              underline="hover"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp
                ? "Already have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </Link>
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}

          <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
            <Grid container spacing={2}>
              {isSignUp && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lName"
                      value={formData.lName}
                      onChange={handleInputChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Contact Number"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="PAN Card Number"
                      name="pan_card_number"
                      value={formData.pan_card_number}
                      onChange={handleInputChange}
                      variant="outlined"
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  type="email"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  type="password"
                  variant="outlined"
                />
              </Grid>
              {isSignUp && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    type="password"
                    variant="outlined"
                  />
                </Grid>
              )}
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: "1.5rem" }}
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}
