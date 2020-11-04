const router=require('express').Router()
const Article=require('../models/article')

//Create

router.post('/',async (req,res)=>{

	const{title,body,author}=req.body	//Object destructuring

	const article=new Article({
		title,
		body,
		author
	})
	//
	//Callbacks	()={}
	//
	// article.save((err,document)=>{
	// 	if(err){
	// 		throw err
	// 	}
	// 	return res.status(201).json(document)
	// })
	//
	//Promises	.then
	//
	// article.save().then((document)=>{
	// 	res.status(201).json(document)
	// }).catch(err=>{
	// 	throw err
	// })
	//
	//
	//
	try{
		const document=await article.save()
	return res.status(201).json(document)

	}
	catch(err){
		throw err
	}
	
})

//Read

router.get('/:id',(req,res)=>{
	const {id}=req.params
	Article.findOne({_id:id},(err,document)=>{
		if(err){
			throw err
		}
		if(document){
			return res.json(document)
		}else{
			return res.status(404).json({error:'Article not found'})
		}
	})
})

//Update by patch(it only updates some fields) but by put(it also updates but if it hasn't receive any data to update then it create a new data of same model)

router.patch('/:id',(req,res)=>{

	const{id}=req.params
	const{title,body,author}=req.body	//Object destructuring
	Article.findOne({_id:id},(err,document)=>{
		if(err){
			throw err
		}
		if(document){
			Article.updateOne({_id:id},
			{
				title,
				body,
				author
			}).then(status=>{
				return res.json(req.body)
			}).catch(err=>{
				throw err
			})
			
		}else{
			return res.status(404).json({error:'Article not found'})
		}
	})

})

//Read whole database

router.get('/',(req,res)=>{
	Article.find((err,articles)=>{
		if(err)
		{
			throw err
		}
		return res.json(articles)
	})
})

//Delete single article

router.delete('/:_id',(req,res)=>{
	const {_id}=req.params
	Article.deleteOne({_id}).then((status)=>{
		//console.log(status) => { n: 1, ok: 1, deletedCount: 1 }
		return res.json({id:_id})
		}).catch(err=>{
			return res.status(500).json({error:'Something went wrong'})
		})
})



module.exports=router