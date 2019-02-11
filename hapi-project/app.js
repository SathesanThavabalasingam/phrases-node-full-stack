const Hapi = require("hapi");
const fs = require('fs')
const server = new Hapi.Server({
  "host": "localhost",
  "port": 8080
});

server.route({
  method: 'POST',
  path: '/write',
  handler: function (request, response) {
    const data = request.payload
    fs.appendFile('storage.txt', data, (err) => {
      if (err) {
        console.error(err)
        return
      }
    })
  }
})


const init = async () => {

    await server.start();
    console.log(`Server listening at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
