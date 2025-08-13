import express from 'express'; //ESM modules
import authRoutes from './routes/authRoutes.ts'
import userRoutes from './routes/userRoutes.ts';
import habitRoutes from './routes/habitRoutes.ts'

const app = express() 

app.get('/health', (req, res) => {
    res.json({message: 'hello'}).status(200)
})

app.use('/api/auth', authRoutes)
//the routers from auth is mounted on this path
//good b/c it's decoupled

app.use('/api/users', userRoutes)
app.use('/api/habits', habitRoutes)

export {app}
export default app