const express = require('express');
const cors = require("cors");
const jwt=require('jsonwebtoken');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const classRoutes = require('./routes/classRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const publicPath = path.join(__dirname,'public')
const templateDirPath = path.join(__dirname,'views')

app.use(express.static(publicPath))
app.set('view engine' ,'ejs')
app.set('views' , templateDirPath)
app.use(cookieParser());
app.use(express.json({limit : '50mb'}));
app.use(express.urlencoded({ extended: true , limit: '50mb' }))
app.use(userRoutes);
app.use(classRoutes);
app.use(assignmentRoutes);
app.use(submissionRoutes);

// connect database
const db = process.env.dbURI

mongoose.connect( db,{
    useNewUrlParser: true,
    useUnifiedTopology : true
});

const port = process.env.PORT || 5000

app.get('/',  (req,res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.jwt_secret, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.render('signIn')
      } else {
        res.redirect('/class')
      }
    });
  } else {
    res.render('signIn')
  }
})

app.get('*' , (req,res) => {
  res.render('error')
})

app.listen(port,() => {
    console.log('Server is running on port, ' ,port)
})