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
  Shopping: { label: '购物', icon: 'expense' },
  Food: { label: '餐饮', icon: 'expense' },
  Transport: { label: '交通', icon: 'expense' },
  Accommodation: { label: '住宿', icon: 'expense' },
  Entertainment: { label: '娱乐', icon: 'expense' },
  Medical: { label: '医疗', icon: 'expense' },
  Education: { label: '教育', icon: 'expense' },
  Daily: { label: '日用', icon: 'expense' },

  // 收入类型
  Salary: { label: '工资', icon: 'income' },
  'Part-time': { label: '兼职', icon: 'income' },
  Investment: { label: '理财', icon: 'income' },
  Bonus: { label: '奖金', icon: 'income' },
  'Red Packet': { label: '红包', icon: 'income' },

  // 账单类型
  income: '收入',
  expense: '支出'
};

export {typeMap}
export const billList = generateBillList();