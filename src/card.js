import React, {Component} from 'react';

export default class Card extends Component {
  constructor(props) {
    super(props);
  }

  onClick={this.state.divClick ? (e) => this.checkMatch(i, e) : undefined}>


  render() {
      return(
            <div key={this.props.key}
            className="modal mui-panel" 
            onClick={this.props.click ? (e) => this.props.checkMatch(this.props.key, e) : undefined}>
            <img style={{visibility: this.props.seen[this.props.key]}}
            src={require('./'+this.props.pic+'.jpg')} 
            key={this.props.key} alt="Game Element" />
        </div>
      );}
}
