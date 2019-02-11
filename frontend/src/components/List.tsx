import * as React from "react";
import * as txt from "./storage.txt";
export interface ListProps { compiler: string; framework: string; }
import  'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';



//
var array = txt.split("\n");
var phrases = [];
var lineno = 0;
      for (var i in array){
        lineno++
        phrases.push(
        lineno
        )
      }

// Split phrases and ids in to seperate rows that can be used for table entry
      let newText = txt.split ('\n').map ((item, i) => <p key={i}><td>{item}</td></p>);
      let newLine = phrases.map ((item, i) => <p key={i}><td>{item}</td></p>);
      let delItem = phrases.map ((item, i) => <p key={i}><td><button type="button" className="btn btn-primary btn-sm">Delete</button></td></p>);

// State is never set so we use the '{}' type.
export class List extends React.Component<ListProps, {}> {

 render (){
   return (
      <div>
        <table className = "table">
          <thead>
          <tr>
            <th>Phrase</th>
            <th>Line_number</th>
            <th>Delete</th>
            <th><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addModal">
              Add
            </button></th>
            <div className="modal fade" id="addModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Add Phrase</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="form-group">
                        <label htmlFor="message-text" className="form-control-label">Write phrase:</label>
                        <textarea className="form-control" id="message-text"></textarea>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Add</button>
                  </div>
                </div>
              </div>
            </div>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> {newText} </td>
            <td> {newLine} </td>
            <td> {delItem} </td>
          </tr>
        </tbody>
        </table>
    </div>
    )
  }
}
