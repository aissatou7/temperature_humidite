express = require('express');
path = require ('path');
mongoose = require('mongoose');
createError = require('http-errors')
cors = require('cors');
bodyParser =require('body-parser');
const app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);



//Here we will avoid Mongoose warming (strictQuery will be 'false')
mongoose.set('strictQuery', true);

//Here we are connecting to data base mongoDb by mongoose
//mongoose.connect('mongodb+srv://aissatou7:766021841Fall@cluster0.wayru7i.mongodb.net/test',
mongoose.connect( "mongodb+srv://papa:2605@cluster0.wepa2rr.mongodb.net/homestead?retryWrites=true&w=majority", 
{useNewUrlParser: true,
useUnifiedTopology: true})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échoué !'));

//Here are adding the constant 'app' using express

//Here are managing body requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: false
}));
//Here are managing CORS sécurity
app.use(cors({origin: "*"}));


//Here we are managing endpoint for access to user model
const userRoute = require('./routes/user.route');
app.use('/endpoint',userRoute);

//Here we are managing server's port (using which are giving by the system or 3000)
const port = process.env.PORT || 2000;
// const port = 8000;
 server.listen(port,() => {
    console.log('Port connected to: ' + port)
});

//initialisation socket
/* var io = require("socket.io")(server); */
io = require('socket.io')(server, 
    {     cors: 
        {origin: "*",
        methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
        credentials: false     }   
    });

//this middelware catch errors when the URL for endpoint is not correct and send them to the next
app.use((req,res,next) =>{
    next( (404))
});

app.get('/',(req,res) => {
    res.send('invalid endpoint')
});

app.use((err,req,res,next) =>{
    if (!err.statusCode) ErrorEvent.statusCode = 500;
    res.status(err.statutsCode).send(err.message);
});

//température et humidité
const {SerialPort} = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const portserie = new SerialPort({ path: '/dev/ttyACM1', baudRate: 14400 })
const parser = portserie.pipe(new ReadlineParser({ delimiter: '\r\n' }))

io.on('connection', () => {
    console.log('a user connected');
  });
parser.on('data', (data)=>{
    console.log(data);
    io.emit('temp',data)
})

 


/* app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    next(); 
})
 */

//données
 var {SerialPort} = require('serialport');
// var {Readline} = Serialport.parsers.Readline;

// var portserial = new Serialport('/dev/ttyUSB0', {
//     baudRate: 9600
// });
const { ReadlineParser } = require('@serialport/parser-readline');

// On lit les donnees par ligne telles quelles apparaissent
parser.on('open', function() {
    console.log('Connexion ouverte');
});



parser.on('data', function(data) {
    console.log('-------DONNES_BRUTE----');
    io.emit('temp', data);
  /*    module.exports = data;  */
    
  
    //decoupe des donnees venant de la carte Arduino
    var temperature = data.slice(0, 2); //decoupe de la temperature
    console.log('-------TEMPERATURE:----');
    console.log(temperature);
    var humidite = data.slice(5, 7); //decoupe de l'humidite
    //calcul de la date et l'heure 
    console.log('-------HUMIDITIE:----');
    console.log(humidite);
   /*  module.exports = {
                      "temperature": temperature, 
                      "humidite": humidite
                     }; */
                    
});
