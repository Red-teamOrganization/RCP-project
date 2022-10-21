

class Home{
    static honorList = async (req, res) =>{
        try{
          let sellers = await sellerModel.find();
          let producers = await producerModel.find()
          let users = sellers.concat(producers)
    
          users.sort((a,b)=>b.numberOfDonations - a.numberOfDonations)
    
          res.status(200).send({
            apiStatus:true,
            data: users,
            message:"seller+producers"
          })
        }
        catch(e){
          res.status(500).send({
            apiStatus:false,
            data:e,
            message:e.message,
          })
        }
       
      }
      static allCharities = async (req,res)=>{
        try{
          let charities = await charityModel.find()
           res.status(200).send({
             apiStatus: true,
             data:charities,
           });   
       }
       catch(e){
         res.status(500).send({
           apiStatus: false,
           date: e,
           message: e.message,
         });
       }
       }
}

module.exports = Home;