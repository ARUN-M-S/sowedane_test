import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../redux/userData";
import { useSelector } from "react-redux";

function SignUpStepTwo({ next, prev }) {
  const user = useSelector((state) => state.userData.value);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleNext = () => {
    next();
  };

  return (
    <Box sx={{ margin: 1, marginTop: 2, marginBottom: 3 }}>
      <form onSubmit={handleSubmit(handleNext)}>
        <TextField
          name="email"
          type="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email",
            },
          })}
          error={!!errors?.email}
          helperText={errors?.email ? errors.email.message : null}
          variant="outlined"
          sx={{ color: "", mb: 1.2 }}
          size="small"
          label="Email"
          fullWidth
          placeholder="Enter Email"
          value={user.email}
          onChangeCapture={(e) => dispatch(login({ ...user, email: e.target.value }))}
        />
        <TextField
          name="phone"
          type="string"
          {...register("phone", {
            required: "This field is required",
            pattern: {
              value: /^\d{10}$/,   
              message: "Please enter a valid phone number",
            },
          })}
          error={!!errors?.phone}
          helperText={errors?.phone ? errors.phone.message : null}
          variant="outlined"
          sx={{ color: "", mb: 1.2 }}
          size="small"
          label="Phone"
          fullWidth
          placeholder="Enter Phone"
          value={user.phone}
          onChangeCapture={(e) => dispatch(login({ ...user, phone: e.target.value }))}
        />
        <Box
          width="100%"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 3,
          }}
        >
          <Button
            onClick={prev}
            variant="contained"
            size="small"
            sx={{
              fontSize: { xs: "0.8rem", sm: "1rem" },
              mb: 2,
            }}
          >
            Back
          </Button>
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

export default SignUpStepTwo;
