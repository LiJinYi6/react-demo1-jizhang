import { NavBar } from "antd-mobile";
import { useEffect, useState, useMemo } from "react";
import { DatePicker } from 'antd-mobile';
import { DownOutline, UpOutline } from 'antd-mobile-icons';
import { asyncSetBillList } from "@/store/modules/billStore";
import './index.scss';
import BillItem from "./components/BillItme";
import dayjs from "dayjs";
import _, { set } from 'lodash'
import { useDispatch, useSelector } from "react-redux";
function Month() {
  const [isShowTime, setIsShowTime] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(dayjs(new Date()).format('YYYY-MM'));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncSetBillList());
  },[])
  const billList = useSelector(state => state.billStore.billList)
  const monthGroup = useMemo(() => {
    return _.groupBy(billList,(item) => dayjs(item.date).format('YYYY-MM'))
  },[billList])
  const currentBillList = useMemo(() => {
    return monthGroup[currentMonth] || [];
  }, [currentMonth,monthGroup])
  const dayGroup = useMemo(() => {
      const groupDatas = _.groupBy(currentBillList, (item) => dayjs(item.date).format('YYYY-MM-DD'));
      console.log('日分组数据:', groupDatas);
      const keys = Object.keys(groupDatas);
      return {keys, groupDatas};
  },[currentBillList])
  const moneyResult = useMemo(() => {
    const incomeTotal = currentBillList.filter(item => item.type === 'income').reduce((a,c) => {return a+c.money},0)
    const payTotal = currentBillList.filter(item => item.type === 'pay').reduce((a,c) => {return a+c.money},0)
    const total = incomeTotal + payTotal
    return { incomeTotal, payTotal, total }
  },[currentBillList])

  return (
    <div className = "month">
      <NavBar backIcon={false}>月度收支</NavBar>
      <div className='top-card'>
        <div className='time-ctl'>
            <span>{`${currentMonth} 账单 `}</span>
            {!isShowTime && <span onClick={() => setIsShowTime(!isShowTime)}><DownOutline /></span>}
            {isShowTime && <span onClick={() => setIsShowTime(!isShowTime)}><UpOutline /></span>}
        </div>
        <div className="total">
            <div className='item'>
                <span className='label'>收入</span>
                <span className='value'>{moneyResult.incomeTotal}</span>
            </div>
            <div className='item'>
                <span className='label'>支出</span>
                <span className='value'>{moneyResult.payTotal}</span>
            </div>
            <div className='item'>
                <span className='label'>结余</span>
                <span className='value'>{moneyResult.total} </span>
            </div>
        </div>
      </div>
      <div className = 'bill-list'>
        {dayGroup.keys.map((key) => {
            return <BillItem key={key} time={key} dayBillList={dayGroup.groupDatas[key]} />
        })}
      </div>


      <DatePicker
          visible={isShowTime}
          onClose={() => {
            setIsShowTime(false)
          }}
          precision='month'
          onConfirm={val => {
            setCurrentMonth(dayjs(val).format('YYYY-MM'))
          }}
        />
    </div>
  )
}

export default Month;