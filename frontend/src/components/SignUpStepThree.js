import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../redux/userData";
import { useSelector } from "react-redux";

function SignUpStepThree({ prev, submit }) {
  const user = useSelector((state) => state.userData.value);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleNext = () => {
    submit();
  };
  return (
    <Box sx={{ margin: 1, marginTop: 2, marginBottom: 3 }}>
      <form onSubmit={handleSubmit(handleNext)}>
        <TextField
          name="password"
          type="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 4,
              message: "Password must be more than 4 characters",
            },
          })}
          error={!!errors?.password}
          helperText={errors?.password ? errors.password.message : null}
          variant="outlined"
          sx={{ mb: 1.2 }}
          size="small"
          label="Password"
          fullWidth
          placeholder="Enter Password"
          value={user.password}
          onChangeCapture={(e) =>
            dispatch(login({ ...user, password: e.target.value }))
          }
        />
        <TextField
          name="confirmPassword"
          type="password"
          {...register("confirmPassword", {
            required: "This field is required",
            minLength: {
              value: 4,
              message: "Password must be more than 4 characters",
            },
          })}
          error={!!errors?.confirmPassword}
          helperText={
            errors?.confirmPassword ? errors.confirmPassword.message : null
          }
          variant="outlined"
          sx={{ color: "", mb: 1.2 }}
          size="small"
          label="Confirm Password"
          fullWidth
          placeholder="Confirm Password"
          value={user.confirmPassword}
          onChangeCapture={(e) =>
            dispatch(login({ ...user, confirmPassword: e.target.value }))
          }
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
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default SignUpStepThree;
