import {
  TRANSLATE_FETCH_SUCCESS
} from '../actions/types'
import comm from '../images/comm.svg'
import commonFileText from '../images/common-file-text_big-1.svg'
import robotHead from '../images/robot-head-1.svg'
import cogBrowser from '../images/cog-browser.svg'
import conversationImg from '../images/conversation-chat-bubble-1.svg'

const initialState = {
  firstCard: {
    firstLine: '<h2>We get your project</h2>',
    secondLine: '<h3>Started & Managed</h3>'
  },
  whatISIQoom: {
    title: '<h3 style="text-align:center;"><span class="text-huge"><span style="color:#26276a;">What is i-Qoom?</span></span></h3>',
    description: `<p style='text-align:center;'> Largemouth bass Arctic char,
    salmon brook lamprey, delta smelt thorny catfish cardinalfish barbelless
    catfish Atlantic trout velvetfish char greenling.South American darter,cornetfish
    sucker wolf-herring mrigal eel - goby golden dojo garibaldi gouramie thresher shark.
    Jewfish cavefish escolar, triplespine tetra Redfin perch dragonfish, redlip blenny orbicular
    batfish.Ropefish roanoke bass escolar speckled trout; triplespine catla; yellow - edged moray
    yellow bass common tunny toadfish broadband dogfish.Ocean sunfish sablefish ghost knifefish
    Indian mul.Regal whiptail catfish streamer fish ribbon eel alfonsino climbing catfish!Antarctic
    icefish titan triggerfish pearl danio clownfish cisco medusafish, barbel spiny dwarf catfish
    sea chub, salmon harelip sucker labyrinth fish? Herring regal whiptail catfish; driftwood
    catfish, flathead.Spearfish damselfish electric knifefish amago bobtail snipe eel ?
    Horsefish orbicular batfish speckled marblefish sea devil. </p>`
  },
  samplesAndContent: {
    title: '<h3 style="text-align:center;"><span class="text-huge"><span style="color:#26276a;">Samples &amp; Contents</span></span></h3>',
    firstTab: {
      title: 'Comercial Managment',
      description: '<h4><span class="text-small">Comercial Managment</span></h4><p>Largemouth bass Arctic char, salmon brook lamprey, delta smelt thorny catfish cardinalfish barbelless catfish Atlantic trout velvetfish char greenling</p>'
    },
    secondTab: {
      title: 'Project Managment',
      description: 'Largemouth bass Arctic char, salmon brook lamprey, delta smelt thorny catfish cardinalfish barbelless catfish Atlantic trout velvetfish char greenling'
    },
    cards: [
      {
        image: comm,
        description: '<h4 style="text-align:center;"><span class="text-small">Resources</span></h4><p style="text-align:center;">Spearfish damselfish electric knifefish amago bobtail snipe eel?</p>'
      },
      {
        image: commonFileText,
        description: '<h4 style="text-align:center;"><span class="text-small">Documents</span></h4><p style="text-align:center;">Spearfish damselfish electric knifefish amago bobtail snipe eel?</p>'
      },
      {
        image: robotHead,
        description: '<h4 style="text-align:center;"><span class="text-small">Technical Clarification</span></h4><p style="text-align:center;">Spearfish damselfish electric knifefish amago bobtail snipe eel?</p>'
      },
      {
        image: cogBrowser,
        description: '<h4 style="text-align:center;"><span class="text-small">Quality Control</span></h4><p style="text-align:center;">Spearfish damselfish electric knifefish amago bobtail snipe eel?</p>'
      },
      {
        image: conversationImg,
        description: '<h4 style="text-align:center;"><span class="text-small">Correspondences</span></h4><p style="text-align:center;">Spearfish damselfish electric knifefish amago bobtail snipe eel?</p>'
      },
      {
        image: robotHead,
        description: '<h4 style="text-align:center;"><span class="text-small">Documents</span></h4><p style="text-align:center;">Spearfish damselfish electric knifefish amago bobtail snipe eel?</p>'
      }
    ]
  },
  reviews: {
    description: '<h3 style="text-align:center;"><span class="text-big"><span style="color:#26276a;">i-Qoom Reviews</span></span></h3><p style="text-align:center;">Snubnose parasitic eel slimy mackerel pineconefish pearl perch, cornetfish grouper: marlin</p>',
    cards: [
      {
        name: '<h6>Humayra Samiha</h6>',
        country: 'California, USA',
        stars: 5,
        desription: '<p style="text-align:center;"><span class="text-big">Crevice kelpfish</span></p><p style="text-align:center;">Elephant fish channel bass pike characid perch nurse shark, North American darter sea bass sixgill shark.'
      },
      {
        name: '<h6>Humayra Samiha</h6>',
        country: 'Hamburg, GER',
        stars: 5,
        desription: '<p style="text-align:center;"><span class="text-big">Crevice kelpfish</span></p><p style="text-align:center;">Elephant fish channel bass pike characid perch nurse shark, North American darter sea bass sixgill shark.'
      },
      {
        name: '<h6>Humayra Samiha</h6>',
        country: 'Stockhorm, SE',
        stars: 5,
        desription: '<p style="text-align:center;"><span class="text-big">Crevice kelpfish</span></p><p style="text-align:center;">Elephant fish channel bass pike characid perch nurse shark, North American darter sea bass sixgill shark.'
      },
      {
        name: '<h6>Humayra Samiha</h6>',
        country: 'Stockhorm, SE',
        stars: 5,
        desription: '<p style="text-align:center;"><span class="text-big">Crevice kelpfish</span></p><p style="text-align:center;">Elephant fish channel bass pike characid perch nurse shark, North American darter sea bass sixgill shark.'
      },
      {
        name: '<h6>Humayra Samiha</h6>',
        country: 'Hamburg, GER',
        stars: 5,
        desription: '<p style="text-align:center;"><span class="text-big">Crevice kelpfish</span></p><p style="text-align:center;">Elephant fish channel bass pike characid perch nurse shark, North American darter sea bass sixgill shark.'
      }
    ]
  },
  getStarted: {
    title: '<h3 style="text-align:center;"><span class="text-big"><span style="color:#26276a;">Contact - Let\'s get started!</span></span></h3>'
  },
  terms: {
    content: `<h2><span class="text-big"><span style="color:#26276a;"><strong>Terms</strong></span></span></h2>
              <p>Largemouth bass Arctic char, salmon brook lamprey, delta smelt thorny catfish cardinalfish barbelless</p>
              <p>catfish Atlantic trout velvetfish char greenling. South American darter, "cornetfish sucker wolf-herring</p>
              <p>mrigal eel-goby golden dojo garibaldi gouramie thresher shark." Jewfish cavefish escolar, triplespine tetra</p>
              <p>Redfin perch dragonfish, redlip blenny orbicular batfish. Ropefish roanoke bass escolar speckled trout;</p>
              <p>triplespine catla; yellow-edged moray yellow bass common tunny toadfish broadband dogfish. Ocean sunfish</p>
              <p>sablefish ghost knifefish Indian mul. Regal whiptail catfish streamer fish ribbon eel alfonsino climbing</p>
              <p>catfish! Antarctic icefish titan triggerfish pearl danio clownfish cisco medusafish, "barbel spiny dwarf</p>
              <p>catfish sea chub," salmon harelip sucker labyrinth fish? Herring regal whiptail catfish; driftwood catfish,</p>
              <p>flathead. Spearfish damselfish electric knifefish amago bobtail snipe eel? Horsefish orbicular batfish</p>
              <p>speckled marblefish sea devil.</p>`
  }
}

const adminPanelReducer = (state = initialState, action) => {
  switch (action.type) {
  case TRANSLATE_FETCH_SUCCESS:
    return {
      ...state
    }
  default:
    return state
  }
}

export default adminPanelReducer
