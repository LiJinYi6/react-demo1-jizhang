import { createBrowserRouter } from "react-router-dom";
import Layout from "@/pages/Layout";
import New from "@/pages/New";
import Month from "@/pages/Month"
import Year from "@/pages/Year";
const router = createBrowserRouter([
    {
        path:'/',
        element:<Layout />,
        children:[
            {
                path:'month',
                element:<Month />
            },{
                index:true,
                path:'year',
                element:<Year />
            }
        ]
    },{
        path:'/new',
        element:<New />
    }
])

export default router;