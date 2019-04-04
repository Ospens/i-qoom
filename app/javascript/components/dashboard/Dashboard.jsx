import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios';

class Dashboard extends Component {

  state = {
    user: null
  }

  componentDidMount() {
    const { token } = this.props.info
    if ( !token ) {
      console.log('Unauthorization')
    }

    axios.get('/home', { headers: { Authorization: token } })
      .then(res => this.setState({user: res.data.hello}))
  }

  render() {
    const { user } = this.state
    return (
      <h1>
        Hello, {user}
      </h1>
    )
  }
}

const mapStateToProps = state => ({
  info: state.auth
})

export default connect(mapStateToProps)(Dashboard)
