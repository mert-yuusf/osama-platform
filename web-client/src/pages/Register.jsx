import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { setAlert } from "../actions/alertActions";
import { registerUser } from "../actions/authActions";

const positionsList = ["Developer", "Designer", "System Engineer", "DevOps", "Content Creator", "UI/UX Designer"];
const initValues = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	username: "",
	position: "",
	confirmPassword: ""
}

const RegisterPage = ({ setAlert, registerUser, isAuthenticated }) => {
	const [values, setValues] = useState(initValues);

	const onValueChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	}

	const onSelectChange = (e) => {
		const selectedValue = e.target.value;
		setValues({ ...values, position: selectedValue });
	}

	const onFormSubmit = async (e) => {
		e.preventDefault();
		if (values.password !== values.confirmPassword) {
			setAlert("Password must be same", "danger", { timeout: 3000 })
		} else {
			await registerUser({ ...values });
		}

		// const newUser = { ...values };
		// try {
		// 	// const body = JSON.stringify(newUser)
		// 	const response = await axios.post(`${BaseUrl}/auth/signup`, JSON.stringify(newUser), {
		// 		headers: {
		// 			"Content-Type": "application/json"
		// 		}
		// 	});
		// 	const { result, message } = response.data;
		// 	setAlert("Welcome again", "success", { timeout: 2000 })
		// 	console.log(result);
		// } catch (e) {
		// 	console.log(e.response.data)
		// 	setAlert(e.response.data.message, "danger", { timeout: 3000 })
		// }
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
							<p className="lead my-auto text-center">Register form</p>
						</div>
						<div className="card-body bg-light">
							<form action="" onSubmit={onFormSubmit}>
								<div className="mb-3">
									<label
										htmlFor="fNameField"
										className="form-label"
									>First Name</label>

									<input
										type="text"
										className="form-control rounded-0 shadow-none"
										id="fNameField"
										name="firstName"
										placeholder="John"
										value={values.firstName}
										onChange={onValueChange}
									/>
								</div>

								<div className="mb-3">
									<label
										htmlFor="lNameField"
										className="form-label"
									>Last Name</label>

									<input
										type="text"
										className="form-control rounded-0 shadow-none"
										id="lNameField"
										name="lastName"
										placeholder="Doe"
										value={values.lastName}
										onChange={onValueChange}
									/>
								</div>

								<div className="mb-3">
									<label
										htmlFor="lNameField"
										className="form-label"
									>Username</label>

									<input
										type="text"
										className="form-control rounded-0 shadow-none"
										id="usernameField"
										name="username"
										placeholder="JohnDone"
										value={values.username}
										onChange={onValueChange}
									/>
								</div>

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

								<div className="mb-3">
									<label
										htmlFor="passwordField"
										className="form-label"
									>Confirm Password</label>

									<input
										type="password"
										className="form-control rounded-0 shadow-none"
										id="confirmPasswordField"
										name="confirmPassword"
										placeholder="123 ..."
										value={values.confirmPassword}
										onChange={onValueChange}
									/>
								</div>

								<div className="mb-3">
									<label
										htmlFor="positionField"
										className="form-label"
									>Position</label>

									<select
										className="form-select rounded-0"
										aria-label="Default select position"
										id="positionField"
										defaultValue={"Select Position"}
										onChange={onSelectChange}

									>
										<option defaultValue={"Select Position"}>Select Position</option>
										{
											positionsList.map((position, index) => {
												return <option value={position.toLowerCase()}
													key={index}>{position}</option>
											})
										}
									</select>
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

// Set Component required Params
RegisterPage.prototype = {
	setAlert: PropTypes.func.isRequired,
	registerUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	isAuthenticated: state.authReducer.isAuthenticated
})


export default connect(mapStateToProps, { setAlert, registerUser })(RegisterPage);