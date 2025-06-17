import { ReactComponent as ShoppingIcon } from '@/assets/icons/gouwu.svg';
import { ReactComponent as FoodIcon } from '@/assets/icons/canyin.svg';
import { ReactComponent as TransportIcon } from '@/assets/icons/jiaotongfei.svg';
import { ReactComponent as AccommodationIcon } from '@/assets/icons/zhusu.svg'; 
import { ReactComponent as EntertainmentIcon } from '@/assets/icons/yule.svg';
import { ReactComponent as MedicalIcon } from '@/assets/icons/yiliaofuwu.svg';  
import { ReactComponent as EducationIcon } from '@/assets/icons/jiaoyu.svg';
import { ReactComponent as DailyIcon } from '@/assets/icons/riyongpin.svg';
import { ReactComponent as SalaryIcon } from '@/assets/icons/salary.svg';
import { ReactComponent as PartTimeIcon } from '@/assets/icons/qujianzhi.svg';
import { ReactComponent as InvestmentIcon } from '@/assets/icons/licai.svg';
import { ReactComponent as BonusIcon } from '@/assets/icons/wode-wodejiangjin.svg';
import { ReactComponent as RedPacketIcon } from '@/assets/icons/hongbao.svg';

const billTypes = {
  income: ['Salary', 'Part-time', 'Investment', 'Bonus', 'Red Packet'],
  pay: ['Shopping', 'Food', 'Transport', 'Accommodation', 'Entertainment', 'Medical', 'Education', 'Daily']
};

function generateBillList() {
  const bills = [];
  
  for (let i = 0; i < 200; i++) {
    // 生成均匀分布的时间
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1; // 避免月末日期问题
    const hour = Math.floor(Math.random() * 24);
    const minute = Math.floor(Math.random() * 60);
    const date = new Date(2025, month - 1, day, hour, minute);
    
    // 随机决定是收入还是支出
    const isIncome = Math.random() > 0.7; // 30%概率是收入
    const type = isIncome ? 'income' : 'pay';
    
    // 根据类型随机选择二级类型
    const subTypes = billTypes[type];
    const subType = subTypes[Math.floor(Math.random() * subTypes.length)];
    
    // 生成随机金额
    let amount;
    if (isIncome) {
      amount = Math.floor(Math.random() * 10000 + 1000); // 收入1000-11000
    } else {
      amount = -Math.floor(Math.random() * 1000 + 100); // 支出-100到-1100
    }
    
    bills.push({
      id: `bill_${i + 1}`,
      date: date.toISOString(),
      type: type,
      payFor: subType,
      money: amount
    });
  }
  
  // 按时间排序
  return bills.sort((a, b) => new Date(a.date) - new Date(b.date));
}
const typeMap = {
  // 支出类型
  Shopping: { label: '购物', icon: <ShoppingIcon /> },
  Food: { label: '餐饮', icon: <FoodIcon /> },
  Transport: { label: '交通', icon: <TransportIcon /> },
  Accommodation: { label: '住宿', icon: <AccommodationIcon /> },
  Entertainment: { label: '娱乐', icon: <EntertainmentIcon /> },
  Medical: { label: '医疗', icon: <MedicalIcon /> },
  Education: { label: '教育', icon: <EducationIcon /> },
  Daily: { label: '日用', icon: <DailyIcon /> },

  // 收入类型
  Salary: { label: '工资', icon: <SalaryIcon /> },
  'Part-time': { label: '兼职', icon: <PartTimeIcon /> },
  Investment: { label: '理财', icon: <InvestmentIcon /> },
  Bonus: { label: '奖金', icon: <BonusIcon /> },
  'Red Packet': { label: '红包', icon: <RedPacketIcon /> },

  // 账单类型
  income: '收入',
  expense: '支出'
};

export {typeMap}
export const billList = generateBillList();