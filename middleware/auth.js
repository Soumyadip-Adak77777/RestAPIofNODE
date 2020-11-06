const jwt=require('jsonwebtoken')


function auth(req,res,next){
	let authHeader=req.headers.authorization
	if(authHeader){
		let token=authHeader.split(' ')[1]
		
		jwt.verify(token,process.env.JWT_TOKEN_SECRET,(err,user)=>{
			if(err){
				return res.sendStatus(403)		//request forbidden(unknown user)
			}
			req.user=user
			next()
		})
	}else{
		res.sendStatus(401)			//Unauthorized user
	}
	/*
		testing...
	console.log(authHeader)
	return res.sendStatus(422)		//Unprocessable Entity
	next()*/
}


module.exports=auth