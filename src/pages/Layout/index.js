import {
  Route,
  Switch,
  Outlet,
  useNavigate,
  useLocation,
  MemoryRouter as Router,
} from 'react-router-dom'
import { Button } from "antd-mobile";
import './index.scss'
import { BillOutline, CalculatorOutline, ReceiptOutline } from 'antd-mobile-icons';
import { useDispatch } from "react-redux";
import { asyncSetBillList } from "@/store/modules/billStore";
import { useEffect } from "react";
import { TabBar } from "antd-mobile";
function Layout(){
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(asyncSetBillList());
    }, [dispatch]);
    const navigate = useNavigate()
    const location = useLocation()
    const { pathname } = location
    const setRouteActive = (value) => {
        navigate(value)
    }
     const tabs = [
    {
      key: '/month',
      title: '月账单',
      icon: <BillOutline />,
    },
    {
      key: '/new',
      title: '新增账单',
      icon: <CalculatorOutline />,
    },
    {
      key: '/year',
      title: '年账单',
      icon: <ReceiptOutline />,
    },
  ]
    return (
        <div className = "layout">
            <div className = "center">
                <Outlet />
            </div>
            <div className = "footer">
                <TabBar activeKey={pathname} onChange={value => setRouteActive(value)}>
                    {
                        tabs.map(item => (
                        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />))
                    }
                </TabBar>
            </div>
        </div>
    )
}

export default Layout;