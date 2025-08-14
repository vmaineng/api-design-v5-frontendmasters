import express from 'express'; //ESM modules
import authRoutes from './routes/authRoutes.ts'
import userRoutes from './routes/userRoutes.ts';
import habitRoutes from './routes/habitRoutes.ts'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import { isTestingEnv } from '../env.ts';
import { errorHandler } from './middleware/errorHandler.ts';

const app = express()
app.use(helmet()) //uses it more in higher order functions to pass in options
app.use(cors()) //open everything - if you don't add in cors, you will not get access to it
app.use(express.json()) //if you try to post json into server, youw on't access it with handler
//you'd get the raw binary; you can get access to payload 
app.use(express.urlencoded({extended: true})) 
app.use(morgan('dev', {
    skip: () => isTestingEnv(),
}))

app.get('/health', (req, res) => {
    res.json({message: 'hello'}).status(200)
})

app.use('/api/auth', authRoutes)
//the routers from auth is mounted on this path
//good b/c it's decoupled

app.use('/api/users', userRoutes)
app.use('/api/habits', habitRoutes)

app.use(errorHandler) //global handler

export {app}
export default app