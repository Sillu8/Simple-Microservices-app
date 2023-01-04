const express = require('express');
const axios = require('axios');



const app = express();
app.use(express.json());


const events = [];


app.post('/events', (req, res) => {
    const event = req.body;

    events.push(event);

    try {
        axios.post('http://localhost:4000/events', event)
        axios.post('http://localhost:4001/events', event);
        axios.post('http://localhost:4002/events', event);
        axios.post('http://localhost:4003/events', event);
    } catch (error) {
        console.log('Error is here in posting events');
        res.send({ status: 'OK' });
    }

});

app.get('/events', (req, res) => {
    try {
        res.send(events);
    } catch (error) {
        console.log('Error in event bus');
        res.json({ status: 'failed' })
    }
})

app.listen(4005, () => console.log('Listening on 4005'));    