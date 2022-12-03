import React from 'react';

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayAlert, removeAlert } from "../features/alertSlice";
import { registerUser, loginUser, getProfile } from "../features/userSlice";
import { getTokenFromLocalStorage } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";

const initialValues = {
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    role: "freelancer",
    isMember: false,
}


const roleOptions = { company: "Company", freelancer: "Freelancer" }



function RegisterPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading } = useSelector((store) => store.user)
    const [values, setValues] = useState(initialValues);


    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        console.log({ ...values });
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();
        if (!values.isMember) {
            if (!values.email || !values.password) {
                dispatch(displayAlert({ message: "Please provide all required fields", type: "danger" }))
                console.log("Please provide all required fields");

                setTimeout(() => {
                    dispatch(removeAlert())
                }, 2000)
            }
            await dispatch(loginUser({ email: values.email, password: values.password }));
            await dispatch(getProfile());
            const token = getTokenFromLocalStorage();
            if (token) {
                navigate("/dashboard");
            }

        } else {
            if (!values.email || !values.password || !values.fullName) {
                dispatch(displayAlert({ message: "Please provide all required fields", type: "danger" }))
                console.log("Please provide all required fields");
                setTimeout(() => {
                    dispatch(removeAlert())
                }, 2000)
            }
            console.log({ values });
            await dispatch(registerUser({ email: values.email, password: values.password, fullName: values.fullName, role: values.role }));
        }
    }
    return (<>
        <div className="container">
            <div className="row row-cols-md-2 row-cols-lg-2 mt-5">
                <div className="col-12 col-mg-6 mx-auto">
                    <p className="fw-bold text-success text-center">
                        {
                            values.isMember ? "Create New Account" : "Login to your account"
                        }
                    </p>
                    <form action="" onSubmit={onFormSubmit}>
                        {
                            values.isMember &&
                            <input type="text" name="fullName" id="fullNameField" className="form-control mb-3 rounded-0" placeholder="Full Name" value={values.fullName} onChange={handleChange} />
                        }

                        <input type="email" name="email" id="emailField" className="form-control mb-3 rounded-0" placeholder="Email" value={values.email} onChange={handleChange} />

                        <input type="password" name="password" id="passwordField" className="form-control mb-3 rounded-0" placeholder="Password" value={values.password} onChange={handleChange} />

                        {
                            values.isMember &&
                            <div className="form-group mb-3">
                                <select
                                    name="role"
                                    id="roleField"
                                    className="form-select rounded-0"
                                    onChange={handleChange}
                                    value={values.role}
                                >
                                    {
                                        Object.entries(roleOptions).map((item, index) => {
                                            const [key, value] = item;
                                            return <option key={index} value={key}>{value}</option>
                                        })
                                    }
                                </select>
                            </div>
                        }


                        {
                            values.isMember &&
                            <input type="password" name="confirmPassword" id="confirmPasswordField" className="form-control mb-3 rounded-0" placeholder="Confirm Password" value={values.confirmPassword} onChange={handleChange} />
                        }

                        <input type="submit" disabled={isLoading} value={`${values.isMember ? "Register" : "Login"}`} className="btn btn-dark rounded-0" />

                        <button type="button" onClick={(e) => { setValues({ ...values, isMember: !values.isMember }) }} className="btn btn-dark ms-3 rounded-0">
                            {
                                values.isMember ? "I already have account" : "I do not have any account"
                            }
                        </button>



                    </form>
                </div>
            </div>
        </div>
    </>);
}

export default RegisterPage;