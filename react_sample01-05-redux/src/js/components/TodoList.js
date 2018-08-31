import React from 'react';
import Task from './Task';
import PropTypes from 'prop-types';

class TodoList extends React.Component {

  constructor(props){
    super(props);
  }
  render() {
    const { todos, onClickToggleDone, onClickRemove, onEnterUpdateTask } = this.props;
    let tasks = [];
    for(let i in todos){
      tasks.push(<Task key={todos[i].id} {...todos[i]}
                       onClickToggleDone={() => onClickToggleDone(todos[i].id)}
                       onClickRemove={() => onClickRemove(todos[i].id)}
                       onEnterUpdateTask={(text) => onEnterUpdateTask(todos[i].id, text)}/>);
    }

    return (
      <ul className="list js-todo_list">
        {tasks}
      </ul>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      isDone: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onClickToggleDone: PropTypes.func.isRequired,
  onClickRemove: PropTypes.func.isRequired,
  onEnterUpdateTask: PropTypes.func.isRequired
};

export default TodoList;