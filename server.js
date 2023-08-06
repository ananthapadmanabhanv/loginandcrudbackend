const express =require("express");
const mysql= require("mysql");
const cors=require("cors");

const app=express();
app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"ambuHB58",
   
    database:"signup"
});
db.connect(function(err) {
    if (err) throw err;
    console.log("Connected to the database!");
    
    app.listen(8081, () => {
      console.log("Server is listening on port 8081");
    });
  });
  

/*app.post('/fetchuserid',(req,res)=>{
  const sql2="SELECT userid FROM login where emailid LIKE ?";
  console.log('valuepassedtousernamefetch',req.body);
  const values=req.body;
  db.query(dql2,req.body.user,(err,data)=>{
    if(err){
      console.error(err);
      return res.status().json("Error in query");
    }
    else
    {
      console.log('userid',data);
    }
  })
})*/
app.post('/show', (req, res) => {
  console.log('passed to show',req.body.emailid);
 const sql="SELECT orderno,itemname,quantity,price FROM crud WHERE emailid LIKE ?";
 const values=req.body.emailid;
 db.query(sql,[req.body.emailid],(err,data)=>{
  if(err)
  {
    console.error(err);
    return res.status().json("Error in query");
  }
  else{
    // console.log(data);
    console.log('data',data);
     
     console.log('count',data[0].itemname);
     //console.log("count",cnt);
    // const isTaken=count>0;
    // console.log("value",isTaken);
    return res.json(data);
   }
 })
});


app.post('/checkuserid',(req,res)=>{
   // console.log([req.body.userid]);
    const sql="SELECT count(*) as cnt FROM login WHERE userid LIKE ?";
    const values=[req.body.userid,req.body.emailid, req.body.password];
    console.log('requestbody_usernamecheck',req.body);
    db.query(sql, req.body.userid, (err, data) => {
        if (err) {
          console.error(err);
          return res.status().json( "Error in query" );
        }
        else{
         // console.log(data);
         console.log('data',data);
          var count =data[0].cnt;
          console.log('count',data[0].cnt);
          //console.log("count",cnt);
         // const isTaken=count>0;
         // console.log("value",isTaken);
          if(data[0].cnt>0)
          {
            return res.json("True");
          }
          else
          {
          return res.json("False");
          }
        }
    
        
      });
})

app.post('/insert',(req,res)=>{
  const sql="INSERT INTO crud (emailid,itemname,quantity,price) VALUES (?,?,?,?)";
  const values=[req.body.emailid,req.body.itemname,req.body.quantity,req.body.price];
  console.log('values_home',req.body);
  db.query(sql, values, (err, data) => {
    if (err) {
      console.error(err);
      return res.status().json( "Error:in crud!" );
    }
    else
    {
    return res.json({ data });
    }
  });
})

app.post('/signup', (req, res) => {
   
    
    const sql = "INSERT INTO login (`userid`, `emailid`, `password`) VALUES (?,?,?)";
    const values = [
        req.body.userid, req.body.emailid, req.body.password];
  console.log('values', req.body);
    db.query(sql, values, (err, data) => {
      if (err) {
        console.error(err);
        return res.status().json( "Error" );
      }
      else
      {
      return res.json({ data });
      }
    });
  });
  
  app.post('/del',(req,res)=>{
    const sql="DELETE FROM crud WHERE orderno=?";
    const values=[ req.body.delid];
  })
  

app.post('/login',(req,res)=>{
    console.log(req.body.emailid ,req.body.password);
    const sql="SELECT userid FROM login WHERE emailid LIKE ? AND password LIKE ?";
    console.log(req.body.emailid,req.body.password);
    db.query(sql,[req.body.emailid,req.body.password],(err,data )=> {
        if(err){
            return res.json("Error");
        }
        if(data.length>0){
            return res.json("Success");

        }else{
            return res.json("Fail");
        }
    })
})





