import React, { Component } from 'react'

class GetStarted extends Component {

  render() {
    return (
      <section id='get-started-card'>
        <div className='container'>
          <h2 className='text-center block-header'>Contact - Let's get started!</h2>
          <form onSubmit={this.handleSubmit}>
            <div className='form-row'>
              <div className='form-group col-md-6'>
                <div className='form-group'>
                  <label htmlFor='e-mail'>Enter your E-mail address</label>
                  <input
                    type='e-mail'
                    id='e-mail'
                    onChange={this.handleChange}
                    className='form-control'
                    aria-describedby='loginHelp'
                    placeholder='E-mail'
                  />
                </div>
                <div className='form-group form-number-group'>
                  <label htmlFor='phone'>Enter your Phone number</label>
                  <input
                    type='phone'
                    id='phone'
                    onChange={this.handleChange}
                    className='form-control'
                    placeholder='0049 160 000000'
                  />
                </div>
              </div>
              <div className='form-group col-md-6'>
                <label htmlFor='phone'>Enter your Text</label>
                <textarea
                  id='text'
                  rows='6'
                  onChange={this.handleChange}
                  className='form-control'
                  placeholder='Text'
                />
              </div>
            </div>
            <div className='text-center'>
              <button type='submit' className='col-4 btn btn-primary'>Send</button>
            </div>
          </form>
        </div>
      </section>
    )
  }
}

export default GetStarted
