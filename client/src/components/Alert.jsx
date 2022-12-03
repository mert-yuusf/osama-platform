import React from 'react';

import { useSelector } from "react-redux";
function Alert() {
    const { showAlert, alertMessage, alertType } = useSelector((store) => store.alert);
    return (<>
        {
            showAlert &&
            <div className={`alert rounded-0 alert-${alertType}`} role="alert">
                {alertMessage}
            </div>
        }
    </>);
}

export default Alert;