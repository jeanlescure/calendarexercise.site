class Month extends React.PureComponent {
  render() {
    const {
      parse,
      format,
      addDays,
      isSameMonth,
      lastDayOfMonth,
    } = dateFns;

    const {
      startDate,
      numberOfDays,
    } = this.props;

    const day = parseInt(format(startDate, 'D'));
    const month = parseInt(format(startDate, 'M'));
    const year = format(startDate, 'YYYY');
    const dayIndex = parseInt(format(startDate, 'd'));
    const lastDayOfMonthDay = (isSameMonth(startDate, addDays(startDate, numberOfDays - 1)))?
      addDays(startDate, numberOfDays - 1)
      :
      lastDayOfMonth(startDate, numberOfDays - 1);
    const lastDayOfMonthIndex = format(lastDayOfMonthDay,'d');
    let valueLabelCollection = Array.from(
        Array(parseInt(format(lastDayOfMonthDay,'D')) - day + 1).keys()
      ).map(
        (d) => (d + day)
      );

    if (dayIndex > 0) {
      valueLabelCollection = [].concat(
        Array.from(
          Array(dayIndex).keys()
        ).map(
          (d) => null
        ),
        valueLabelCollection
      );
    }

    if (lastDayOfMonthIndex < 6) {
      valueLabelCollection = [].concat(
        valueLabelCollection,
        Array.from(
          Array(6 - lastDayOfMonthIndex).keys()
        ).map(
          (d) => null
        )
      );
    }

    return (
      <div className="col-xs month">
        <div className="box">
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <div className="row">
                  {
                    Array.from(Array(7).keys()).map(
                      (d) => (<Day value={d} dayType={DAY_TYPES.HEADER} key={d}></Day>)
                    )
                  }
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12">
              <div className="box center-xs month-header">
                {format(startDate, 'MMMM')} {format(startDate, 'YYYY')}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs">
              <div className="box">
                <div className="row">
                  {
                    valueLabelCollection.map((valueLabel, i) => (
                      <Day
                        value={valueLabel}
                        key={i}
                      ></Day>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
