import React, { Component } from 'react'

export class CodificationTable extends Component {
  render() {
    return (
      <div className='codification-codes-values-table'>
        <div className='codification-codes-values-column'>
          <div className='codification-codes-values-block originating_company'>
            <div className='codification-codes-values-block__title'>
              <h6>Originating company</h6>
              <label>This is an example of a description text</label>
            </div>
            <div className='codification-codes-values-block__values-list'>
              {[...Array(16)].map((el, i) => (
                <div className='codification-codes-values-block__value' key={i}>
                  XXX - Originating company example
                </div>
              ))}
            </div>
          </div>

          <div className='codification-codes-values-block discipline'>
            <div className='codification-codes-values-block__title'>
              <h6>Discipline</h6>
              <label>This is an example of a description text</label>
            </div>
          </div>
        </div>

        <div className='codification-codes-values-column'>
          <div className='codification-codes-values-block discipline'>
            <div className='codification-codes-values-block__title'>
              <h6>Discipline</h6>
              <label>This is an example of a description text</label>
            </div>
            <div className='codification-codes-values-block__values-list'>
              {[...Array(3)].map((el, i) => (
                <div className='codification-codes-values-block__value' key={i} >
                  <div className='input-group'>
                    <input
                      type='text'
                      className='form-control'
                      id='validationDefaultUsername'
                      defaultValue='XXX - Discipline example'
                    />
                    <div className='input-group-append'>
                      <span
                        className='input-group-text remove-item'
                        id='inputGroupPrepend2'>
                        x
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='codification-codes-values-column'>
          <div className='codification-codes-values-block originating_company'>
            <div className='codification-codes-values-block__title'>
              <h6>Originating company</h6>
              <label>This is an example of a description text</label>
            </div>
            <div className='codification-codes-values-block__values-list'>
              {[...Array(5)].map((el, i) => (
                <div className='codification-codes-values-block__value' key={i}>
                  XXX - Originating company example
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CodificationTable
