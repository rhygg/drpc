#!/usr/bin/env node
'use strict';

const {Client} =require('discord-rpc');
const chalk =require('chalk');
const pkg = require('./package.json');
const figlet = require('figlet');
const fs = require('fs');
const Table = require('cli-table');
const {Beautify} = require('callista');
const path = require('path');
let args = process.argv.slice(2);
let injectable = args[0];
if(injectable === '--help' || injectable==='-h'){
    console.log(`
    DRPC CLI
----------------------------------------------------
MAIN COMMANDS
-------------
${chalk.magenta('--help | -h')}  --- Shows you the following menu

${chalk.cyan('--run')}  --- Starts a process.

${chalk.cyan('--delete | -del')} --- delete a configuration. (required args -> <name>)

${chalk.magenta('--list | -l')} --- Check the list of saved presets.

SUB-COMMANDS 
------------
RUN
------
--save    --- Run a configuration while simultaneously saving it. (required args -> <name>)
--preset  --- Run a preset instead of a configuration file in the current working dir.

    `)
}
function promo(){
console.log(chalk.magenta(figlet.textSync('Drpc CLI',{
    font: '3D-ASCII',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true
})))
let text = 'on github!',
url = 'https://github.com/rhydderchc/drpc';
const link = `${text} (\u200B${url}\u200B)`
console.log(`Client has sucessfully Started! \n ${chalk.cyan('Like this project? Please consider starring it')} ${chalk.magenta(`On ${link}`)}`)
}

if(injectable === '--run' && args[1] != '--save' && args[1] != '--preset'){
let client = new Client({transport: "ipc"});

var settings = 
    JSON.parse(
        fs.readFileSync(
            path.resolve(
                __dirname, 
                'drpc-settings.json'),
            'utf8'));

let activityObject = {};
let app;
if(settings.client_id){
    app = settings.client_id;
}
if(!settings.client_id){
    return console.log(chalk.red('Client id could not be found'));
}
if(settings.large_image_key){
    activityObject.largeImageKey = settings.large_image_key;
}
if(settings.large_image_text){
    activityObject.largeImageText = settings.large_image_text;
}
if(!settings.large_image_text){
    activityObject.largeImageText = `drpc-cli v${pkg.version}`
}
if(settings.small_image_key){
    activityObject.smallImageKey = settings.small_image_key;
}
if(settings.small_image_text){
    activityObject.smallImageText = settings.small_image_text;
}
if(!settings.small_image_text){
    activityObject.smallImageText = 'made with drpc-cli'
}
if (settings.description !== '') { activityObject.details = settings.description }
if (settings.state !== '') { activityObject.state = settings.state }
if (settings.buttons.length !== 0) { activityObject.buttons = settings.buttons }
if(settings.show_timestamp){
    activityObject.startTimeStamp = Date.now();
}
function runner(timeout){
    if(!timeout){
        timeout = 5000;
    }
    client.destroy()
  client = new Client({ transport: 'ipc' })
  client.on('ready', () => {
    running = true;
    client.setActivity(activityObject);
    client.transport.socket.on("close", (c, s) => {
     runner()
    })
  })
  setTimeout(() => client.login({ clientId: app }), timeout)
}
process.on('unhandledRejection', err=>{
     if (err.message === "Could not connect") {
    console.log("Crashed! Retrying...")
    runner()
  }
})
runner(1000);
promo();
}
if(injectable === "--run" && args[1] === "--save"){
let client = new Client({transport: "ipc"});
var settings = 
    JSON.parse(
        fs.readFileSync(
            path.resolve(
                __dirname, 
                'drpc-settings.json'),
            'utf8'));

let activityObject = {};
let app;
if(settings.client_id){
    app = settings.client_id;
}
if(!settings.client_id){
    return console.log(chalk.red('Client id could not be found'));
}
if(settings.large_image_key){
    activityObject.largeImageKey = settings.large_image_key;
}
if(settings.large_image_text){
    activityObject.largeImageText = settings.large_image_text;
}
if(!settings.large_image_text){
    activityObject.largeImageText = `drpc-cli v${pkg.version}`
}
if(settings.small_image_key){
    activityObject.smallImageKey = settings.small_image_key;
}
if(settings.small_image_text){
    activityObject.smallImageText = settings.small_image_text;
}
if(!settings.small_image_text){
    activityObject.smallImageText = 'made with drpc-cli'
}
if (settings.description !== '') { activityObject.details = settings.description }
if (settings.state !== '') { activityObject.state = settings.state }
if (settings.buttons.length !== 0) { activityObject.buttons = settings.buttons }
if(settings.show_timestamp){
    activityObject.startTimeStamp = Date.now();
}
if(!args[2]){
    throw new Error(chalk.red("Please enter the name of the preset you want to save too"))
}
activityObject.client_id = app;
fs.writeFile(`drpc-presets/${args[2]}.json`, JSON.stringify(activityObject), (err) => {
    if (err) {
        throw err;
    }
    console.log('Data has been saved with the preset name %s', args[2]);
});
delete activityObject.client_id;
function runner(timeout){
    if(!timeout){
        timeout = 5000;
    }
    client.destroy()
  client = new Client({ transport: 'ipc' })
  client.on('ready', () => {
    running = true;
    client.setActivity(activityObject);
    client.transport.socket.on("close", (c, s) => {
      runner()
    })
  })
  setTimeout(() => client.login({ clientId: app }), timeout)
}
process.on('unhandledRejection', err=>{
     if (err.message === "Could not connect") {
    console.log("Crashed! Retrying...")
    runner()
  }
})
runner(1000);
promo();
}

