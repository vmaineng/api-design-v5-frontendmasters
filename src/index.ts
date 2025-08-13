import {app} from './server.ts';
import { env } from '../env.ts';

app.listen(3000, () => { 
    console.log('server running on port: 3000')
     console.log(`Environment: ${env.APP_STAGE}`)
})

