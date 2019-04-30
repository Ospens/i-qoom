import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextEditor from '../../elements/TextEditor'

class WhatIsIQoom extends Component {

  render() {
    const { authed, isAdmin } = this.props
    return (
      <section id='what-is-card'>
        <div className='container'>
          {authed && isAdmin ?
            (
              <React.Fragment>
                <TextEditor text={<h2 className='text-center block-header'>What is i-Qoom?</h2>} />
                <TextEditor text={<p className='text-center'>
                  Largemouth bass Arctic char, salmon brook lamprey, delta smelt thorny catfish cardinalfish barbelless
                  catfish Atlantic trout velvetfish char greenling. South American darter, "cornetfish sucker wolf-herring
                  mrigal eel-goby golden dojo garibaldi gouramie thresher shark." Jewfish cavefish escolar, triplespine tetra
                  Redfin perch dragonfish, redlip blenny orbicular batfish. Ropefish roanoke bass escolar speckled trout;
                  triplespine catla; yellow-edged moray yellow bass common tunny toadfish broadband dogfish. Ocean sunfish
                  sablefish ghost knifefish Indian mul. Regal whiptail catfish streamer fish ribbon eel alfonsino climbing
                  catfish! Antarctic icefish titan triggerfish pearl danio clownfish cisco medusafish, "barbel spiny dwarf
                  catfish sea chub," salmon harelip sucker labyrinth fish? Herring regal whiptail catfish; driftwood catfish,
                  flathead. Spearfish damselfish electric knifefish amago bobtail snipe eel? Horsefish orbicular batfish
                  speckled marblefish sea devil.
        </p>} />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <h2 className='text-center block-header'>What is i-Qoom?</h2>
                <p className='text-center'>
                  Largemouth bass Arctic char, salmon brook lamprey, delta smelt thorny catfish cardinalfish barbelless
                  catfish Atlantic trout velvetfish char greenling. South American darter, "cornetfish sucker wolf-herring
                  mrigal eel-goby golden dojo garibaldi gouramie thresher shark." Jewfish cavefish escolar, triplespine tetra
                  Redfin perch dragonfish, redlip blenny orbicular batfish. Ropefish roanoke bass escolar speckled trout;
                  triplespine catla; yellow-edged moray yellow bass common tunny toadfish broadband dogfish. Ocean sunfish
                  sablefish ghost knifefish Indian mul. Regal whiptail catfish streamer fish ribbon eel alfonsino climbing
                  catfish! Antarctic icefish titan triggerfish pearl danio clownfish cisco medusafish, "barbel spiny dwarf
                  catfish sea chub," salmon harelip sucker labyrinth fish? Herring regal whiptail catfish; driftwood catfish,
                  flathead. Spearfish damselfish electric knifefish amago bobtail snipe eel? Horsefish orbicular batfish
                  speckled marblefish sea devil.
                </p>
              </React.Fragment>
            )}
        </div>
      </section>
    )
  }
}

const mapStateToProps = ({ auth }) => ({
  authed: auth.authStatus,
  isAdmin: true
})

export default connect(mapStateToProps)(WhatIsIQoom)