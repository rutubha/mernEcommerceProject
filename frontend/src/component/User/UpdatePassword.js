import { Fragment, useEffect, useState } from "react";
import Loader from "../layout/Loader/Loader";
import { Lock, LockOpen, VpnKey } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import "./updatePassword.css";
import MetaData from "../layout/MetaData";

const UpdatePassword = ({ history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, isUpdated, loading } = useSelector(state => state.profile);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updateSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(myForm));
    };

    useEffect(() => {
        if (error) {
            alert.error(error.error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Profile updated successfully");
            history.push("/account");

            dispatch({ type: UPDATE_PASSWORD_RESET });
        }
    }, [dispatch, error, alert, history, isUpdated]);
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={`Change Pasword`} />
                    <div className="updatePasswordContainer">
                        <div className="updatePasswordBox">
                            <h2>Change Password</h2>
                            <form
                                className="updatePasswordForm"
                                encType="multipart/form-data"
                                onSubmit={updateSubmit}
                            >
                                <div className="signUpPassword">
                                    <VpnKey />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Old password"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        required
                                    />
                                </div>
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
                                </div><div className="signUpPassword">
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
                                    value="Change"
                                    className="updatePasswordBtn"
                                />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default UpdatePassword