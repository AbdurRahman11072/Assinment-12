require("dotenv").config();
const express = require("express");
const { MongoClient,ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { default: Stripe } = require("stripe");
const app = express();
const stripe = require('stripe')('sk_test_51OJ23dBHGqDOqm4OiUYaH61FXHwgnMIZHGaqm91CCuRVt83vXIAaZzpvHVHH7NMYMoUzoIARnisuJnV3lMX9uz5a00OM0gATro');
const port = process.env.PORT || 5000;



app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173",
    "https://server-pi-blush-73.vercel.app",
    "https://ass12-cc8ec.firebaseapp.com"   ,
    "https://ass12-cc8ec.web.app"  
  
  
  ],
    credentials: true,
  })
);

const uri = "mongodb+srv://rahman:12345@cluster0.nxhbkwn.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
  // Jwt
  app.post('/jwt', async(req, res)=>{
   try{
    const user = req.body
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})

    res
    .cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // Adjust based on your requirements
      // maxAge: // how much time the cookie will exist
  })
    .send({success: true})
   }
   catch(err){
    console.log(err);
       }
  });

  // middleware
const verifyToken = async(req, res, next)=>{
  try{
    const token = req?.cookies?.token
  // console.log('value of token ', token);
  if(!token){
      return res.status(401).send({message: 'Not Authorized'})
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) =>{
    if(err){
      // console.log(err);
      return res.status(401).send({message: 'Not Authorized'})
    }
    // console.log('value in the token', decoded);
    req.user = decoded
    next()
  })

  }
  catch(err){
    console.log(err);
  }
  
}
  

  app.post('/logout', async(req, res)=>{
    try{
      const user = req.body
    res.clearCookie('token',{maxAge: 0}).send({success: true})

    }
    catch(err){
      console.log(err);
         }
  });

  // mongodb connection techproduct

const productdata = client.db("techproduct").collection("product");
const review = client.db("techproduct").collection("review");
const report = client.db("techproduct").collection("report");
const usercontrol = client.db("techproduct").collection("usercontrol");
const productqueue = client.db("techproduct").collection("productqueue");
const rejectedproduct =  client.db("techproduct").collection("reject");
const feature =  client.db("techproduct").collection("feature");
const coupon =  client.db("techproduct").collection("coupon");



// get all productdata 
app.get("/allproduct", async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);

    if (isNaN(page) || isNaN(size) || page < 0 || size < 0) {
      return res.status(400).send("Invalid page or size parameters");
    }

    const cursor = productdata.find();
    const result = await cursor.skip(page * size).limit(size).toArray();
    res.send(result);
  } catch (error) {
    console.error("Error in /allproduct:", error);
    res.status(500).send("Internal Server Error");
  }
});

// get productqueue, post productqueue, delete productqueue
app.get("/productqueue", async(req,res) => {
  try {
  const cursor =productqueue.find({status:"Prime"});
    const result = await cursor.toArray();
    res.send(result)
  } catch (error) {
 console.log(error);     
  }
});
app.post("/productqueue", async (req,res) => {
  try {
      const product = req.body;
      console.log(req.body);
      const result = await productqueue.insertOne(product)
      res.send(result)
  } catch (error) {
      console.log(error);
  }
})

app.delete("/productqueue/:id", async (req,res) =>{
  try {
    const id = req.params.id
    const query = { _id: new ObjectId(id)  }; 
    const result = await productqueue.deleteOne(query)
    res.send(result)
  } catch (error) {
    console.log(error);
  }
})

// get productdata, post productdata ,update productdata
app.get("/product", async (req, res) =>{
  try {
    const cursor =productdata.find();
    const result = await cursor.toArray();
    res.send(result)
  } catch (error) {
 console.log(error);     
  }
});

app.post("/product",async (req,res) => {
  try {
    const product = req.body;
    console.log(req.body);
    const result = await productdata.insertOne(product)
    res.send(result)
} catch (error) {
    console.log(error);
}
})

app.delete("/product/:id", async (req,res) =>{
  try {
    const id = req.params.id;
    console.log(id);
    const query = { _id: (id)  }; 
    const result = await productdata.deleteOne(query)
    console.log(result);
    res.send(result)
  } catch (error) {
    console.log(error);
  }
})

app.put("/product/:id",async (req, res) => {
  try {
    const id = { _id:(req.params.id) };
  const body = req.body;
  console.log(body);
  const updatedData = {
    $set: {
      ...body,
    },
  };
  const option = { upsert: true };
  const result = await productdata.updateOne(id, updatedData, option);
  console.log(body);
  res.send(result);
  } catch (error) {
    console.log(error);
  }
});

