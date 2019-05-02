import React, { Component } from 'react'
import LandingPageHeader from './LandingPageHeader'
import { Route, Switch } from 'react-router-dom'
import Footer from './Footer'
import MainContent from './MainContent'
import Imprint from './Imprint'
import Terms from './Terms'
import LandingMenu from './LandingMenu'

class LandingPage extends Component {

  state = {
    showSignInSlider: false,
    showSignUp: false,
    showExamples: false
  }

  toggleSignInSlider = () => {
    const { showSignInSlider } = this.state
    this.setState({
      showSignInSlider: !showSignInSlider,
      showSignUp: false
    })
  }

  toggleSignUp = () => {
    const { showSignUp } = this.state
    this.setState({
      showSignUp: !showSignUp,
      showSignInSlider: false
    })
  }

  showMainPage = () => {
    this.setState({
      showSignUp: false,
      showSignInSlider: false
    })
  }

  toggleExamples = () => {
    const { showExamples } = this.state
    this.setState({ showExamples: !showExamples})
  }

  render() {
    const { showSignInSlider, showSignUp, showExamples } = this.state
    const { location } = this.props
    const mainProps = {
      showSignInSlider,
      showSignUp,
      showExamples,
      showMainPage: this.showMainPage,
      toggleSignInForm: this.toggleSignInSlider,
      toggleSignUp: this.toggleSignUp,
      toggleExamples: this.toggleExamples
    }

    const nonMain = location.pathname !== '/' && location.pathname !== '/admin_panel'
    return (
      <div className='landing-page'>
        <LandingPageHeader {...mainProps} nonMain={nonMain} />
        <Switch>
          <Route exact path={['/', '/admin_panel']} render={() => <MainContent {...mainProps} />} />
          <Route path='/imprint' component={Imprint} />
          <Route path='/terms' component={Terms} />
          <Route path='/menu' component={LandingMenu} />
        </Switch>
        
        <Footer />
    </div>
    )
  }
}

export default LandingPage
