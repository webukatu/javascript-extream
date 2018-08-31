import React from 'react';
import { connect } from 'react-redux'
import { addTask } from '../actions'
import PropTypes from "prop-types";

class TodoCreator extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      val: '',
      errMsg: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }
  createHashId(){
    return Math.random().toString(36).slice(-16);
  }
  handleChange(e){
    this.setState({
      val: e.target.value
    });
  }
  handleKeyUp(e){

    if(e.keyCode === 13 && e.shiftKey === true){

      const val = e.target.value;
      if(!val){
        this.setState({
          errMsg: '入力が空です'
        });
        return;
      }

      this.setState({
        val: '',
        errMsg: ''
      });
      this.props.dispatch(addTask(this.createHashId(), val));
    }
  }
  render() {
    const errMsg = (this.state.errMsg) ? <span className="error">{this.state.errMsg}</span> : '';
    return (
      <div className="form">
        <div className="inputArea">
          <input type="text" className="inputText" value={this.state.val}
                 onChange={this.handleChange} onKeyUp={this.handleKeyUp} placeholder="smothing todo task" />
          {errMsg}
        </div>
      </div>
    );
  }
}

TodoCreator.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(TodoCreator)