import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

class Task extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
      editMode: false
    };
    this.handleClickShowEdit = this.handleClickShowEdit.bind(this);
    this.handleKeyUpCloseEdit = this.handleKeyUpCloseEdit.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
  }
  handleChangeText(e){
    this.setState({
      text: e.target.value
    });
  }
  handleClickShowEdit() {
    this.setState({
      editMode: true
    });
  }
  handleKeyUpCloseEdit(e) {
    if(e.keyCode === 13 && e.shiftKey === true){
      this.setState({
        text: e.currentTarget.value,
        editMode: false
      });
      this.props.onEnterUpdateTask(e.currentTarget.value);
    }
  }
  render() {
    const { onClickToggleDone, onClickRemove } = this.props;

    const classNameLi = ClassNames({
      'list__item': true,
      'list__item--done': this.props.isDone
    });
    const classNameIcon = ClassNames({
      'fa': true,
      'fa-circle-thin': !this.props.isDone,
      'fa-check-circle': this.props.isDone,
      'icon-check': true
    });

    const input = (this.state.editMode) ?
      <input type="text" className="editText" value={this.state.text}
             onChange={this.handleChangeText} onKeyUp={this.handleKeyUpCloseEdit}/> :
      <span onClick={this.handleClickShowEdit}>{this.state.text}</span>;

    return (
      <li className={classNameLi}>
        <i className={classNameIcon} onClick={onClickToggleDone} aria-hidden="true" />
        {input}
        <i className="fa fa-trash icon-trash" onClick={onClickRemove} aria-hidden="true" />
      </li>
    );
  }
}

Task.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isDone: PropTypes.bool.isRequired,
  onEnterUpdateTask: PropTypes.func.isRequired,
  onClickToggleDone: PropTypes.func.isRequired,
  onClickRemove: PropTypes.func.isRequired
};

export default Task;
