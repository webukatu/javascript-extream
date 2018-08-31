import React from 'react';
import VisibleTodoList from '../containers/VisibleTodoList';
import TodoCreator from '../components/TodoCreater';
import Search from '../components/Search';

class TodoApp extends React.Component {

  constructor(props){
    super(props);
  }

  render() {

    return (
      <div>

        <TodoCreator />

        <Search />

        <VisibleTodoList />

      </div>
    );
  }
}

export default TodoApp