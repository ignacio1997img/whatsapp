const express = require('express')
const app = express()
const port = 3001
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require("qrcode-terminal");

const client = new Client({authStrategy: new LocalAuth()});
// const client = new Client({authStrategy: new LocalAuth(), puppeteer: {headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']} });

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

app.get('/', (req, res) => {
    let number = req.query.number;
    let message = req.query.message;
    if(number && message){
        let chatId = `${number}@c.us`;
        client.sendMessage(chatId, message).then((response) => {
            console.log("Mensaje enviado");
        });
        res.json({"success": 'Mensaje enviado', number, message});
    }else{
        res.json({"errror": 'Mensaje no enviado', number, message});
    }
})
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})