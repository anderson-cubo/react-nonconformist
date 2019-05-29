import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TextInputDEFAULT from './defaultInput'

import isEmpty from 'lodash/isEmpty'

export const validateValueOrRequired = ({ required, value }, validation) => {
  const valued = String(value || '')
  if (required || isEmpty(valued) === false) {
    return validation(value)
  }
  return true
}


const _handleProps = props => props

/**
 * With this helper you can create
 * input that can connect with Form
*/
const createInput = (data = {}) => {
  const {
    inputComponent = TextInputDEFAULT,
    validate: _validate,
    handleProps = _handleProps,
  } = data
  return class Input extends Component {
    static propTypes = {
      onBlur: PropTypes.func,
      onFocus: PropTypes.func,
      onChangeText: PropTypes.func,
      /**
       * When using Form you need to connect this
       * input with Form
      */
      setConnection: PropTypes.func,
      /**
       * If you need to inform a user from some
       * error you need to pass the error message
      */
      error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
      ])
    }

    state = {
      canDisplayError: false,
      pristine: true,
      blur: true,
      focus: false,
      dirty: false
    }

    focus = () => {
      this._refInput.focus()
    }

    _onBlur = () => {
      const { onBlur } = this.props
      this.setState({ blur: true, focus: false, pristine: false })
      onBlur && onBlur()
    }

    _onFocus = () => {
      const { onFocus } = this.props
      this.setState({ blur: false, focus: true, pristine: false })
      onFocus && onFocus()
    }

    setDirty = () => {
      this.setState({ dirty: true })
      this.setCanDisplayError()
    }

    setCanDisplayError = () => {
      this.setState({ canDisplayError: true })
    }

    isValid = () => {
      if (_validate) return _validate(handleProps(this.props))
      return true
    }

    _set = (v) => {
      const { onChangeText } = handleProps(this.props)
      this.setState({ pristine: false, dirty: true })
      onChangeText && onChangeText(v)
    }

    componentDidMount () {
      const { setConnection } = this.props

      setConnection && setConnection(this)
    }

    componentDidUpdate (prevProps, prevState) {
      if (
        this.state.dirty === true &&
        this.state.focus === false &&
        prevState.focus === true &&
        this.state.canDisplayError === false
      ) {
        this.setCanDisplayError()
      }
    }

    render () {
      const { error, ...restProps } = handleProps(this.props)

      const { canDisplayError } = this.state

      const isValid = canDisplayError ? this.isValid() : true

      const Component = inputComponent

      return (
        <Component
          ref={ref => (this._refInput = ref)}
          {...restProps}
          onBlur={this._onBlur}
          onFocus={this._onFocus}
          onChangeText={this._set}
          error={!isValid && error}
        />
      )
    }
  }
}

export default createInput
