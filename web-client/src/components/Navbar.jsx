import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {logoutUser} from "../actions/authActions.js"

const Navbar = ({auth: {isAuthenticated},logoutUser}) => {
	const authLinks = (
		<>
			<ul className="navbar-nav me-auto mb-2 mb-lg-0">
				<li className="nav-item">
					<Link to={"/"} className="nav-link active" aria-current="page">Home</Link>
				</li>
				<li className="nav-item">
					<Link to={"/about"} className="nav-link">About</Link>
				</li>
			</ul>
			<div className="d-flex">
				<a onClick={logoutUser} href="#!" className="btn btn-outline-dark rounded-0 me-2">Logout</a>
				<Link to="/dashboard/profile" className="btn btn-outline-dark rounded-0">Profile</Link>
			</div>
		</>
	);
	const guestLinks = (
		<>
			<ul className="navbar-nav me-auto mb-2 mb-lg-0">
				<li className="nav-item">
					<Link to={"/"} className="nav-link active" aria-current="page">Home</Link>
				</li>
				<li className="nav-item">
					<Link to={"/about"} className="nav-link">About</Link>
				</li>
			</ul>
			<div className="d-flex">
				<Link to="/login" className="btn btn-outline-dark rounded-0 me-2">Login</Link>
				<Link to="/register" className="btn btn-dark rounded-0 me-2">Register</Link>
			</div>
		</>
	);


	return (
		<>
			<nav className="navbar navbar-expand-lg bg-light">
				<div className="container-fluid">
					<Link className="navbar-brand" to="/">Portfolio</Link>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse"
							data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
							aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						{
							isAuthenticated ? authLinks : guestLinks
						}
					</div>
				</div>
			</nav>
		</>
	)
}


Navbar.propTypes = {
	auth: PropTypes.object.isRequired,
	logoutUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	auth: state.authReducer
})

export default connect(
	mapStateToProps,
	{logoutUser},
)(Navbar);