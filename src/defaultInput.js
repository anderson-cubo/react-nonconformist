import React, { Component } from 'react'
export default class InputComponent extends Component {
  focus = () => {
    this._refInput && this._refInput.focus()
  }

  _onChangeText = e => {
    const { onChangeText } = this.props
    onChangeText && onChangeText(e.target.value)
  }

  _submit = e => {
    const { onSubmitEditing } = this.props

    if (e.which === 13 && onSubmitEditing) {
        onSubmitEditing()
    }
  }

  render () {
    const {
      label,
      onChangeText,
      value,
      error,
      onBlur,
      onFocus,
      onSubmitEditing,
      ...restParams
    } = this.props

    return (
      <fieldset>
        <label>{label}</label>
        <input
          ref={ref => (this._refInput = ref)}
          value={value}
          onChange={this._onChangeText}
          onBlur={onBlur}
          onFocus={onFocus}
          {...restParams}
        />
        {error && <span style={{ fontSize: '0.7em', color: 'red' }}>{error}</span>}
      </fieldset>
    )
  }
}
