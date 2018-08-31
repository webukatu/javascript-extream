//=============================================
// React.jsとは？
//=============================================
// ・MVCのVだけのフレームワーク（というかライブラリに近い）
// ・bootstrapのようにボタン、フォームといったコンポーネント単位で管理できる
// ・仮想DOM（VertualDOM）を使って、差分だけをレンダリング
// ・JSXを使えば、js内でhtml風に書ける
// ・propsとstateというプロパティを元に色々な処理をしていくもの
// ・一方向のデータフローにより、従来の双方向データバインディングを実現するコードよりも簡素でわかりやすい


// JavaScriptで書かれたライブラリ。react.jsをインクルードして使う。
//（MVCで言うところの）Viewのみを担当する。
// JavaScriptのコード中に（PHPの様に）「HTMLタグ(っぽいもの)」を書ける。
// componentを作って使う

import React from 'react';
import ReactDOM from 'react-dom';

//=============================================
// Sample01
//=============================================
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('app1')
);

//=============================================
// Sample02 JSXを使う
//=============================================
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

var user = {
  firstName: 'kaz',
  lastName: 'kichi'
};

var element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('app2')
);

//=============================================
// Sample03 コンポーネントとprops（ES6での書き方）
//=============================================
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
const element2 = <Welcome name="Sara" />;
ReactDOM.render(
  element2,
  document.getElementById('app3')
);

//=============================================
// Sample04 renderメソッド
//=============================================
// render()が呼ばれると画面が再描画される
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}
function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('app4')
  );
}
setInterval(tick, 1000);

// ブログでよく見るcreateClassはv16から使えなくなった
// var CommentBox = React.createClass({
//   render: function() {
//     return (
//       <div className="commentBox">
//         Hello, world! I am a CommentBox.
//       </div>
//     );
//   }
// });
// React.render(
//   <CommentBox />,
//   document.getElementById('app5')
// );

//=============================================
// Sample05 propsとstate
//=============================================
// stateはコンポーネントの中だけで保持しておける変数のこと
// propsでは値を受け取って、それを元になんやかんやする
// stateは自分で使う値を保持して、それを元になんやかんやする
// stateを使うには、this.state.プロパティ名
class Clock2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
ReactDOM.render(
  <Clock2 />,
  document.getElementById('app5')
);

//=============================================
// Sample06 ライフサイクル
//=============================================
// componentDidMountは
// componentWillUnmountは
// setStateを使ってstateが変更されると自動的にrender()が動いて再描画される
// （this.stateにそのまま詰めるとrender()は動かない）
class Clock3 extends React.Component {
  constructor(props) {
    console.log('constructor');
    super(props);
    this.state = {date: new Date()};
  }

  /**
   * マウント前
   * 初回描画の直前に呼ばれる。renderメソッドが呼ばれる前にコンポーネントの状態を変更したい場合は、このメソッド内で処理を書く。
   */
  componentWillMount() {
    console.log('componentWillMount');
  }
  /**
   * マウント後
   * 実際のDOMが表示された後に呼び出されるメソッド。このメソッド内で実際のDOMにアクセスが出来るようになる。
   * jQueryでDOMを操作したい時などはこのメソッド内で行う。
   */
  componentDidMount() {
    console.log('componentDidMount');
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  /**
   * setProps()によるプロパティの更新時
   * 親コンポーネントのプロパティが変更されたタイミングで呼ばれる。
   * 新しいpropsの値を元にコンポーネントの状態を変更したり、色々な処理を行うためのメソッド。
   */
  componentWillReceiveProps() {

  }
  /**
   * 更新前
   */
  componentWillUpdate() {

  }
  /**
   * 更新後
   */
  componentDidUpdate() {

  }
  /**
   * アンマウント(DOMからの削除)時
   */
  componentWillUnmount() {
    console.log('componentWillUnmount');
    clearInterval(this.timerID);
  }

  tick() {
    console.log('tick');
    // stateを変更するには、this.setState({ プロパティ名: 値 });
    this.setState({
      date: new Date()
    });
  }

  /**
   * このメソッドで仮想DOMが作られる。この仮想DOMを元に実際のDOMに対して変更が必要か判断をしている。
   * コンポーネントクラス内には他のメソッドは省略できるが、renderメソッドは１コンポーネントに１つ必ず必要。
   */
  render() {
    console.log('render');
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
const clock3 = ReactDOM.render(
  <Clock3 />,
  document.getElementById('app6')
);