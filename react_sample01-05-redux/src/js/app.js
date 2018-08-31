import React from 'react';
import ReactDOM from 'react-dom';

//=============================================
// イベントハンドリング
//=============================================
// onClickなどのイベントハンドラを使う
// 発火させたい処理を {メソッド名} で指定する
// ハンドラ内でthisを使う場合にはconstructor内でbindして束縛する必要がある
class ToggleBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true
    };

    // ハンドラの中でthisを使う場合は、別のthisになってしまうので束縛が必要（そのまま使うとエラーが出る）
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // setStateの中で前のstateを使いたい場合は、fuctionを渡すこと！
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button className="btn" onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
ReactDOM.render(
  <ToggleBtn />,
  document.getElementById('app1')
);

//=============================================
// Form
//=============================================

// reactでは、brタグやinputタグなどシングルタグやiタグなど空タグで使う場合、最後に必ず/をつける必要がある

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'デフォルトの値'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // inputやtextareaにはonChangeは必ず必要（change内でsetStateで値を変更しないと画面上でも変わらない）
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    alert(this.state.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          comment:<br/>
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label><br/>
        <input type="submit" value="アラート出す" className="btn" />
      </form>
    );
  }
}
ReactDOM.render(
  <Form />,
  document.getElementById('app2')
);

//=============================================
// 複数のForm項目の場合
//=============================================
class MultipleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    alert(this.state.isGoing + ' & ' + this.state.numberOfGuests);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:<br/>
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label><br/>
        <input type="submit" value="アラート出す" className="btn"/>
      </form>
    );
  }
}
ReactDOM.render(
  <MultipleForm />,
  document.getElementById('app3')
);