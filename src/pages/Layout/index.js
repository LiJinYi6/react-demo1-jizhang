import { Outlet } from "react-router-dom";
import { Button } from "antd-mobile";
import { useDispatch } from "react-redux";
import { asyncSetBillList } from "@/store/modules/billStore";
function Layout(){
    const dispatch = useDispatch();
    return (
        <div>
            is 
            <Button onClick={() => dispatch(asyncSetBillList())} color="primary" variant="outline">
                click
            </Button>
            <Outlet />
        </div>
    )
}

export default Layout;