"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const hapi = require("hapi");
const fs = require("fs");
const Phrases = require("../models/phrase"); // Import the Author Model
const server = new hapi.Server({
    host: 'localhost',
    port: 8080
});
// web server write endpoint
server.route({
    method: 'POST',
    path: '/write',
    handler: function (request, h) {
        const data = request.payload;
        const result = data["phrase"] + '\n';
        var checkDB = new Phrases().fetchAll;
        if (checkDB == null) {
            console.log('Warning. Database not connected');
            process.exit();
        }
        else {
            console.log('Connection established...');
        }
        fs.appendFile('storage.txt', result, (err) => {
            if (err) {
                console.error(err);
                return;
            }
        });
        var fileBuffer = fs.readFileSync('storage.txt');
        var to_string = fileBuffer.toString();
        var split_lines = to_string.split("\n");
        var linenum = {
            id: split_lines.length - 1
        };
        var entry = new Phrases({ phrase: data["phrase"] });
        entry.save();
        return linenum;
    }
});
// web server read endpoint
server.route({
    method: 'GET',
    path: '/read',
    handler: function (request, h) {
        var checkDB = new Phrases().fetchAll;
        if (checkDB == null) {
            console.log('Warning. Database not connected');
            process.exit();
        }
        else {
            console.log('Connection established...');
        }
        var fs = require('fs');
        var phrases = [];
        var array = fs.readFileSync('storage.txt').toString().split("\n");
        var lineno = 0;
        for (var i in array) {
            lineno++;
            phrases.push({
                id: lineno,
                phrase: array[i]
            });
        }
        phrases.pop();
        return phrases;
    }
});
// web server delete endpoint
server.route({
    method: 'DELETE',
    path: '/delete/{id}',
    handler: function (request, h) {
        var checkDB = new Phrases().fetchAll;
        if (checkDB == null) {
            console.log('Warning. Database not connected');
            process.exit();
        }
        else {
            console.log('Connection established...');
        }
        var fs = require('fs');
        var array = fs.readFileSync('storage.txt').toString().split("\n");
        var len = array.length;
        if (request.params.id <= len) {
            array.splice(request.params.id);
            const updatedData = array.join('\n');
            fs.writeFile('storage.txt', updatedData, (err) => {
                if (err)
                    throw err;
                console.log('Successfully updated the file data');
            });
            var result = {
                success: true
            };
        }
        else {
            var result = {
                success: false
            };
        }
        var deleteEntry = new Phrases({ id: request.params.id }).fetch({ requre: true })
            .then(function (entry) {
            console.log(entry);
            entry.destroy();
        });
        return result;
    }
});
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield server.start();
        }
        catch (err) {
            console.log(err);
            process.exit(1);
        }
        console.log('Server running at:', server.info.uri);
    });
}
// don't forget to call start
start();
//# sourceMappingURL=backend.js.map