// rejected productdata 
app.get("/rejectedproduct", async(req,res) =>{
  const cursor = rejectedproduct.find();
  const result = await cursor.toArray();
  res.send(result)
})

app.post("/rejectedproduct",async (req,res) => {
  try {
    const product = req.body;
    console.log(req.body);
    const result = await rejectedproduct.insertOne(product)
    res.send(result)
} catch (error) {
    console.log(error);
}
})

// get,add review 

app.get("/review", async(req,res) =>{
  const cursor = review.find();
  const result = await cursor.toArray();
  res.send(result)
})

app.post("/review",async (req,res) => {
  try {
    const product = req.body;
    console.log(req.body);
    const result = await review.insertOne(product)
    res.send(result)
} catch (error) {
    console.log(error);
}
})


// get add remove feature product 

app.get("/feature", async(req,res) =>{
  const cursor = feature.find();
  const result = await cursor.toArray();
  res.send(result)
})

app.post("/feature",async (req,res) => {
  try {
    const product = req.body;
    console.log(req.body);
    const result = await feature.insertOne(product)
    res.send(result)
} catch (error) {
    console.log(error);
}
})
app.delete("/feature/:id", async (req,res) =>{
  try {
    const id = req.params.id;
    console.log(id);
    const query = { _id: (id)  }; 
    const result = await feature.deleteOne(query)
    console.log(result);
    res.send(result)
  } catch (error) {
    console.log(error);
  }
})

// get add and update usercontrol

app.get("/user",  async(req,res) =>{
  const cursor = usercontrol.find();
  const result = await cursor.toArray();
  res.send(result)
})

app.post("/user",async (req,res) => {
  try {
    const product = req.body;
    console.log(req.body);
    const result = await usercontrol.insertOne(product)
    res.send(result)
} catch (error) {
    console.log(error);
}
})

app.put("/user/:id",async (req, res) => {
  try {
    const id = { _id:new ObjectId(req.params.id) };
  const body = req.body;
  console.log(body);
  const updatedData = {
    $set: {
      ...body,
    },
  };
  const option = { upsert: true };
  const result = await usercontrol.updateOne(id, updatedData, option);
  console.log(body);
  res.send(result);
  } catch (error) {
    console.log(error);
  }
});





app.get("/report", async(req,res) =>{
  try {
    const cursor = report.find();
    const result = await cursor.toArray();
    res.send(result)
  } catch (error) {
    console.log(error);
  }
})

app.post("/report",async (req,res) => {
  try {
    const product = req.body;
    console.log(req.body);
    const result = await report.insertOne(product)
    res.send(result)
} catch (error) {
    console.log(error);
}
})
app.delete("/report/:id", async (req,res) =>{
  try {
    const id = req.params.id;
    console.log(id);
    const query = { _id: (id)  }; 
    const result = await report.deleteOne(query)
    console.log(result);
    res.send(result)
  } catch (error) {
    console.log(error);
  }
})

app.get("/coupon", async(req,res) =>{
  try {
    const cursor = coupon.find();
    const result = await cursor.toArray();
    res.send(result)
  } catch (error) {
    console.log(error);
  }
})

app.post("/coupon",async (req,res) => {
  try {
    const product = req.body;
    console.log(req.body);
    const result = await coupon.insertOne(product)
    res.send(result)
} catch (error) {
    console.log(error);
}
})
app.delete("/coupon/:id", async (req,res) =>{
  try {
    const id = req.params.id;
    console.log(id);
    const query = { _id: (id)  }; 
    const result = await coupon.deleteOne(query)
    console.log(result);
    res.send(result)
  } catch (error) {
    console.log(error);
  }
})

app.post("/create-payment-intent", async (req, res) =>{
  try {
    const {price} = req.body;
  const amount = parseInt(price * 100)
  console.log(price);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ['card']
  });

  res.send({
    clientSecret: paymentIntent.client_secret
  });
  } catch (error) {
    console.log(error);
  }
})



async function run() {
  try {
    client.connect();
     client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await client.close();
  }
  }

  

  
  

app.get("/", (req, res) => {
    res.send("Crud is running...");
  });
  app.get("/jwt", (req, res) => {
    res.send("Crud is running...");
  });
  
  
  app.listen(port, () => {
    console.log(`Simple Crud is Running on port ${port}`);
  });
  run().catch(console.dir);
