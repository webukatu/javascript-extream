/**
 * Taskのreducer
 * reducerは受けたactionのタイプをもとに、storeに「新しい」stateを返すだけのもの
 * reducerの中で下記のことはやってはダメ
 * ・引数のstate, actionインスタンスの値を変更する
 * ・副作用をおこす(AjaxでAPIを呼んだり、ルーティングを変えるなどなど確実に実行されるかわからない事をしたらダメ)
 * ・毎回値が変わるもの(Date.now() や Math.random())を扱う
 */

import _ from 'lodash';

// 初期値の設定をしてあげる
const initialState = {
  todos: [{
    id: 'XXXX',
    text: 'sample todo1',
    isDone: false
  }],
  searchText: ''
};

// action で受け取った値を state に適用して更新する
// reducerはreturnで返却するstateと元のstateの差分があれば、再描画される
// reducer名がそのままstateの名前になる
export default function task(state = initialState, action) {
  switch (action.type) {
    case 'ADD':
      return {
        todos: [
          ...state.todos,
          {
            id: action.id,
            text: action.text,
            isDone: false
          }
        ]
      };
    case 'DELETE':
      return Object.assign({}, state, {
        todos: _.reject(state.todos, { 'id': action.id })
      });
    case 'UPDATE':
      return Object.assign({}, state, {
        todos: state.todos.map((todo) => {
          if (todo.id === action.id) {
            return Object.assign({}, todo, {
              text: action.text
            })
          }
          return todo
        })
      });
    case 'TOGGLE_DONE':
      return Object.assign({}, state, {
        todos: state.todos.map((todo) => {
          if (todo.id === action.id) {
            return Object.assign({}, todo, {
              isDone: !todo.isDone
            })
          }
          return todo
        })
      });
    case 'SEARCH':
      return Object.assign({}, state, { 'searchText': action.searchText});
    default:
      return state;
  }
}