import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// const Alert = ({ alerts }) =>
// 	alerts !== null &&
// 	alerts.length > 0 &&
// 	alerts.map(alert => {
// 		return (
// 			<>
// 				<div key={alert.id} className={`alert alert-${alert.alertType}`} role="alert">
// 					{alert.message}
// 				</div>
// 			</>
// 		)
// 	})

const Alert = ({ alerts }) =>
	alerts !== null &&
	alerts.length > 0 &&
	alerts.map((alert, index) => {
		return (
			<>
				<div key={index} className={`alert alert-${alert.alertType}`} role="alert">
					{alert.message}
				</div>
			</>
		)
	})

Alert.propTypes = {
	alerts: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
	alerts: state.alertReducer
})


export default connect(mapStateToProps)(Alert);