if(injectable === '--run' && args[1] === '--preset'){
    let client = new Client({transport: "ipc"});
let obj = require(`./drpc-presets/${args[2]}.json`);
let app = obj.client_id;
delete obj.client_id;
function runner(timeout){
    if(!timeout){
        timeout = 5000;
    }
    client.destroy()
  client = new Client({ transport: 'ipc' })
  client.on('ready', () => {
    running = true;
    client.setActivity(obj);
    client.transport.socket.on("close", (c, s) => {
      runner()
    })
  })
  setTimeout(() => client.login({ clientId:app }), timeout)
}
process.on('unhandledRejection', err=>{
     if (err.message === "Could not connect") {
    console.log("Crashed! Retrying...")
    runner()
  }
})
runner(1000);
promo();

}
if(injectable === '--list' || injectable === '-l'){
    var table = new Table({
    head: ['No.','Name', 'ClientID']
  , colWidths: [6, 21, 25]
});
    let allfiles = fs.readdirSync('./drpc-presets');
    if(!allfiles){
        console.log(chalk.magenta('You have no presets!'))
    }
    else{
        let i = 1;
        allfiles.forEach(file=>{
            const wawa = require(`./drpc-presets/${file}`)
            const clientid = wawa.client_id;
        table.push(
            [i, file, clientid]
        )
        i++;
        })
        console.log(chalk.cyan(table.toString()))
    }
    process.exit(0)
}
if(injectable === '--save' || injectable === '-s'){
var settings = 
    JSON.parse(
        fs.readFileSync(
            path.resolve(
                __dirname, 
                'drpc-settings.json'),
            'utf8'));

let activityObject = {};
let app;
if(settings.client_id){
   activityObject.client_id = settings.client_id;
}
if(!settings.client_id){
    return console.log(chalk.red('Client id could not be found'));
}
if(settings.large_image_key){
    activityObject.largeImageKey = settings.large_image_key;
}
if(settings.large_image_text){
    activityObject.largeImageText = settings.large_image_text;
}
if(!settings.large_image_text){
    activityObject.largeImageText = `drpc-cli v${pkg.version}`
}
if(settings.small_image_key){
    activityObject.smallImageKey = settings.small_image_key;
}
if(settings.small_image_text){
    activityObject.smallImageText = settings.small_image_text;
}
if(!settings.small_image_text){
    activityObject.smallImageText = 'made with drpc-cli'
}
if (settings.description !== '') { activityObject.details = settings.description }
if (settings.state !== '') { activityObject.state = settings.state }
if (settings.buttons.length !== 0) { activityObject.buttons = settings.buttons }
if(settings.show_timestamp){
    activityObject.startTimeStamp = Date.now();
}
if(!args[1]){
    throw new Error(chalk.red("Please enter the name of the preset you want to save too"))
}
fs.writeFile(`drpc-presets/${args[1]}.json`, JSON.stringify(activityObject), (err) => {
    if (err) {
        throw err;
    }
    console.log('Data has been saved with the preset name %s', args[1]);
});
process.exit(0)
}
if(injectable==='--delete' || injectable === '-del'){
    fs.unlink(`./drpc-presets/${args[1]}.json`,(err)=>{
        if(err){
            throw err;
        }
        else{
            console.log(Beautify.symbol.success, chalk.cyan(`The preset ${chalk.magenta(args[1])} has been deleted sucessfully!`))
        }
    })
}
