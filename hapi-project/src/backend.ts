import * as hapi from "hapi";
import * as fs from 'fs';
import Phrases = require('../models/phrase'); // Import the phrase Model


const server: hapi.Server = new hapi.Server({
  host: 'localhost',
  port: 8080
});

// web server write endpoint
server.route({
  method: 'POST',
  path: '/write',
  handler: function (request, h) {
      // ping DB to check connection and stop if fail
      var checkDB = new Phrases().fetchAll
      if (checkDB==null) {
        console.log('Warning. Database not connected')
        process.exit()
      } else {
        console.log('Connection established...')
      }
      // req post and append to new line
      const data = request.payload
      const result = data["phrase"] + '\n';
      fs.appendFile('storage.txt', result, (err) => {
        if (err) {
          console.error(err)
          return
        }
      })
      // read out updated storage.txt and print line num
      var fileBuffer =  fs.readFileSync('storage.txt');
      var to_string = fileBuffer.toString();
      var split_lines = to_string.split("\n");
      var linenum = {
        id: split_lines.length//changed this
      }
      // update phrases table in DB with new entry
      var entry = new Phrases({phrase: data["phrase"]});
      entry.save()
      return linenum
  }
})

// web server read endpoint
server.route({
  method: 'GET',
  path: '/read',
  handler: function (request, h){
      // ping DB to check connection and stop if fail
      var checkDB = new Phrases().fetchAll
      if (checkDB==null) {
        console.log('Warning. Database not connected')
        process.exit()
      } else {
        console.log('Connection established...')
      }
      // read out storage.txt and display in return JSON obj
      var fs = require('fs');
      var phrases = [];
      var array = fs.readFileSync('storage.txt').toString().split("\n");
      var lineno = 0;
      for (var i in array){
        lineno++
        phrases.push({
          id: lineno,
          phrase: array[i]
        })
      }
      phrases.pop()
      return phrases
  }
})

// web server delete endpoint
server.route({
  method: 'DELETE',
  path: '/delete/{id}',
  handler: function (request, h){
      // ping DB to check connection and stop if fail
      var checkDB = new Phrases().fetchAll
      if (checkDB==null) {
        console.log('Warning. Database not connected')
        process.exit()
      } else {
        console.log('Connection established...')
      }
      // read out storage.txt to get length
      var fs = require('fs');
      var array = fs.readFileSync('storage.txt').toString().split("\n");
      var len = array.length;
      // delete entry from storage.txt if within length
      if (request.params.id <= len){
        array.splice(Number(request.params.id)-1,1)
        const updatedData = array.join('\n');
        fs.writeFile('storage.txt', updatedData, (err) => {
            if (err) throw err;
            console.log ('Successfully updated the file data');
          });
          var result = {
            success: true
          }
        } else {
          var result = {
            success: false
          }
        }
      // delete DB row according to requested id
      var deleteEntry = new Phrases({id:request.params.id}).fetch({require: true})
        .then(function(entry) {
          console.log(entry);
          entry.destroy()
        })
      return result
  }
})

async function start() {
  try {
    await server.start()
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  console.log('Server running at:', server.info.uri);
}

// don't forget to call start
start();
