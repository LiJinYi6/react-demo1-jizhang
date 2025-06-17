import { NavBar } from "antd-mobile";
import { useEffect, useState, useMemo } from "react";
import { DatePicker } from 'antd-mobile';
import { DownOutline, UpOutline } from 'antd-mobile-icons';
import { asyncSetBillList } from "@/store/modules/billStore";
import './index.scss';
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
  const moneyResult = useMemo(() => {
    console.log('计算当前月的收支', currentBillList)
    const incomeTotal = currentBillList.filter(item => item.type === 'income').reduce((a,c) => {return a+c.money},0)
    const payTotal = currentBillList.filter(item => item.type === 'pay').reduce((a,c) => {return a+c.money},0)
    const total = incomeTotal + payTotal
    console.log('计算结果', incomeTotal, payTotal, total   )
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