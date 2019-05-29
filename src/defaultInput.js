export default class InputEmailComponent extends Component {
  focus = () => {
    this._refInput && this._refInput.focus()
  }

  render () {
    const {
      label,
      onChangeText,
      value,
      error,
      onBlur,
      onFocus,
      ...restParams
    } = this.props

    return (
      <fieldset>
        <label>{label}</label>
        <input
          ref={ref => (this._refInput = ref)}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          onFocus={onFocus}
          {...restParams}
        />
        {error && <span style={{ fontSize: '0.7em', color: 'red' }}>{error}</span>}
      </fieldset>
    )
  }
}
