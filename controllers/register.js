const handleRegister=(req,res,db,bcrypt)=>{
	
	const {email,name,password}=req.body;
	const hash=bcrypt.hashSync(password);

	if(!email || !name || !password)
		return res.status(400).json('Incorrect form submit');
	
	db.transaction(trx=>{
		trx.insert({
			hash:hash,
			email:email
		})
		.into('login')
		.returning('email')
		.then(loginemail=>{
			console.log(loginemail);
			return trx('users')
				.returning('*')
				.insert({
					email:loginemail[0],
					name:name,
					joined:new Date()
				})
				.then(user=>{
					res.json(user[0]);
				})
				.catch(err=>res.status(400).json('unable to register'));

		})
		.then(trx.commit)
		.catch(trx.rollback);


	})
			 

	//res.json(database.users[database.users.length-1]);

}

module.exports={
	handleRegister:handleRegister
}