const router=require('express').Router()
const User=require('../models/user')
const jwt=require('jsonwebtoken')
const Refresh=require('../models/refresh')


router.delete('/',(req,res)=>{
	Refresh.deleteOne({token:req.body.token}).then(()=>{
		return res.sendStatus(200)		//Success token
	}).catch(err=>{
		throw err
	})
})


module.exports=router