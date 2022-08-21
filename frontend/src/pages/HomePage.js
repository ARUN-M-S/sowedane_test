import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import axios from "../axiosInstance";
import EditIcon from "@mui/icons-material/Edit";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../redux/userData";
import Toast from "../components/sweetalert/SweetAlert";

function HomePage() {
  const [users, setUser] = useState("");
  const [edit, setEdit] = useState(false);
  const user = useSelector((state) => state.userData.value);
  const id = user._id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios
      .get(`user/home/${id}`)
      .then((res) => {
        dispatch(login(res.data))
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [edit]);

  const editForm = () => {
    if (edit) {
      setEdit(false);
    } else {
      setEdit(true);
    }
  };
  const updateProfile = async(data) => {
    await axios
      .post(`user/update/${id}`, data)
      .then((res) => {
        console.log(res.data.userUpdate);
        
        const message = res.data.message;
        Toast.fire({
          icon: "success",
          title: message,
        });
        setEdit(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!edit) {
    return (
      <div>
        <Header />
        {/* <Profile /> */}

        <Box
          sx={{
            elevation: 5,
            backgroundColor: "rgba(251, 255, 255, 0.8)",
            padding: 3,
            height: "auto",
            width: { xs: 340, sm: 600 },
            margin: "8% auto",
            borderRadius: "10px",
          }}
        >
          <Typography fontSize={{ xs: "1rem", sm: "1.5rem" }}>
            Your Profile
          </Typography>
          <Typography
            textAlign="center"
            borderBottom={1}
            fontSize={{ xs: "1rem", sm: "1.5rem" }}
            fontWeight={600}
          >
            {`Welcome ${user.firstName} ${" "} ${user.lastName} `}
          </Typography>
          <br />
          <Typography
            textAlign="start"
            fontSize={{ xs: "1rem", sm: "1.5rem" }}
            fontWeight={600}
          >
            FirstName : {users.firstName} <EditIcon onClick={editForm} />
          </Typography>
          <Typography
            textAlign="start"
            fontSize={{ xs: "1rem", sm: "1.5rem" }}
            fontWeight={600}
          >
            LastName : {users.lastName}
          </Typography>
          <Typography
            textAlign="start"
            fontSize={{ xs: "1rem", sm: "1.5rem" }}
            fontWeight={600}
          >
            Phone : {users.phone}
          </Typography>
          <Typography
            textAlign="start"
            fontSize={{ xs: "1rem", sm: "1.5rem" }}
            fontWeight={600}
          >
            Email : {users.email}
          </Typography>
        </Box>
      </div>
    );
  } else if (edit) {
    return (
      <Grid container>
        <Grid item xs={12} sx={{ mt: { sm: 3, xs: 12 } }}>
          <Box>
            <Paper
              sx={{
                elevation: 5,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                padding: 3,
                height: "auto",
                width: { xs: 340, sm: 600 },
                margin: "8% auto",
                borderRadius: "10px",
              }}
            >
              <form onSubmit={handleSubmit(updateProfile)} autoComplete="off">
                <TextField
                  name="firstname"
                  type="text"
                  {...register("firstname", {
                    required: "This field is required",
                  })}
                  error={!!errors?.firstname}
                  helperText={errors?.firstname ? errors.firstname.message : null}
                  variant="outlined"
                  sx={{ color: "", mb: 2 }}
                  size="small"
                  label="firstname"
                  fullWidth
                  placeholder="Enter Firstname"
                />
                <TextField
                  name="lastname"
                  type="text"
                  {...register("lastname", {
                    required: "This field is required",
                  })}
                  error={!!errors?.lastname}
                  helperText={errors?.lastname ? errors.lastname.message : null}
                  variant="outlined"
                  sx={{ color: "", mb: 2 }}
                  size="small"
                  label="Lastname"
                  fullWidth
                  placeholder="Enter lastname"
                />
                <TextField
                  name="phone"
                  type="number"
                  {...register("phone", {
                    required: "This field is required",
                    minLength: {
                      value: 10,
                      message: "Phone must be  10 characters",
                    },
                    maxLength: {
                      value: 10,
                      message: "Phone must be  10 characters",
                    },
                  })}
                  error={!!errors?.phone}
                  helperText={errors?.phone ? errors.phone.message : null}
                  variant="outlined"
                  sx={{ color: "", mb: 2 }}
                  size="small"
                  label="Phone"
                  fullWidth
                  placeholder="Enter Phone"
                />
                <div style={{ display: "flex" }}>
                  <Button
                    type="submit"
                    halfWidth
                    variant="contained"
                    size="small"
                    sx={{
                      margin: "0 auto",
                      fontSize: { xs: "0.8rem", sm: "1rem" },
                      mb: 2,
                      m: 4,
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    halfWidth
                    variant="contained"
                    size="small"
                    sx={{
                      margin: "0 auto",
                      fontSize: { xs: "0.8rem", sm: "1rem" },
                      mb: 2,
                      m: 4,
                    }}
                    onClick={editForm}
                  >
                    cancel
                  </Button>
                </div>
              </form>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    );
  }
}

export default HomePage;
