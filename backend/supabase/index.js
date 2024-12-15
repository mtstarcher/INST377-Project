const express = require('express');
const supabaseClient = require('@supabase/supabase-js');
const bodyParser = require('body-parser');
const { isValidStateAbbreviation } = require('usa-state-validator');

// const path = require('path'); // new addition

const app = express();
const port = 3000;

app.use(bodyParser.json());
// app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname));
// app.use(express.static(path.join(__dirname)));

const supabaseUrl = 'https://faylmhkfwyiqvipbktdo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZheWxtaGtmd3lpcXZpcGJrdGRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM0NDk5MDMsImV4cCI6MjA0OTAyNTkwM30.LegzASHCfoyoneaQ2VdRgY7z0rDEOWMv7t4gGiZXqTY'
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey)

app.get('/', (req, res) => {
    res.sendFile('home.html', { root: __dirname });
});

app.get('/users', async (req, res) => {
    console.log('Attempting to get all users')

    const { data, error } = await supabase
        .from('users')
        .select()

    if (error) {
        console.log('Error', error)
        res.send(error)
    }

    else {
        console.log('Successfully Retrived Data')
        res.send(data)
    }
})

app.post('/user', async (req, res) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const userState = req.body.userState;
    const moviesLiked = req.body.moviesLiked;

    console.log('Request', req.body);

        if(!isValidStateAbbreviation(userState)) {
        console.error(`State ${userState} is Invalid :(`);
        res.statusCode = 400;
        res.header('Content-Type', 'application/json');
        const stateInvalidErrorJson = {
            message: `${userState} is not a valid State Abbreviation`,
        };
        res.send(JSON.stringify(stateInvalidErrorJson));
        return;
    }

    const { data, error } = await supabase
        .from('users')
        .insert({
            user_first_name: firstName,
            user_last_name: lastName,
            user_state: userState,
            user_liked_movies: moviesLiked
        })
        .select();

    if (error) {
        console.log('Error:', error);
        res.send(error);
    } else {
        console.log('Successfully Retrieved Data');
        res.send(data);
    }
})

app.listen(port, () => {
    console.log('App is ALIVEEEEE')
})