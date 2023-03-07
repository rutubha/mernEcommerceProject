import { Fragment, useEffect, useState } from "react";
import Loader from "../layout/Loader/Loader";
import { Lock, LockOpen } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import "./resetPassword.css";
import MetaData from "../layout/MetaData";

const ResetPassword = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updateSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(match.params.token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error.error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password reset successfully");
      history.push("/login");
    }
  }, [dispatch, error, alert, history, success]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`Change Pasword`} />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2>Reset Password</h2>
              <form
                className="resetPasswordForm"
                encType="multipart/form-data"
                onSubmit={updateSubmit}
              >
                <div className="signUpPassword">
                  <LockOpen />
                  <input
                    type="password"
                    name="password"
                    placeholder="new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="signUpPassword">
                  <Lock />
                  <input
                    type="password"
                    name="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <input
                  type="submit"
                  value="Reset"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
