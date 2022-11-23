import React from "react";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({component: Component, auth: {isAuthenticated, isLoading}, ...rest}) => {
	if (isLoading) return (
		<>
			Loading
		</>
	);
	if (isAuthenticated) return <Component/>;
	return <Navigate to="/login"/>;
}


const mapStateToProps = state => ({
	auth: state.authReducer
})

export default connect(mapStateToProps)(ProtectedRoute)