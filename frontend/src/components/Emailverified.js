import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Box, Link, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axiosInstance";

function Emailverified() {
  const [validUrl, setValidUrl] = useState(false);
  const param = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `http://localhost:9000/api/user/${param.id}/verify/${param.token}`;
        axios.get(url).then((res) => {
          console.log(res.data);
          setValidUrl(true);
        });
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);

  const handleJoinNow = () => {
    navigate("/login");
  };

  return (
    <Box>
      {validUrl ? (
        <Box
          component={Paper}
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
          <Box sx={{ display: "flex", margin: "0 auto" }}>
            <CheckCircleOutlineIcon
              sx={{
                fontSize: { xs: 20, sm: 35 },
                color: "green",
                marginRight: "10px",
              }}
            />
            <Typography fontSize={{ xs: "1rem", sm: "1.5rem" }}>
              Email verified successfully
            </Typography>
          </Box>

          <Typography
            textAlign="center"
            fontFamily="Poppins,san-serif"
            sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
          >
            <Link
              onClick={handleJoinNow}
              sx={{ color: "blue", cursor: "pointer", fontSize: "1.3rem" }}
            >
              Login
            </Link>
          </Typography>
        </Box>
      ) : (
        <Box
          component={Paper}
          sx={{
            elevation: 5,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: 3,
            height: "auto",
            width: { xs: 280, sm: 320 },
            margin: { xs: "25% auto", sm: "9.5% auto" },
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <Typography fontSize={{ xs: "1rem", sm: "1.5rem" }} fontWeight={600}>
            404 NOT FOUND
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default Emailverified;
