import {app} from './server.ts';
import { Env } from '../env.ts';

app.listen(3000, () => { 
    console.log('server running on port: 3000')
})