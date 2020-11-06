const router=require('express').Router()

const bcrypt=require('bcrypt')

const jwt=require('jsonwebtoken')

const User=require('../models/user')

const Refresh=require('../models/refresh')


router.post('/',(req,res)=>{
	//Authorize request
	//if(){}

	//validate request
const {name,email,password}=req.body
	
	if(!name || !email || !password){
		return res.status(422).json({error:'All fields are required'})
	}
	//check if user exists
	User.exists({email:email}, async (err,result)=>{
		if(err){
			return res.status(500).json({error:'Something went wrong'})
		}
		if(result){
			return res.status(422).json({error:'email already exists'})
		} else {
			const hashedPassword=await bcrypt.hash(password,10)
			const user=new User({
				name:name,
				email:email,
				password:hashedPassword
			})

			user.save().then(user=>{
				//JWT access token
				const accessToken=jwt.sign({
					 id:user._id,
					 name:user.name,
					 email:user.email
				},process.env.JWT_TOKEN_SECRET,{expiresIn:'30s'})
				
				//Refresh token
				const refreshToken=jwt.sign({
					 id:user._id,
					 name:user.name,
					 email:user.email
				},process.env.JWT_REFRESH_SECRET)

				
				new Refresh({
					token:refreshToken
				}).save().then(()=>{
					return res.send({
					accessToken:accessToken,
					refreshToken:refreshToken,
					type:'Bearer'
				})

			})


			}).catch(err=>{
				return res.status(500).send({error:'Something went wrong'})
			})
		}
	})
})

module.exports= router