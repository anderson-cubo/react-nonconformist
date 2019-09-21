import React, { Component } from 'react'
import PropTypes from 'prop-types'

import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import isFunction from 'lodash/isFunction'

/**
 * Understand context and inputs and check if
 * inputs are valid or not.
*/
export default class Form extends Component {
  static propTypes = {
    /**
     * when something with connected inputs
     * are changed you will receive in this function
    */
    onChange: PropTypes.func,
    /**
     * if all inputs are valid submit the values
     * from this form
    */
    onSubmit: PropTypes.func,
    /**
     * A function with parameters (connect(), submit(), isValid)
     * with connect you can spread it to the input and it will be
     * connected with this form. Wiht submit you can try to
     * call onSubmit (it will only work when all data is valid)
     * isValid is a boolean to check if this form is valid or not.
    */
    children: PropTypes.func.isRequired,
    /**
     * When you have to get the value of an object with a different
     * structure.
    */
    handleGetValue: PropTypes.func
  }

  state = {
    valid: false
  }

  _refs = {}

  connect = name => {
    const that = this
    return {
      setConnection: ref => this.setRef(name, ref),

      disconnect: () => this.disconnect(name),

      get value () {
        if (that.handleGetValue) {
          return that.handleGetValue(name, that.props)
        }
        return get(that.props, ['values', name]) || ''
      },

      onChangeText: value => this._onChange(name, value),
      onSubmitEditing: this.submit
    }
  }

  componentDidUpdate () {
    this._setValidatedFields()
  }

  componentDidMount () {
    this._setValidatedFields()
  }

  _onChange = (name, value) => {
    const { onChange } = this.props
    onChange && onChange({ [name]: value })
  }

  _setValidatedFields = () => {
    const { valid } = this.state
    const nowValid =  isEmpty(this._validateFields(false))
    if (valid !== nowValid) this.setState({ valid: nowValid })
  }

  _validateFields = (forceDirty = true) => {
    let issuesWith = []
    for (let key in this._refs) {
      const ref = this._refs[key]
      if (ref && ref.isValid) {
        if (ref.isValid()) continue
        if (isFunction(ref.setDirty) && forceDirty) ref.setDirty()
        issuesWith.push(key)
      }
    }
    return issuesWith
  }

  submit = () => {
    const { onSubmit } = this.props
    if (isEmpty(this._validateFields())) {
      onSubmit && onSubmit()
    }
  }

  setRef = (name, ref) => {
    this._refs[name] = ref
  }

  disconnect = (name) => {
    if (this._refs[name]) delete this._refs[name]
  }

  _getVauesFromProps = key => {
    return this.props[key]
  }

  render () {
    const { children } = this.props
    return (
      <React.Fragment>
        {children(this.connect, this.submit, this.state.valid)}
      </React.Fragment>
    )
  }
}
