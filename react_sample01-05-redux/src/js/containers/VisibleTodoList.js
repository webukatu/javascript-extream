import { connect } from 'react-redux'
import { toggleDone, deleteTask, updateTask } from '../actions'
import TodoList from '../components/TodoList';


const filterTodos = function(elm){
  const regexp = new RegExp('^' + this.searchText, 'i');
  return (elm.text.match(regexp));
};

const mapStateToProps = state => {
  return {
    // state.reducer名.プロパティになるので注意！！
    todos: (state.task.searchText) ? state.task.todos.filter(filterTodos, state.task) : state.task.todos
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onClickToggleDone: id => {
      dispatch(toggleDone(id));
    },
    onClickRemove: id => {
      dispatch(deleteTask(id));
    },
    onEnterUpdateTask: (id, text) => {
      dispatch(updateTask(id, text));
    }
  }
};


// connect(state, action)(App)
// stateを直接propsとして渡す場合
// connect(state => state)(Task);
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)