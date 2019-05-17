import React from 'react';

class Clock extends React.Component {
    render() {
      return (
          <span>{new Date(this.props.date._seconds*1000).toLocaleString()}</span>
      );
    }
  }

export default Clock