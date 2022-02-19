let express = require('express');
let mongoose = require('mongoose');

let todorouter = require('./todos/todorouter');
let app=express();

let PORT=process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/todos',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>console.log('Connection Successful!'))
.catch(err=>console.log(err));
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}));
app.use(express.static('./views/temp/'));
app.use('/todo',todorouter);

app.listen(PORT,()=>{
    console.log("Server listening on http://localhost:"+PORT);
})