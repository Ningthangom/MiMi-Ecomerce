const Order = require('../models/order');
const User = require('../models/user');


exports.orders = async (req, res) => {
    console.log("orders func is called inside admin")
    let orders = await Order
            .find({})
            .sort("-createdAt")
            .populate("products.product")
            .populate("orderdBy")
            .exec();
    res.json(orders)
  /*   console.log(orders); */
}


exports.orderStatus = async (req, res) => {
    const {orderId, orderStatus} = req.body;

    let updated = await Order
    .findByIdAndUpdate(orderId, {orderStatus}, {new : true})
    .exec();

    res.json(updated)
}

exports.dailySales = async (req, res) => {
  let start = new Date()
  start.setHours(0,0,0,0);

  var end = new Date();
  end.setHours(23,59,59,999);

  const numberofpickup  = 0;
 /*  let sale = await Order.aggregate([{$match: {createdAt: {$gte: start, $lt: end}}, totalsales : {"$"}}]); */
 let sale = await Order.aggregate([
  { $match: { createdAt: 
      { $gte: start, $lt: end}}
  },
  {$group: { _id : {
          year:{$year:"$createdAt"},
          month:{$month:"$createdAt"},
          day:{$dayOfMonth:"$createdAt"}
      },
      totalSales:{$sum: "$paymentIntent.amount"},
     
  }
}
])
 res.json(sale);
}

      exports.weeklySales = async (req, res) => {
       /*  console.log("req body: ", req.body) */
        const { Sdate, Edate} = req.body.date;
      /*   Sdate.setHours(0,0,0,0);
        Edate.setHours(23,59,59,999) */
    /*     console.log("startDate: ", new Date(Sdate).setUTCHours(0,0,0,0))
        console.log("endDate: ", new Date(Edate).setUTCHours(23,59,59,999)) */

      /*  let start =new Date(new Date() - 7 * 60 * 60 * 24 * 1000);
        console.log(start)
        start.setHours(0,0,0,0);
      let newDate = new Date('2021-12-25T10:06:06.000Z')
        newDate.setUTCHours(0,0,0,0)
        console.log("this is setting back ", newDate.toISOString())
      var end = new Date();   */

      let start = new Date(Sdate);
      start.setUTCHours(0,0,0,0)
        let end = new Date(Edate);
      end.setUTCHours(23,59,59,999)

      
      /*  let sale = await Order.aggregate([{$match: {createdAt: {$gte: start, $lt: end}}, totalsales : {"$"}}]); */
      let sale = await Order.aggregate([
        { $match: { createdAt: 
            { $gte: start, $lt: end}}
        },
        {$group: { _id : {
                year:{$year:"$createdAt"},
                month:{$month:"$createdAt"},
                day:{$dayOfMonth:"$createdAt"}
            },
            totalSales:{$sum: "$paymentIntent.amount"},
            
            
        },
        
      },

      ])
      const totalSale = function(items, prop){
        return items.reduce(function(a,b){
          return a + b[prop]
        },0)
      }


      const saleAfteradding = totalSale(sale, 'totalSales')

      // sorting the array by day of the week
      const sortedArray = sale.sort(function(a,b){
        return (b._id.day) - (a._id.day) 
      })

      console.log('start date before filteredOrder', start)
      console.log('end date before filteredOrder', start)
      const filteredOrder = await Order.find({ createdAt: 
        { $gte: start, $lt: end}
      })
      .sort("-createdAt")
      .populate("orderdBy")
      .populate("products.product")
      .exec();

      console.log("filterorder: ", filteredOrder.length)

        /* console.log("sortedArry: ",sortedArray,"total sales: ", saleAfteradding, filteredOrder.length);  */ 
      res.json({lengthofarray: sale.length, sortedArray, weeklySalesum: saleAfteradding, filteredOrder });
      }