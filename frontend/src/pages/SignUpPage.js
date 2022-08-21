import { Box, Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";
import SignUpStepOne from "../components/SignUpStepOne";
import SignUpStepThree from "../components/SignUpStepThree";
import SignUpStepTwo from "../components/SignUpStepTwo";
import Toast from "../components/sweetalert/SweetAlert";
import axios from "../axiosInstance";
import { useSelector } from "react-redux";

function SignUpPage() {
  const user = useSelector((state) => state.userData.value);
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");

  const steps = ["STEP 1", "STEP 2", "STEP 3"];

  const next = () => {
    setPage(page + 1);
  };

  const prev = () => {
    setPage(page - 1);
  };

  const submit = () => {
    if (user.password == user.confirmPassword) {
      axios
        .post("user", user)
        .then((res) => {
          const messageData = res.data.message;
          setMessage(messageData);
          setStatus(true);
        })
        .catch((err) => {
          const message = err.response.data.error   
          Toast.fire({
            icon: "error",
            title: message,
          });
        });
    } else {
      Toast.fire({
        icon: "error",
        title: "Password Not Match",
      });
    }
  };

  const pageDisplay = () => {
    if (page === 0) {
      return <SignUpStepOne next={next} />;
    } else if (page === 1) {
      return <SignUpStepTwo next={next} prev={prev} />;
    } else {
      return <SignUpStepThree prev={prev} submit={submit} />;
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box>
          <Paper
            sx={{
              elevation: 5,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              padding: 3,
              height: "auto",
              width: { xs: 280, sm: 380 },
              margin: { xs: "25% auto", sm: "8% auto" },
              borderRadius: "10px",
            }}
          >
            {status ? (
              <Typography
                style={{
                  marginBottom: 15,
                  fontFamily: "Poppins,sans-serif",
                  textAlign: "center",
                  marginTop: 15,
                  fontweight:600,
                }}
              >
                {message}
              </Typography>
            ) : (
              <>
                <h2
                  style={{
                    marginBottom: 15,
                    fontFamily: "Poppins,sans-serif",
                    textAlign: "center",
                    marginTop: 15,
                  }}
                >
                  SIGN UP
                </h2>
                <Typography
                  style={{
                    marginBottom: 15,
                    fontFamily: "Poppins,sans-serif",
                    textAlign: "center",
                    marginTop: 15,
                  }}
                >
                  {steps[page]}
                </Typography>
                <Box>{pageDisplay()}</Box>
              </>
            )}
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
}

export default SignUpPage;
