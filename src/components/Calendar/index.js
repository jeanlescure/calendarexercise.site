const CALENDAR_INIT_DATE = Date.now();

class Calendar extends React.Component {
  state = {
    startDay: 1,
    startMonth: 1,
    startYear: parseInt(dateFns.format(CALENDAR_INIT_DATE, 'YYYY')),
    totalDays: 365,
    countryDropDownOpen: false,
    countryDropDownSelection: 'CR',
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

  countryDropDownClickHandler = () => {
    this.setState({
      countryDropDownOpen: !this.state.countryDropDownOpen,
    });
  };

  countryDropDownChangeHandler = (e) => {
    const newVal = e.target.value.toUpperCase();

    if (!(/(^[A-Z]{0,2}$)/).test(newVal)) {
      return;
    }

    if (newVal.length === 2) {
      if (COUNTRY_COLLECTION.includes(newVal)) {
        this.setState({
          countryDropDownSelection: newVal,
          loading: true,
          error: false,
        });
        return newVal;
      } else {
        this.setState({
          countryDropDownSelection: newVal,
        });

        alert(`Invalid country code entered: ${newVal}`);
      }
    } else if(newVal.length < 2) {
      this.setState({
        countryDropDownSelection: newVal,
      });
      return newVal;
    }
  };

  countryDropDownSelectHandler = (value) => {
    if (!this.state.loading) {
      this.setState({
        countryDropDownSelection: value,
        loading: true,
        error: false,
      });
    }
  };

  render() {
    const {
      parse,
      format,
      differenceInCalendarMonths,
      addDays,
      lastDayOfMonth,
      differenceInDays,
      setDate,
      addMonths,
      startOfWeek,
      lastDayOfWeek,
    } = dateFns;

    const {
      startDay,
      startMonth,
      startYear,
      totalDays,
      countryDropDownOpen,
      countryDropDownSelection,
    } = this.state;

    const {
      numberInputClickUpHandler,
      numberInputClickDownHandler,
      numberInputChangeHandler,
      countryDropDownClickHandler,
      countryDropDownChangeHandler,
      countryDropDownSelectHandler,
    } = this;

    let totalDaysLeft = totalDays;

    const startDate = parse(`${startMonth}/${startDay}/${startYear}`);
    const totalMonths = differenceInCalendarMonths(addDays(startDate, totalDays - 1), startDate) + 1;

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
          <div className="row center-xs calendar-input-header-row">
            <h4>Country</h4>
          </div>
          <div className="row center-xs calendar-input-row">
            <div className="col-xs-3">
              <div className="box">
                <DropDown
                  open={countryDropDownOpen}
                  selection={countryDropDownSelection}
                  onClickHandler={countryDropDownClickHandler}
                  onChangeHandler={countryDropDownChangeHandler}
                  onSelectHandler={countryDropDownSelectHandler}
                ></DropDown>
              </div>
            </div>
          </div>
          <div className="row left-xs calendar-legend-row">
            <div className="col-xs-6">
              <strong>Today:</strong>
              <Day
                value={parseInt(format(CALENDAR_INIT_DATE, 'D'))}
                dayType={DAY_TYPES.TODAY}
              ></Day>
            </div>
            <div className="col-xs-6">
              <strong>Week Day:</strong>
              <Day
                value={parseInt(format(addDays(startOfWeek(CALENDAR_INIT_DATE), 1), 'D'))}
                dayType={DAY_TYPES.WEEKDAY}
              ></Day>
            </div>
            <div className="col-xs-6">
              <strong>Weekend Day:</strong>
              <Day
                value={parseInt(format(lastDayOfWeek(CALENDAR_INIT_DATE), 'D'))}
                dayType={DAY_TYPES.WEEKEND}
              ></Day>
            </div>
            <div className="col-xs-6">
              <strong>Holiday:</strong>
              <Day
                value={1}
                dayType={DAY_TYPES.HOLIDAY}
              ></Day>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className="box">
              <div className="row">
                {
                  Array.from(Array(totalMonths).keys()).map(
                    (m) => {
                      const calendarStartDate = (m > 0)? addMonths(setDate(startDate, 1), m) : startDate;
                      const lastDayOfMonthDay = parseInt(format(lastDayOfMonth(calendarStartDate),'D'));
                      const month = (
                        <Month
                          startDate={calendarStartDate}
                          numberOfDays={totalDaysLeft}
                          key={m}
                        >
                        </Month>
                      );

                      totalDaysLeft -= differenceInDays(setDate(calendarStartDate, lastDayOfMonthDay), calendarStartDate) + 1;
                      return month;
                    }
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
