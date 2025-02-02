const express = require('express');
const app = express();
const cors = require('cors');
const upload = require('express-fileupload')
const port = process.env.PORT || 5500

app.use(express.static(__dirname+'/assets'))
app.use(upload())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use('/', require('./AllRoutes/AllRouter'));

app.listen(port, ()=>{
  console.log(`server running on port ${port}`);
});