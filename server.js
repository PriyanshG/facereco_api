const express=require('express');
const bcrypt=require('bcrypt-nodejs');
const bodyParser=require('body-parser');
const cors=require('cors');
const knex=require('knex');


const register=require('./controllers/register')
const signIn=require('./controllers/signIn')
const profile=require('./controllers/profile')
const image=require('./controllers/image')

const db=knex({

  client: 'pg',
  connection: {
    connectionString : 'process.env.DATABASE_URL',
    ssl:true,
  }
});

/*console.log(db.select('*').from('users').then(data=>{
	console.log(data);
}));*/

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

app.get('/',(req,res)=>{res.send('it is working')});

app.post('/signin',signIn.handleSignIn(db,bcrypt));


app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)});


app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)});

app.put('/image',(req,res)=>{image.handleImage(req,res,db)})
app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)})



/*
/--> res==this is working
/signin --> Post success/fail
/register -->POST =user
/profile/:userID -->GET =user
/image --> PUT user

*/

app.listen(process.env.PORT || 3000,()=>{
	console.log(`app is running ${process.env.PORT || 3000}`);
});
