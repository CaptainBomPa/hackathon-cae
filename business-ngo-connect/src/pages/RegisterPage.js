import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import CustomTextField from "../components/CustomTextField";
import StringListInput from "../components/StringListInput"; // Import nowego komponentu
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { registerUser, updateUserData } from "../services/authService"; // Import funkcji rejestracji i aktualizacji

// Schemat walidacji z yup
const validationSchema = yup.object({
  // name: yup.string().required("Name is required"),
  // email: yup
  //   .string()
  //   .email("Invalid email address")
  //   .required("Email is required"),
  // password: yup
  //   .string()
  //   .min(8, "Password must be at least 8 characters")
  //   .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  //   .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  //   .matches(/[0-9]/, "Password must contain at least one number")
  //   .required("Password is required"),
  // confirmPassword: yup
  //   .string()
  //   .oneOf([yup.ref("password"), null], "Passwords must match")
  //   .required("Confirming password is required"),
  // role: yup.string().required("Role is required"), // Dodana walidacja roli
});

const RegisterPage = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAdditionalForm, setShowAdditionalForm] = useState(false); // Dodanie stanu dla dodatkowego formularza
  const [additionalData, setAdditionalData] = useState({
    strategies: [],
    projects: [],
    goals: [],
    budget: "",
    partners: [],
    grants: [],
    description: "",
  });
  const [userId, setUserId] = useState(null); // Zapisane ID zarejestrowanego użytkownika

  const navigate = useNavigate();

  // Funkcja obsługująca walidację formik
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "", // Domyślna wartość dla roli
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Przesłanie podstawowych danych rejestracyjnych
        const userData = {
          name: values.name,
          email: values.email,
          password: values.password,
          role: values.role.toUpperCase(),
        };
        if (!showAdditionalForm) {
          const registeredUser = await registerUser(userData);
          setUserId(registeredUser.id);
          setShowAdditionalForm(true);
        }
      } catch (error) {
        setAlertMessage(error.message || "Registration failed");
        setShowAlert(true);
      }
    },
  });

  // Funkcja do przesyłania dodatkowych danych użytkownika
  const handleAdditionalSubmit = async () => {
    try {
      // Formatuj listy jako pojedyncze stringi oddzielone przecinkami
      const formattedAdditionalData = {
        ...additionalData,
        strategies: additionalData.strategies.join(', '), // Konwertowanie listy na string
        projects: additionalData.projects.join(', '), // Konwertowanie listy na string
        goals: additionalData.goals.join(', '), // Konwertowanie listy na string
        partners: additionalData.partners.join(', '), // Konwertowanie listy na string
        grants: additionalData.grants.join(', '), // Konwertowanie listy na string
      };

      const completeUserData = {
        id: userId, // Przekazanie ID zarejestrowanego użytkownika
        role: formik.values.role.toUpperCase(),
        ...formattedAdditionalData, // Dołączenie sformatowanych dodatkowych danych
      };

      await updateUserData(completeUserData); // Przesłanie dodatkowych danych
      navigate("/login"); // Przekierowanie na stronę logowania
    } catch (error) {
      setAlertMessage(error.message || "Failed to update additional data");
      setShowAlert(true);
    }
  };

  // Obsługa zamknięcia alertu
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  // Funkcja do ustawiania wartości dla dodatkowych pól
  const handleAdditionalDataChange = (key, value) => {
    setAdditionalData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <motion.div
      key={showAdditionalForm ? "additional" : "first"}
      initial={{ opacity: 0, y: 50 }} // Stan początkowy: niewidoczny, przesunięty w dół
      animate={{ opacity: 1, y: 0 }} // Stan końcowy: widoczny, na właściwej pozycji
      exit={{ opacity: 0, y: 50 }} // Stan podczas wychodzenia: niewidoczny, przesunięty w dół
      transition={{ duration: 0.5 }} // Czas trwania animacji
    >
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh", // Wyśrodkowanie formularza
        }}
      >
        <Box
          sx={{
            backgroundColor: "#8F8F8F",
            padding: 7, // Zmniejszenie paddingu, aby więcej zawartości było widoczne
            borderRadius: "20px", // Zaokrąglenie rogów formularza
            textAlign: "center",
            width: "100%",
            maxWidth: "600px", // Zwiększenie maksymalnej szerokości formularza
            height: showAdditionalForm ? "90vh" : "90vh", // Większa wysokość dla dodatkowego formularza
            overflow: "auto", // Ukrycie scrolla w sekcji
          }}
        >
          {/* Logo */}
          <Box mb={4}>
            <img src="/logo.png" alt="Logo" style={{ width: "200px" }} />{" "}
            {/* Zwiększenie rozmiaru logo */}
          </Box>

          {!showAdditionalForm ? (
            // Pierwsza część formularza (rejestracja podstawowa)
            <Box>
              <CustomTextField
                label="Name"
                name="name"
                fullWidth
                required
                margin="normal"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "18px", // Zwiększenie rozmiaru tekstu w polu tekstowym
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "18px", // Zwiększenie rozmiaru etykiety
                  },
                }}
              />
              <CustomTextField
                label="Email Address"
                name="email"
                type="email"
                fullWidth
                required
                margin="normal"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "18px", // Zwiększenie rozmiaru tekstu w polu tekstowym
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "18px", // Zwiększenie rozmiaru etykiety
                  },
                }}
              />
              <CustomTextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                required
                margin="normal"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "18px", // Zwiększenie rozmiaru tekstu w polu tekstowym
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "18px", // Zwiększenie rozmiaru etykiety
                  },
                }}
              />
              <CustomTextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                fullWidth
                required
                margin="normal"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "18px", // Zwiększenie rozmiaru tekstu w polu tekstowym
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "18px", // Zwiększenie rozmiaru etykiety
                  },
                }}
              />

              {/* Dodanie wyboru roli */}
              <FormControl
                fullWidth
                sx={{
                  marginY: 2,
                }}
              >
                <InputLabel id="role-select-label">Role</InputLabel>
                <Select
                  labelId="role-select-label"
                  id="role-select"
                  value={formik.values.role} // Używamy wartości roli z formika
                  label="Role"
                  onChange={(e) => {
                    formik.setFieldValue("role", e.target.value);
                  }}
                  sx={{
                    backgroundColor: "#DCDCDC", // Ustawienie tła na #DCDCDC
                    borderRadius: "20px",
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>{" "}
                  {/* Opcja dla domyślnego pustego wyboru */}
                  <MenuItem value="ngo">NGO</MenuItem>
                  <MenuItem value="business">Business</MenuItem>
                  <MenuItem value="volunteer">Volunteer</MenuItem>
                </Select>
              </FormControl>

              <Box mt={3}>
                {" "}
                {/* Zwiększenie odstępu */}
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={formik.handleSubmit} // Wywołanie funkcji onSubmit w Formiku
                  sx={{
                    backgroundColor: "rgba(65, 140, 181, 0.6)",
                    "&:hover": { backgroundColor: "rgba(65, 140, 181, 0.6)" },
                    fontSize: "20px", // Zwiększenie rozmiaru czcionki przycisku
                    borderRadius: "20px",
                  }}
                >
                  Next
                </Button>
              </Box>
            </Box>
          ) : (
            // Dodatkowa część formularza dla wybranego typu użytkownika
            <Box
              sx={{
                height: "auto", // Stała wysokość sekcji z dodatkowymi polami
                overflowY: "auto", // Scroll w pionie
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ marginBottom: 2 }}>
                Additional Information
              </Typography>
              <CustomTextField
                label="Description"
                name="description"
                fullWidth
                multiline
                rows={4}
                value={additionalData.description}
                onChange={(e) =>
                  handleAdditionalDataChange("description", e.target.value)
                }
                sx={{
                  "& .MuiInputBase-root": {
                    backgroundColor: "#DCDCDC", // Dopasowanie tła TextField
                    borderRadius: "20px",
                    marginBottom: 4,
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "18px", // Zwiększenie rozmiaru etykiety
                  },
                }}
              />

              {formik.values.role === "ngo" && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <StringListInput
                      label="Strategies"
                      value={additionalData.strategies}
                      onChange={(val) =>
                        handleAdditionalDataChange("strategies", val)
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StringListInput
                      label="Projects"
                      value={additionalData.projects}
                      onChange={(val) =>
                        handleAdditionalDataChange("projects", val)
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StringListInput
                      label="Social and Business Goals"
                      value={additionalData.goals}
                      onChange={(val) =>
                        handleAdditionalDataChange("goals", val)
                      }
                    />
                  </Grid>
                </Grid>
              )}

              {formik.values.role === "business" && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <StringListInput
                      label="Actions and Strategy"
                      value={additionalData.strategies}
                      onChange={(val) =>
                        handleAdditionalDataChange("strategies", val)
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StringListInput
                      label="Social Goals"
                      value={additionalData.goals}
                      onChange={(val) =>
                        handleAdditionalDataChange("goals", val)
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StringListInput
                      label="Business Goals"
                      value={additionalData.goals}
                      onChange={(val) =>
                        handleAdditionalDataChange("goals", val)
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StringListInput
                      label="Partners"
                      value={additionalData.partners}
                      onChange={(val) =>
                        handleAdditionalDataChange("partners", val)
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StringListInput
                      label="Grants"
                      value={additionalData.grants}
                      onChange={(val) =>
                        handleAdditionalDataChange("grants", val)
                      }
                    />
                  </Grid>
                  {/* Przeniesienie pola budget na sam dół */}
                  <Grid item xs={12}>
                    <CustomTextField
                      label="Budget"
                      name="budget"
                      fullWidth
                      value={additionalData.budget}
                      onChange={(e) =>
                        handleAdditionalDataChange("budget", e.target.value)
                      }
                      sx={{
                        "& .MuiInputBase-root": {
                          backgroundColor: "#DCDCDC", // Dopasowanie tła TextField
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              )}

              {formik.values.role === "volunteer" && (
                <Grid item xs={12}>
                  
                </Grid>
              )}

              <Box mt={3}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleAdditionalSubmit} // Przesyłanie dodatkowych danych
                  sx={{
                    backgroundColor: 'rgba(65, 140, 181, 0.6)', 
                  '&:hover': { backgroundColor: 'rgba(65, 140, 181, 1.0)' }, 
                    fontSize: "20px", // Zwiększenie rozmiaru czcionki przycisku
                    position: "sticky", // Sticky button
                    bottom: 0, // Sticky na dole
                    marginTop: 2, // Odstęp od reszty
                    zIndex: 10, // Zwiększenie z-index, aby nie było problemów z widocznością
                    borderRadius: "20px",
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          )}

          <Box mt={3} textAlign="center">
            {" "}
            {/* Zwiększenie odstępu */}
            {!showAdditionalForm && ( // Warunek ukrywania linku "Already have an account"
              <Typography variant="body1" style={{ color: "#fff" }}>
                {" "}
                {/* Zwiększenie rozmiaru tekstu linku */}
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{
                    color: "#fff",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  Log in here
                </Link>{" "}
                to access your account.
              </Typography>
            )}
          </Box>

          <Snackbar
            open={showAlert}
            autoHideDuration={10000}
            onClose={handleCloseAlert}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseAlert}
              severity="error"
              sx={{ width: "100%" }}
            >
              {alertMessage}
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </motion.div>
  );
};

export default RegisterPage;
