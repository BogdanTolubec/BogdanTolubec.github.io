require('dotenv').config()
const exppess = require('express')
const cors = require('cors');
const sequelize = require('./dbConnector')
const models = require('./models/models')
const router = require('./Routers/index')
const errorHandlingMiddleware = require('./middleware/errorHandlingMiddleware')

const app = exppess()

var corsOptions = {
	origin: "http://localhost:3000",
    credentials: true, //access-control-allow-credentials:true
	};

//middlewares
app.use (cors(corsOptions));
app.use(exppess.json())
app.use(exppess.urlencoded({extended: true}))

app.use('/api', router)

//Port
const PORT = process.env.PORT || 5000

//error handler have to be the last!!!!
app.use(errorHandlingMiddleware)

//Server start
const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log('Server started on port ' + PORT))
    } catch(e){
        console.log(e)
    }
}

start()