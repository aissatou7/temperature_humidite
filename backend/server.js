express = require('express');
path = require ('path');
mongoose = require('mongoose');
createError = require('http-errors')
cors = require('cors');
bodyParser =require('body-parser');
const app = express();
const temper = require('./model/temphum.model');

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");




//Here we will avoid Mongoose warming (strictQuery will be 'false')
mongoose.set('strictQuery', true);

//Here we are connecting to data base mongoDb by mongoose
mongoose.connect('mongodb+srv://aissatou7:766021841Fall@cluster0.wayru7i.mongodb.net/test',
//mongoose.connect( "mongodb+srv://papa:2605@cluster0.wepa2rr.mongodb.net/homestead?retryWrites=true&w=majority", 
{useNewUrlParser: true,
useUnifiedTopology: true})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échoué !'));

//Here are adding the constant 'app' using express
/**/





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

const portserie = new SerialPort({ path: '/dev/ttyACM0', baudRate: 14400 })
const parser = portserie.pipe(new ReadlineParser({ delimiter: '\r\n' }))

io.on('connection', () => {
    console.log('a user connected');
  });
parser.on('data', (data)=>{

    io.emit('temp',data)
})

// var Serialport = require('serialport');
// const { error } = require('console');
// var Readline = Serialport.parsers.Readline;
// var serialport=`require('serialport')`;
// var port2 = new Serialport('/dev/ttyACM0', {
//     baudRate: 9600
// });

 //const parser = port2.pipe(new Readline({ delimiter: '\r\n' }))
//  console.log(parser);
parser.on("data", (data)=>{
    console.log(data);
    let tempy = data.split('/')
     let temperer = tempy[0]
    let humidy = tempy[1]
 
const Data = temper;
  //calcul de la date et l'heure 
 
  var datHeure = new Date();
  var min = datHeure.getMinutes();
  var heur = datHeure.getHours(); //heure
  var sec = datHeure.getSeconds(); //secondes
  var mois = datHeure.getDate(); //renvoie le chiffre du jour du mois 
  var numMois = datHeure.getMonth() + 1; //le mois en chiffre
  var laDate = datHeure.getFullYear(); // me renvoie en chiffre l'annee
  if (numMois < 10) { numMois = '0' + numMois; }
  if (mois < 10) { mois = '0' + mois; }
  if (sec < 10) { sec = '0' + sec; }
  if (min < 10) { min = '0' + min; }
  var heurei = heur + ':' + min + ':' + sec;
  var datei = mois + '/' + numMois + '/' + laDate;


if ( sec == 00 ) {
    console.log('IL EST 8H');  
  /*   var tempe = parseInt(temperer);
    var humi = parseInt(humidy); */
  
    //l'objet qui contient la temperature, humidite et la date
     var tempEtHum =('data', { temperature8h : temperer,
    humidite8h: humidy,
    temperature12h : 00,
    humidite12h :00,
    temperature18h: 00,
    humidite18h : 00,
    temperatureM: 00,
    humiditeM : 00,
     date : datei,
     heure : heurei    
             });  
    // insertion Temperature et humidite
   const newData = new Data(tempEtHum);   
    newData.save((err)=>{
        if(err) {
            console.log(err)
        }else{
            console.log('les données de 8H sont inserées');
        }
    });
   }  
  

    if  ( sec == 10 )  {
         console.log('IL EST 12H');
    Data.updateOne({date: datei}, { $set: {temperature12h :temperer, humidite12h :humidy,} }, (err, data) => {
        if (err) {
            console.log(err);
        } else { 
       /*      res.json(data); */
             console.log('les données de 12H sont inserées')

        }
    }); 
} 


 if  ( sec == 20 ) {
    console.log('IL EST 18H');
Data.updateOne({date: datei}, { $set: {temperature18h :temperer, humidite18h :humidy,} }, (err, data) => {
   if (err) {
       console.log(err);
   } else { 
  /*      res.json(data); */
      console.log('les données de 18H sont inserées')

   }
}); 
} 




/*   var res; */
if  ( sec == 3600 ) {
    console.log('LA MOYENNE DE LA JOURNÉE');
  Data.findOne({date: datei}, (err, data) => {
    if (err) {
        console.log(err);
    } else {
    
        //console.log(data.humidite18h);

        temperatureSomme =(  data.temperature8h +  data.temperature12h + data.temperature18h );
        temperatureM  = temperatureSomme/3
       // console.log(temperatureM);

        humiditeSomme = (data.humidite8h +  data.humidite12h + data.humidite18h);
        humiditeM  = humiditeSomme/3
       // console.log(humiditeM);

       
        Data.updateOne({date: datei}, { $set: {temperatureM :temperatureM, humiditeM :humiditeM,} }, (err, data) => {
           if (err) {
               console.log(err);
           } else { 
          /*      res.json(data); */
              console.log('les données moyennes sont inserées')
        
           }
        }); 




    }
});
  }







   // module.exports = {"temperer":temperer, "humidy":humidy};
  
    
});




 
 
                    

