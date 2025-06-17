import { DownOutline, UpOutline } from "antd-mobile-icons"; 
import { useState, useMemo } from "react";
import dayjs from "dayjs";
import { typeMap } from "@/utils";
function BillItem({time,dayBillList}){
    const [isShowTime, setIsShowTime] = useState(false);
    const dayResult = useMemo(() => {
        const incomeTotal = dayBillList.filter(item => item.type === 'income').reduce((a,c) => {return a+c.money},0)
        const payTotal = dayBillList.filter(item => item.type === 'pay').reduce((a,c) => {return a+c.money},0)
        const total = incomeTotal + payTotal
        return { incomeTotal, payTotal, total }
    },[dayBillList])
    return (
        <div className="bill-item">
            <div className={isShowTime && 'total-ctn'}>
                <div className='title'>
                    <span className="time">{dayjs(time).format('MM月DD日')}</span>
                    {!isShowTime && <span onClick={() => setIsShowTime(!isShowTime)}><DownOutline /></span>}
                    {isShowTime && <span onClick={() => setIsShowTime(!isShowTime)}><UpOutline /></span>}
                </div>
                <div className="total">
                    <div className='item'>
                        <span className='label'>收入</span>
                        <span className='value'>{dayResult.incomeTotal}</span>
                    </div>
                    <div className='item'>
                        <span className='label bill-label'>支出</span>
                        <span className='value'>{dayResult.payTotal}</span>
                    </div>
                    <div className='item'>
                        <span className="label">结余</span>
                        <span className='value'>{dayResult.total} </span>
                    </div>
                </div>
            </div>

            <div className="detail">
                {
                    isShowTime && dayBillList.map(item => {
                        return (
                            <div key={item.id} className="detail-item">
                                <span className="label">{typeMap[item.payFor].icon}<span> </span>{typeMap[item.payFor].label}</span>
                                <span className="value">{item.money}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default BillItem;