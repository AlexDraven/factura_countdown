import express from 'express';
import twilio from 'twilio';
require('dotenv').config();
// Create a new express application instance
const app: express.Application = express();
// rest of the code remains same
app.set('port', process.env.PORT || 3000);

// Error handler
const errorHandler = (error: any, req: any, res: any, next: any) => {
  console.log(error.message);
  res.status(500).send(`Something wrong ${error.message}`);
};

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Use error handler
app.use(errorHandler);

// Routes /src/Routes

app.use('/', require('../routes/index'));
app.use('/api/usuarios', require('../routes/users'));
app.post('/events', (req, res) => {
  let to = req.body.to;
  let fromNumber = req.body.from;
  let callStatus = req.body.CallStatus;
  let callSid = req.body.callSid;

  console.log(to, fromNumber, callStatus, callSid);
  res.send('Event received');
});
app.post('/voice', (req, res) => {
  // Generate a TwiML response
  let twiml = new twilio.twiml.VoiceResponse();
  // Talk in a robot voice over the phone.
  twiml.say('Call progress events are rad');
  // Set the response type as XML.
  res.header('Content-Type', 'text/xml');
  // Send the TwiML as the response.
  res.send(twiml.toString());
});

// Starting server
app.listen(app.get('port'), function () {
  console.log('Aplication listening on port ', app.get('port'));
});
