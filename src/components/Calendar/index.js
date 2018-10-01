const CALENDAR_INIT_DATE = Date.now();

class Calendar extends React.Component {
  state = {
    startDay: 1,
    startMonth: 1,
    startYear: parseInt(dateFns.format(CALENDAR_INIT_DATE, 'YYYY')),
    totalDays: 365,
  };

  numberInputChangeHandler = ({name, value}) => {
    if ((/^$/).test(value)) {
      this.setState({
        [name]: 1,
      }, this.numberInputSanityCheck);
    }

    if (!(/^\d+$/).test(value)) {
      return;
    }

    if (value < 1) {
      this.setState({
        [name]: 1,
      }, this.numberInputSanityCheck);
    }

    if (value > 0) {
      this.setState({
        [name]: (value <= this.numberInputMax(name))? value : this.numberInputMax(name),
      }, this.numberInputSanityCheck);
    }
  };

  numberInputClickUpHandler = ({name, value}) => {
    this.setState({
      [name]: (value === this.numberInputMax(name))? value : parseInt(value) + 1,
    }, this.numberInputSanityCheck);
  };

  numberInputClickDownHandler = ({name, value}) => {
    if (value > 1) {
      this.setState({
        [name]: parseInt(value) - 1,
      }, this.numberInputSanityCheck);
    }
  };

  numberInputSanityCheck = () => {
    const {
      format,
      lastDayOfMonth,
    } = dateFns;

    const {
      startDay,
      startMonth,
      startYear,
      totalDays,
    } = this.state;

    const validLastStartDay = this.numberInputMax('startDay');
    const validTotalDays = this.numberInputMax('totalDays');

    if (startDay > validLastStartDay) {
      this.setState({
        startDay: validLastStartDay
      });
    }

    if (totalDays > validTotalDays) {
      this.setState({
        totalDays: validTotalDays
      });
    }
  };

  numberInputMax = (name) => {
    const {
      format,
      lastDayOfMonth,
      differenceInCalendarDays,
    } = dateFns;

    const {
      startDay,
      startMonth,
      startYear,
    } = this.state;

    switch (name) {
      case 'startDay':
        return parseInt(format(lastDayOfMonth(`${startMonth}/1/${startYear}`), 'D'));
        break;
      case 'startMonth':
        return 12;
        break;
      case 'startYear':
        return 262144;
        break;
      case 'totalDays':
        return parseInt(differenceInCalendarDays('12/31/262144', `${startMonth}/${startDay}/${startYear}`)) + 1;
        break;
      default:
        return 2147483647
        break;
    }
  };

  render() {
    const {
      startDay,
      startMonth,
      startYear,
      totalDays,
    } = this.state;

    const {
      numberInputClickUpHandler,
      numberInputClickDownHandler,
      numberInputChangeHandler,
    } = this;

    return (
      <div className="calendar">
        <div className="calendar-inputs">
          <div className="row center-xs calendar-input-header-row">
            <h4>Start Date</h4>
          </div>
          <div className="row center-xs calendar-input-row">
            <div className="col-xs-3">
              <div className="box">
                <NumberInput
                  name="startMonth"
                  value={startMonth}
                  onClickUpHandler={numberInputClickUpHandler}
                  onClickDownHandler={numberInputClickDownHandler}
                  onChangeHandler={numberInputChangeHandler}
                ></NumberInput>
              </div>
            </div>
            <div className="col-xs-1">
              <div className="box day-divider">
                /
              </div>
            </div>
            <div className="col-xs-3">
              <div className="box">
                <NumberInput
                  name="startDay"
                  value={startDay}
                  onClickUpHandler={numberInputClickUpHandler}
                  onClickDownHandler={numberInputClickDownHandler}
                  onChangeHandler={numberInputChangeHandler}
                ></NumberInput>
              </div>
            </div>
            <div className="col-xs-1">
              <div className="box day-divider">
                /
              </div>
            </div>
            <div className="col-xs-3">
              <div className="box">
                <NumberInput
                  name="startYear"
                  value={startYear}
                  onClickUpHandler={numberInputClickUpHandler}
                  onClickDownHandler={numberInputClickDownHandler}
                  onChangeHandler={numberInputChangeHandler}
                ></NumberInput>
              </div>
            </div>
          </div>
          <div className="row center-xs calendar-input-header-row">
            <h4>Number of Days</h4>
          </div>
          <div className="row center-xs calendar-input-row">
            <div className="col-xs-3">
              <div className="box">
                <NumberInput
                  name="totalDays"
                  value={totalDays}
                  onClickUpHandler={numberInputClickUpHandler}
                  onClickDownHandler={numberInputClickDownHandler}
                  onChangeHandler={numberInputChangeHandler}
                ></NumberInput>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
