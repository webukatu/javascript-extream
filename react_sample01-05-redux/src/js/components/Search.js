import React from 'react';
import { connect } from 'react-redux'
import { searchTask } from '../actions'
import PropTypes from "prop-types";

class Search extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      val: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e){
    this.setState({
      val: e.target.value
    });
    this.props.dispatch(searchTask(e.target.value));
  }
  render() {
    return (
      <div className="searchBox">
        <i className="fa fa-search searchBox__icon" aria-hidden="true" />
        <input type="text" className="searchBox__input" onChange={this.handleChange}
              value={this.state.val} placeholder="somothing keyword" />
      </div>
    );
  }
}

Search.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(Search)