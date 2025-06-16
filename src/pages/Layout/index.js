import { Outlet } from "react-router-dom";
function Layout(){
    return (
        <div>
            is Layout
            <Outlet />
        </div>
    )
}

export default Layout;