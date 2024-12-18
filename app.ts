import express from 'express';
import submissionRoutes from './routes/submissions';
import path from 'path';

// 1-Enterance
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

// 2-Session

// 3-Views 
app.set('views',path.join(__dirname,'views'));
console.log(__dirname)
app.set('view engine', "ejs");

// 4-Routers 
app.use('/api/submissions', submissionRoutes);



export default app;
