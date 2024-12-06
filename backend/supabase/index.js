const express = require('express')
const supabaseClient = require('@supabase/supabase-js')

const app = express()
const port = 3000

app.use(express.static(__dirname + '/public'))

const supabaseUrl = 'https://faylmhkfwyiqvipbktdo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZheWxtaGtmd3lpcXZpcGJrdGRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM0NDk5MDMsImV4cCI6MjA0OTAyNTkwM30.LegzASHCfoyoneaQ2VdRgY7z0rDEOWMv7t4gGiZXqTY'
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey)

app.get('/customers', async (req, res) => {
    console.log('Attempting to get all customers')

    const { data, error } = await supabase
        .from('customers')
        .select()

    if(error){
    console.log('Error', error)
    res.send(error)
    }

    else{
    console.log('Successfully Retrived Data')
    res.send(data)
    }
})

app.post('/customer', (req, res) => {
    console.log('Attempting to add a customer')
    res.send("Blah")
})

app.listen(port, () => {
    console.log('App is ALIVEEEEE')
})