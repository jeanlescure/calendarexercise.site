class NumberInput extends React.PureComponent {
  onClickHandler = ({name, value, handlerType}) => {
    this.props[`onClick${handlerType}Handler`]({name, value});
  };

  render() {
    const {
      value,
      name,
      onClickUpHandler,
      onClickDownHandler,
      onChangeHandler,
    } = this.props;

    return (
      <div className="row number-input">
        <div className="col-xs-8">
          <input
            className="box"
            value={value}
            onChange={(e)=> onChangeHandler({name, value: e.target.value})}
          ></input>
        </div>
        <div className="col-xs-4">
          <div className="box">
            <button
              className="row top-xs"
              onClick={
                (e) => this.onClickHandler({
                  name,
                  value,
                  handlerType: 'Up'
                })
              }
            >
              ▲
            </button>
            <button
              className="row top-xs"
              onClick={
                (e) => this.onClickHandler({
                  name,
                  value,
                  handlerType: 'Down'
                })
              }
            >
              ▼
            </button>
          </div>
        </div>
      </div>
    );
  }
}
