import React from "react";
import { Outlet } from "react-router-dom";

import { Nav } from "../components";

const ShareLayout = () => {
    return (
        <div>
            <Nav />
            <Outlet />
        </div>
    );
};

export default ShareLayout;
