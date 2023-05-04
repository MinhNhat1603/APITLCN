const Order = require("../model/orderModel");

const  statiscal ={
    statiscalWeek: async (req, res)=>{
        try {
            var startDate = req.query.startDate;
            var endDate = req.query.endDate;
            const weeks = getWeeks(startDate, endDate);
            var orders =[];
            for(let i=0; i<weeks.length;i++){
                const order = await Order.find({
                    createdAt: {
                      $gte: weeks[i].startDate,
                      $lte: weeks[i].endDate
                  },
                   status:{
                       $gte: 0
                  }
                });
                //orders.push(order);
                // const bill =order.length;
                // var money=0;
                // for(let j = 0; j <bill; j++){
                //     money += order[j].totalPrice
                // }
                const report = {
                    startDate: weeks[i].startDate,
                    endDate:  weeks[i].endDate,
                    // bill: bill,
                    // money: money
                    orderlist: order
                };
                orders.push(report);
            }
            res.status(200).json(orders);  
        } catch (error) {
            res.status(500).json(error);
        }
    },
    statiscalMonth: async (req, res)=>{
        try {
            var startDate = req.query.startDate;
            var endDate = req.query.endDate;
            const months = getMonths(startDate, endDate);
            var orders =[];
            for(let i=0; i<months.length;i++){
                const order = await Order.find({
                    createdAt: {
                      $gte: months[i].startDate,
                      $lte: months[i].endDate
                  },
                   status:{
                       $gte: 0
                  }
                });
                const report = {
                    //startDate: months[i].startDate,
                    //endDate:  months[i].endDate,
                    month: months[i].month,
                    year: months[i].year,                    
                    orderlist: order
                };
                orders.push(report);
            }
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
module.exports = statiscal;

function getWeeks(startDate, endDate) {
    const weeks = [];
    let currentDate = new Date(startDate);
    let endDateObj = new Date(endDate);
  
    while (currentDate <= endDateObj) {
      let weekStart = new Date(currentDate);
      weekStart.setDate(currentDate.getDate() + (1 - currentDate.getDay()));
      weekStart =new Date(Date.parse(weekStart));
      let weekEnd = new Date(currentDate);
      weekEnd.setDate(currentDate.getDate() + (7 - currentDate.getDay()));
      weekEnd = new Date(Date.parse(weekEnd));
      weeks.push({
        startDate: new Date(weekStart),
        endDate: new Date(weekEnd),
      });
  
      currentDate.setDate(currentDate.getDate() + 7);
    }
  
    return weeks;
}
function getMonths(startDate, endDate) {
  const months = [];
  let currentDate = new Date(startDate);
  let endDateObj = new Date(endDate);

  while (currentDate <= endDateObj) {
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let monthStart = new Date(year, currentDate.getMonth() , 1);
    let nextMonthStart = new Date(year, currentDate.getMonth() + 1, 1);

    months.push({
      year: year,
      month: month,
      startDate: monthStart.toISOString(),
      endDate: nextMonthStart.toISOString(),
    });

    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return months;
}