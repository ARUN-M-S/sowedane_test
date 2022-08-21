import { Box, Button, TextField ,Typography,Link} from "@mui/material";
import { useForm } from "react-hook-form";
import {useDispatch} from 'react-redux';
import {login} from '../redux/userData';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function SignUpStepOne({ next }) {
  const user = useSelector((state) => state.userData.value); 
  const dispatch= useDispatch()
  const navigate= useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleNext = () => {
    next();
  };  
  const handleJoinNow = () => {
    navigate("/login");
  };

  return (
    <Box sx={{ margin: 1, marginTop: 2, marginBottom: 1 }}>
      <form onSubmit={handleSubmit(handleNext)}>
        <TextField
          name="firstName"
          type="string"
          {...register("firstName", {
            required: "This field is required",
            pattern: {
              value: /^[a-zA-Z][a-zA-Z][a-zA-Z ]*$/,
              message: "Please enter a valid name",
            },
          })}
          error={!!errors?.firstName}
          helperText={errors?.firstName ? errors.firstName.message : null}
          variant="outlined"
          sx={{ color: "", mb: 1.2 }}
          size="small"
          label="First Name"
          fullWidth
          placeholder="Enter First Name"
          value={user.firstName}
          onChangeCapture={(e) =>
            dispatch(login({ ...user, firstName: e.target.value }))
          }
        />
        <TextField
          name="lastName"
          type="string"
          {...register("lastName", {
            required: "This field is required",
            pattern: {
              value: /^[A-Za-z]+$/,
              message: "Please enter a valid name",
            },
          })}
          error={!!errors?.lastName}
          helperText={errors?.lastName ? errors.lastName.message : null}
          variant="outlined"
          sx={{ color: "", mb: 1.2 }}
          size="small"
          label="Last Name"
          fullWidth
          placeholder="Enter Last Name"
          value={user.lastName}
          onChangeCapture={(e) =>
            dispatch(login({ ...user, lastName: e.target.value }))
          }
        />

        <Box
          width="100%"
          sx={{
            textAlign: "right",
            marginTop: 3,
          }}
        >
        <Link onClick={handleJoinNow}>
        <Typography sx={{ color: "blue", cursor: "pointer" }}>
          already have an Account? Login
        </Typography>
        </Link>
       
          <Button
            type="submit"
            variant="contained"
            size="small"
            sx={{
              fontSize: { xs: "0.8rem", sm: "1rem" },
              mb: 2,
            }}
          >
            Next
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default SignUpStepOne;
