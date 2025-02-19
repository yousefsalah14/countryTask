import express from 'express'
import dotev from "dotenv"
import { connectDB } from './DB/connection.js'
import countryRoutes from './src/modules/country/country.routes.js'
import stateRoutes from './src/modules/state/state.routes.js'
import cityRoutes from './src/modules/city/city.routes.js'

dotev.config()
const app = express()
const port = process.env.PORT

app.use(express.json())
await connectDB()
// Routes
app.use('/country',countryRoutes)
app.use('/state',stateRoutes)
app.use('/city',cityRoutes)
// CORS
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*")
    res.setHeader("Access-Control-Allow-Headers","*")
    res.setHeader("Access-Control-Allow-Methods","*")
    res.setHeader("Access-Control-Private-Network",true)
    return next()
})
app.get('/', (req, res) => res.send('Welcome to Country State City API!🤩'))
app.all('*',(req,res,next)=>{
    return next( new Error("page not Found",{cause:404}))
})


app.use((error,req,res,next)=>{
    const statusCode = error.cause || 500
    return res.status(statusCode).json({
        sucess : false ,
        message : error.message,
        stack: error.stack

    })
})

app.listen(port, () => console.log(` App listening on port ${port}!`))