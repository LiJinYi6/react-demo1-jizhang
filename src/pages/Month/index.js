import { NavBar } from "antd-mobile";
import { useEffect, useState, useMemo } from "react";
import { DatePicker } from 'antd-mobile';
import { DownOutline, UpOutline } from 'antd-mobile-icons';
import { asyncSetBillList } from "@/store/modules/billStore";
import './index.scss';
import dayjs from "dayjs";
import _ from 'lodash'
import { useDispatch, useSelector } from "react-redux";
function Month() {
  const [isShowTime, setIsShowTime] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(dayjs(new Date()));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncSetBillList());
  },[])
  const billList = useSelector(state => state.billStore.billList)
  const monthGroup = useMemo(() => {
    return _.groupBy(billList,(item) => dayjs(item.date).format('YYYY-MM'))
  },[billList])
  console.log(monthGroup)
  return (
    <div className = "month">
      <NavBar backIcon={false}>月度收支</NavBar>
      <div className='top-card'>
        <div className='time-ctl'>
            <span>{dayjs(currentMonth).format('YYYY | M月账单')}</span>
            {!isShowTime && <span onClick={() => setIsShowTime(!isShowTime)}><DownOutline /></span>}
            {isShowTime && <span onClick={() => setIsShowTime(!isShowTime)}><UpOutline /></span>}
        </div>
        <div className="total">
            <div className='item'>
                <span className='label'>收入</span>
                <span className='value'>¥ 10000</span>
            </div>
            <div className='item'>
                <span className='label'>支出</span>
                <span className='value'>¥ 5000</span>
            </div>
            <div className='item'>
                <span className='label'>结余</span>
                <span className='value'>¥ 5000</span>
            </div>
        </div>
      </div>


      <DatePicker
          visible={isShowTime}
          onClose={() => {
            setIsShowTime(false)
          }}
          precision='month'
          onConfirm={val => {
            setCurrentMonth(val)
            console.log(currentMonth)
          }}
        />
    </div>
  )
}

export default Month;