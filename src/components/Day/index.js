const WEEK_DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const DAY_TYPES = {
  HEADER: 'header',
  WEEKEND: 'weekend',
  WEEKDAY: 'weekday',
  TODAY: 'today',
  HOLIDAY: 'holiday',
  INVALID: 'invalid',
};

class Day extends React.PureComponent {
  render() {
    const {
      dayType,
      value,
    } = this.props;

    const labelValue = (dayType === DAY_TYPES.HEADER)? WEEK_DAY_LABELS[value] : value;

    return (
      <div className={classNames('col-xs day', 'left-xs', dayType)}>
        <div className="box center-xs">
          {labelValue}
        </div>
      </div>
    );
  }
}
