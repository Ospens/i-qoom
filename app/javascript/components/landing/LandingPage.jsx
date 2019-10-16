import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Footer from './Footer'
import MainContent from './MainContent'
import Imprint from './Imprint'
import Terms from './Terms'
import SignIn from './SignIn'
import SignUp from './SignUp'
import SignedUp from './SignedUp'

class LandingPage extends Component {

  state = {
    showExamples: false
  }

  toggleExamples = () => {
    const { showExamples } = this.state
    this.setState({ showExamples: !showExamples})
  }

  render() {
    const { showExamples } = this.state
    const { location } = this.props
    const mainProps = { showExamples, toggleExamples: this.toggleExamples }

    const editable = location.pathname === '/admin_panel'
    return (
      <div className='landing-page'>
        <Switch>
          <Route exact path={['/', '/admin_panel']} render={() => <MainContent {...mainProps} editable={editable} />} />
          <Route path='/imprint' component={Imprint} />
          <Route path='/terms' component={Terms} />
          <Route exact={false} path={['/signin/:type/:msg', '/signin']} render={props => <SignIn {...props} />} />
          <Route path='/signup' render={props => <SignUp {...props} />} />
          <Route path='/signedup' render={props => <SignedUp {...props} />} />
        </Switch>
        
        <Footer />
    </div>
    )
  }
}

export default LandingPage
