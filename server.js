const express=require('express')
const mongoose=require('mongoose')
const app=express()
const port=process.env.PORT || 3000

//database connection
const url='mongodb://localhost/node-api'
mongoose.connect(url,
	{useNewUrlParser:true,
	useCreateIndex:true,
	useUnifiedTopology:true, 
	useFindAndModify:true})
const connection=mongoose.connection

connection.once('open',()=>{
	console.log('Database connected')
}).catch(err=>{
console.log('Database error')
})

//
app.use(express.json())

//routes
const articlesRoutes=require('./routes/articles')
app.use('/api/articles',articlesRoutes)



app.listen(port,(err)=>{
	console.log(`listening on port ${port}`)
})