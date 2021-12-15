const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/link', require('./routes/link.route'))
app.use('/t', require('./routes/redirect.route'))

const PORT = config.get('port') || 5000

async function start(){
    try {
        await mongoose.connect(config.get('mongoURL'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (e) =>{
            if (e) {
                console.log('Cant open DB! Problem: ', e)
            }
        })
        app.listen(PORT, () => console.log(`App has been started! Port: ${PORT} `))
    }catch (e) {
        console.log('Server cant start! Problem: ', e)
        process.exit(1)
    }
}

start()

