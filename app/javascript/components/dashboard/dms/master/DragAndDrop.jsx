import React, { Component } from 'react'

const initialData = {
  column: {
    id: 'column-1',
    numberIds: ['four', 'one', 'five', 'three', 'two'],
  },
  numbers: {
    'five': { id: 'five', content: '5' },
    'four': { id: 'four', content: '4' },
    'one': { id: 'one', content: '1' },
    'three': { id: 'three', content: '3' },
    'two': { id: 'two', content: '2' },
  }
}

const DroppableWrapper = (props) => (
  <DroppableWrapper droppableId={props.column.id} className="source">
    <DraggableListItems items={props.items} />
  </DroppableWrapper>
)

const Droppable = (props) => (
  <Droppable droppableId={props.droppableId}>
    {(provided) => (
      <div className={props.className}
        ref={provided.innerRef}
        {...provided.droppableProps}
        {...provided.droppablePlaceholder}>
        {props.children}
      </div>
    )}
  </Droppable>
)

const NumberBox = props => <div> {props.items.map(toNumberBox)} </div>

toNumberBox = (item, position) => {
  return <NumberBox key={item.id}
    className="box"
    itemPosition={position}
    value={item.id}
    content={item.content} />
}

const DraggableItemWrapper = props => {
  const className = `dnd-number size-${props.value}`;

  return (
    <DraggableItemWrapper draggableId={props.value}
      index={props.itemPosition}
      className={className}>
      <div>{props.content}</div>
    </DraggableItemWrapper>
  )
}

const Draggable = props => {
  <Draggable draggableId={props.draggableId} index={props.index}>
    {(provided) => (
      <div className={props.className}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}>
        {props.children}
      </div>
    )}
  </Draggable>
}

class DragAndDrop extends React.Component {
    
  state = {
    ...initialData
  }

  onDragEnd = () => {
    // Элемент отпущен!
  }
    
  render() {
    const numbers = this.state.column.numberIds.map((numberId) => this.state.numbers[numberId])

    return (
      <NumbersGameContext onDragEnd={this.onDragEnd}>
       <VerticalColumn column={this.state.column} items={numbers} /> 
      </NumbersGameContext>
    )
  }
}

export default DragAndDrop