import React from 'react';

import { Outlet } from "react-router-dom";
import Tabs from "../../components/Tabs";

function Dashboard() {
    return (<>
        <div className="container py-4">
            <Tabs></Tabs>
            <Outlet />
        </div>
    </>);
}

export default Dashboard;