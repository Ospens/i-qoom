import React, { Component } from 'react'
import MemberTable from './MemberTable'

class ActiveMembers extends Component {

  render() {
    return (
      <div>
        <MemberTable {...this.props}/>
      </div>
    )
  }
}

export default ActiveMembers