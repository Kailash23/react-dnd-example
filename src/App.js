import React, { Component } from "react";
import "./App.css";
import Item from "./Item";
import Target from "./Target";

import HTML5BACKEND from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

class App extends Component {
  
  state = {
    items: [
      // Array of Objects
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
      { id: 3, name: "Item 3" },
      { id: 4, name: "Item 4" }
    ]
  };

  // For handling - This will call when item dropped on target. (Delete the item)
  deleteItem = (id) => {        
    console.log(`Item ${id} droppped on target`);
    this.setState((prevState) => ({ 
        items: prevState.items.filter(item => item.id !== id)
    }));
  }

  render() {
    return (
      <div className="App">
        <div className="App-intro">
          <div className="app-container">
            <div className="item-container">
              {
                this.state.items.map(item => (
                  <Item 
                    key={item.id} 
                    item={item} 
                    handleDrop={
                      (id) => this.deleteItem(id)
                    }
                  />
                ))
              }
            </div>
            <Target />
          </div>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5BACKEND)(App);  // HOC