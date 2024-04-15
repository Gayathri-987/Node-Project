const { Sequelize } = require('sequelize');
const express = require('express')
const cors = require('cors')
const { User,Post,Expenses } = require('./models');


const app = express()
app.use(express.static('public'));
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000'
  }));
  const sequelize = new Sequelize({
    dialect: 'mysql', // Specify the dialect
    host: '127.0.0.1',
    username: 'root',
    password: 'Gayathri@123',
    database: 'sequelize_db',
});

// Test the database connection
async function testDatabaseConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testDatabaseConnection();
  app.get("/",(req,res)=>{
    res.status(200).send("Hello from the server");
  })
// Registration
// app.post('/register', async (req, res) => {
//     const { username, email, role, password } = req.body;
  
//     try {  
//       const user = await User.create({ username, email, role, passwordHash: password });
  
//       return res.json(user);
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json({ error: 'Something went wrong' });
//     }
//   });
  
//   // Login (with existing debugging)
//   app.post('/login', async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       const user = await User.findOne({ where: { email } });
  
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }  
//       const trimmedPassword = password.trim();
//      if (trimmedPassword == user.passwordHash) {
//         return res.json({ message: 'Login successful', userId: user.uuid });
//       }
//       else{
//         return res.status(401).json({ error: 'Invalid password' });
//       }
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json({ error: 'Something went wrong' });
//     }
//   });
// app.get('/users',async(req,res)=>{
//     try{
//         const users = await User.findAll()
//         return res.json(users)
//     } catch(err){
//         console.log(err)
//         return res.status(500).json({error:'something went wrong'})
//     }
// })
// app.delete('/users/:uuid', async (req, res) => {
//     const uuid = req.params.uuid;
//     try {
//         const user = await User.findOne({ where: { uuid } });
        
//         // Check if user exists
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         await user.destroy();
//         return res.json({ message: 'User deleted!' });
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({ error: 'Something went wrong' });
//     }
// });

// app.put('/users/:uuid',async(req,res)=>{
//     const uuid = req.params.uuid 
//     const {username,email,role}=req.body
//     try{
//         const user = await User.findOne({
//             where:{uuid}
//         })
//         user.username=username
//         user.email=email
//         user.role=role
//         await user.save()
//         return res.json(user)
//     } catch(err){
//         console.log(err)
//         return res.status(500).json({error:'Something went wrong'})

//     }
    
// })
// app.get('/users/:uuid', async (req, res) => {
//     const uuid = req.params.uuid;
//     try {
//         const user = await User.findOne({
//             where: { uuid },
//         });
//         return res.json(user);
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({ error: 'Something went wrong' });
//     }
// });
// // Add this route handler in your Express app
// // POST request to create an expense
// // POST request to create an expense
// app.post('/expenses', async (req, res) => {
//     const { uuid, category, amount, date } = req.body;
  
//     // Check if all mandatory fields are present
//     if (!uuid || !category || !amount || !date) {
//       return res.status(400).json({ error: 'All mandatory fields (uuid, category, amount, date) must be provided' });
//     }
  
//     try {
//       // Create the expense in the database
//       const expense = await Expenses.create({ uuid, category, amount, date });
  
//       // Return the created expense as JSON response
//       return res.json(expense);
//     } catch (error) {
//       console.error('Error creating expense:', error);
//       return res.status(500).json({ error: 'Something went wrong' });
//     }
//   });
  
// // GET request to fetch expenses based on UUID
// app.get('/expenses/:uuid', async (req, res) => {
//     const uuid = req.params.uuid; // Get UUID from route parameter
  
//     try {
//       const expenses = await Expenses.findAll({ where: { uuid } });
//       return res.json(expenses);
//     } catch (err) {
//       console.error('Error fetching expenses:', err);
//       return res.status(500).json({ error: 'Something went wrong' });
//     }
//   });
  
  
// app.delete('/expenses', async (req, res) => {
//     try {
//         // Delete all posts from the posts table
//         await Expenses.destroy({
//             where: {}, // Empty where clause deletes all records
//             truncate: true // This option ensures that the table is truncated (cleared)
//         });

//         return res.json({ message: 'All Expenses deleted!' });
//     } catch (err) {
//         console.error('Error deleting posts:', err);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// });

// app.post('/notes', async (req, res) => {
//     const { uuid, title, body } = req.body;
//     try {
//         const user = await User.findOne({ where: { uuid: uuid } });
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         const post = await Post.create({ title, body, userId: user.id });
//         return res.json(post);
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({ error: 'Something went wrong' });
//     }
// });

// app.get('/notes', async (req, res) => {
//     try {
//         const posts = await Post.findAll({
//             attributes: [ 'body','title', 'uuid', 'userId', 'createdAt', 'updatedAt'], // Select only necessary columns
//         });
//         return res.json(posts);
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({ error: 'Something went wrong' });
//     }
// });
// // Update note by ID
// app.put('/notes/:id', async (req, res) => {
//     const noteId = req.params.id;
//     const { title, body } = req.body;

//     try {
//         // Find the note by ID
//         const note = await Post.findOne({ where: { id: noteId } });

//         // If note not found, return error
//         if (!note) {
//             return res.status(404).json({ error: 'Note not found' });
//         }

//         // Update the note's title and body
//         note.title = title;
//         note.body = body;

//         // Save the updated note
//         await note.save();

//         // Return the updated note
//         return res.json(note);
//     } catch (err) {
//         console.error('Error updating note:', err);
//         return res.status(500).json({ error: 'Something went wrong' });
//     }
// });

// app.delete('/notes/:uuid', async (req, res) => {
//     const uuid = req.params.uuid;
//     try {
//         const post = await Post.findOne({ where: { uuid: uuid } });
        
//         // Check if post exists
//         if (!post) {
//             return res.status(404).json({ error: 'Post not found' });
//         }

//         await post.destroy();
//         return res.json({ message: 'Post deleted!' });
//     } catch (err) {
//         console.error('Error deleting post:', err);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// });

const port = process.env.PORT || 5002; // Use port 5002 by default if environment variable PORT is not set
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


