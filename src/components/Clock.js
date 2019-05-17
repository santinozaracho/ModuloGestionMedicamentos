import React from 'react';

class Clock extends React.Component {
    render() {
      return (
          <div>{new Date(this.props.date._seconds*1000).toLocaleString()}</div>
      );
    }
  }

export default Clock