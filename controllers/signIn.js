const handleSignIn=(db,bcrypt)=>(req,res)=>{

	if(!req.body.email || !req.body.password)
		return res.status(400).json('invalid submit')

	db.select('email','hash').from('login')
	  .where('email','=',req.body.email)
	  .then(data=>{
		if(!data)
			res.status(400).json('No user with this email!')
		const isvalid=bcrypt.compareSync(req.body.password,data[0].hash);
	  	console.log(isvalid,data);
	  	if(isvalid){
	  		return db.select('*').from('users')
	  		  .where('email','=',req.body.email)
	  		  .then(user=>{
	  		  	console.log(user);
	  		  	res.json(user[0])
	  		  })
	  		  .catch(err=>res.status(400).json('unable to get user'))

	  	}
	  	else
	  		res.status(400).json('Wrong Credential');
	  })
	  .catch(err=>res.status(400).json('wrong credential'));
}

module.exports={
	handleSignIn:handleSignIn
}