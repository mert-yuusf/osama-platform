import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { setAlert } from "../actions/alertActions";
import { loginUser } from "../actions/authActions";

const initValues = {
	email: "",
	password: ""
}


const LoginPage = ({ loginUser, isAuthenticated }) => {
	const [values, setValues] = useState(initValues);
	const onValueChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	}

	const onFormSubmit = async (e) => {
		e.preventDefault();
		await loginUser({ ...values });
	}

	if (isAuthenticated) {
		return <Navigate to="/" />;
	}


	return (
		<>
			<div className="row">
				<div className="col-12 py-3 col-md-6 mx-auto">
					<div className="card rounded-0">
						<div className="card-header py-3  rounded-0 ">
							<p className="lead my-auto text-center">Login form</p>
						</div>
						<div className="card-body bg-light">
							<form action="" onSubmit={onFormSubmit}>
								<div className="mb-3">
									<label
										htmlFor="emailField"
										className="form-label"
									>Email address</label>

									<input
										type="email"
										className="form-control rounded-0 shadow-none"
										id="emailField"
										name="email"
										placeholder="name@example.com"
										value={values.email}
										onChange={onValueChange}
									/>
								</div>

								<div className="mb-3">
									<label
										htmlFor="passwordField"
										className="form-label"
									>Password</label>

									<input
										type="password"
										className="form-control rounded-0 shadow-none"
										id="passwordField"
										name="password"
										placeholder="123 ..."
										value={values.password}
										onChange={onValueChange}
									/>
								</div>

								<div className="d-grid gap-2">
									<input type="submit" value="Submit" className="btn btn-dark rounded-0" />
									<Link to="/" className="btn btn-dark  rounded-0">Back to home</Link>
								</div>

							</form>
						</div>

					</div>


				</div>
			</div>
		</>
	)
}

LoginPage.prototype = {
	loginUser: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
}
// set isAuthenticated props to login components
const mapStateToProps = (state) => ({
	isAuthenticated: state.authReducer.isAuthenticated
});


export default connect(mapStateToProps, { setAlert, loginUser })(LoginPage);