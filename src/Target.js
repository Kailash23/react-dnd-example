import React, { Component } from "react";
import { DropTarget } from "react-dnd";

// <connectDropTarget>
// connect - dropTarget() -  It returns a function you need to pass down to your 
// component to connect the target DOM node to the React DnD backend.

// <hovered>
// isOver(options): Returns true if there is a drag operation in progress, and the 
// pointer is currently hovering over the owner. 

// <item>
// getItem(): Returns a plain object representing the currently dragged item. 
// Every drag source must specify it by returning an object from its beginDrag() 
// method. Returns null if no item is being dragged.

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),  // An instance of DropTargetConnector
    hovered: monitor.isOver(),
    item: monitor.getItem()
  }
} 

class Target extends Component {
  render() {
    const { connectDropTarget, hovered, item } = this.props;
    const backgroundColor = hovered ? 'lightgreen' : 'white';

    return connectDropTarget (
      <div className="target" style={{ backgroundColor }}>
        Target
      </div>
    );
  }
}

export default DropTarget('item', {}, collect)(Target);
// We are not dragging Target so we pass {} as second arg.