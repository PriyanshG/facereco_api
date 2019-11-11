const express=require('express');
const bcrypt=require('bcrypt-nodejs');
const bodyParser=require('body-parser');
const cors=require('cors');

const app=express();

// app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());
app.use(cors());

const database={
	users:[
		{
			id:'1',
			name:'Aman',
			email:'aman@gmail.com',
			password:'cook',
			entries:0,
			joined:new Date(),
		},
		{
			id:'2',
			name:'Amit',
			email:'amit@gmail.com',
			password:'cook',
			entries:0,
			joined:new Date(),
		}
	],
	login:[
		{
			id:'987',
			hash:'',
			email:'aman@gmail.com'
		}
	]
}

app.get('/',(req,res)=>{
	res.send(database.users);
});

app.post('/signin',(req,res)=>{

	
	//res.json('dfs');
	//console.log(req.body);
	//console.log(req.body);
	if(req.body.email===database.users[0].email && req.body.password===database.users[0].password){
		/*console.log('dfsdsa');*/
		res.json(database.users[0]);
	}
	else {
	/*	console.log('sd');*/
		res.status(400).json('Cannot lauda');
	}
});


app.post('/register',(req,res)=>{
	
	const {email,name,password}=req.body;
	bcrypt.hash(password,null,null,function(err,hash){
		console.log(hash);
	});
	database.users.push({
		id:'3',
		name:name,
		email:email,
		entries:0,
		joined:new Date(),
	});

	res.json(database.users[database.users.length-1]);

});


app.get('/profile/:id',(req,res)=>{

	const{id}=req.params;
	let flag=0;
	database.users.forEach(user=>{
		if(user.id===id){
			flag=1;
			return res.json(user);
		}
	});
	if(!flag)
		res.json('No user found');

});

app.put('/image',(req,res)=>{
	
	const{id}=req.body;
	let flag=false;
	database.users.forEach(user=>{
		if(user.id===id){
			flag=1;
			user.entries++;
			return res.json(user.entries);
		}
	})

	if(flag===0)
		res.status(400).json('not found');

})

app.listen(3000,()=>{
	console.log('app is running');
})



/*
/--> res==this is working
/signin --> Post success/fail
/register -->POST =user
/profile/:userID -->GET =user
/image --> PUT user

*/
