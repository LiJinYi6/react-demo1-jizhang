import { NavBar, Button, Input, Toast } from "antd-mobile";
import { CalendarOutline } from "antd-mobile-icons";
import './index.scss';
import { typeMap } from "@/utils";
import {  useState } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addBillList } from "@/store/modules/billStore";
import { v4 as uuidv4 } from 'uuid';

function New(){
    const typeMapKeys = Object.keys(typeMap);
    const [activeType ,setActiveType] = useState('pay')
    const [chooseType, setChooseType] = useState('null')
    const [money, setMoney] = useState(0)
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const handleSave = ()=>{
        if(chooseType==='null'){
            Toast.show('请选择一个收支类型')
            return
        }
        if(Number.isNaN(Number(money))){
            Toast.show('钱数必须为数字，请重新输入')
            return
        }
        const bill={
            id:uuidv4(),
            type:activeType,
            payFor:chooseType,
            date:new Date(),
            money:Number(money)
        }
        dispatch(addBillList(bill))
        Toast.show('保存成功')
        navigate('/month')
    }
    return (
        <div className='new'>
            <NavBar back={false} onBack={()=>{
                navigate('/month')
            }} style={{'backgroundColor':'rgb(224, 243, 227)'}}>记一笔</NavBar>
            <div className='top-card'>
                <div className='btn-ctn'>
                    <Button onClick={()=>{setActiveType('income')}}  shape='rounded' size='medium' style={{'--background-color':'white','--text-color':'black'}}>
                        收入
                    </Button>
                    <span>  </span>
                    <Button onClick={()=>{setActiveType('pay')}}  shape='rounded' size='medium' style={{'--background-color':'black','--text-color':'white'}}>
                        支出
                    </Button>
                </div>
                 <div className='input-ctn'>
                    <div className='calendar-icon'>
                        <CalendarOutline /> 今天
                    </div>
                    <Input
                      value={money}
                      className='input'
                      placeholder='0.00'
                      onChange={(val) => {setMoney(val)}}
                      style={{ '--text-align': 'right' }}
                    />
                    <span className='calendar-icon'>
                        ￥
                    </span>
                </div>
            </div>
            <div className='bottom-card'>
                {typeMapKeys.map((key)=>{
                    const item = typeMap[key];
                    if(item.type=== activeType){
                        return (
                        <div key={key} className={classNames('item',{'item-active':chooseType===key})} onClick={(key)=>{setChooseType(key)}}>
                            <span className='icon'>{item.icon}</span>
                            <span className='label'>{item.label}</span>
                        </div>
                    )
                    }
                })}
            </div>
                <Button className='save-ctn' block onClick={handleSave}  shape='rounded' size='small' style={{'--background-color':'rgb(224, 243, 227)','--text-color':'black'}}>
                    保存
                </Button>
        </div>
    );
}

export default New;