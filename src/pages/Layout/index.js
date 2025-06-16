import { Outlet } from "react-router-dom";
import { Button } from "antd-mobile";
function Layout(){
    return (
        <div>
            is 
            <Button color="primary" variant="outline">
                click
            </Button>
            <Outlet />
        </div>
    )
}

export default Layout;