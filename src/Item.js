import React, { Component } from "react";
import { DragSource } from "react-dnd";

// Returns true if some drop target has handled the drop event, false otherwise. 
// Even if a target did not return a drop result, didDrop() returns true. Use it
// inside endDrag() to test whether any drop target has handled the drop. Returns 
// false if called outside endDrag().

const spec = {
  beginDrag(props) {
    console.log('dragging');
    return props.item;
  },
  endDrag(props, monitor, component) {
    if(!monitor.didDrop()) {
      console.log('Not dropped on target!');
      return;
    }
    return props.handleDrop(props.item.id);
  }
}

// <connect>
// It has two methods: dragPreview() and dragSource()
// It returns a function you need to pass down to your component to 
// connect the source DOM node to the React DnD backend.
// If you return something like { connectDragSource: connect.dragSource() } 
// from your collect function, the component will receive connectDragSource as
// a prop so you can mark the relevant node inside its render() as draggable: 
// return this.props.connectDragSource(<div>...</div>) 

//<monitor>
// Returns true if a drag operation is in progress, and either the owner initiated 
// the drag, or its isDragging() is defined and returns true.

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),    // An instance of DragSourceConnector
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

class Item extends Component {
  render() {
    const {isDragging, connectDragSource, item } = this.props;
    const opacity = isDragging ? 0.1 : 1;

    if(isDragging && item){
      console.log('Dragging this - ', item);  
    } else {
      console.log(item, ' is not dragging');
    }

    return connectDragSource (
      <div className="item" style={{ opacity }}>
        <span>{item.name}</span>
      </div>
    )
  }
}

export default DragSource('item', spec, collect)(Item);