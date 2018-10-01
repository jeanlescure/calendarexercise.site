const COUNTRY_COLLECTION = [
  'US',
  'CR',
  'AD',
  'AR',
  'AT',
  'AU',
  'AX',
  'BB',
  'BE',
  'BG',
  'BO',
  'BR',
  'BS',
  'BW',
  'BY',
  'BZ',
  'CA',
  'CH',
  'CL',
  'CN',
  'CO',
  'CU',
  'CY',
  'CZ',
  'DE',
  'DK',
  'DO',
  'EC',
  'EE',
  'EG',
  'ES',
  'FI',
  'FO',
  'FR',
  'GA',
  'GB',
  'GD',
  'GL',
  'GR',
  'GT',
  'GY',
  'HN',
  'HR',
  'HT',
  'HU',
  'IE',
  'IM',
  'IS',
  'IT',
  'JE',
  'JM',
  'LI',
  'LS',
  'LT',
  'LU',
  'LV',
  'MA',
  'MC',
  'MD',
  'MG',
  'MK',
  'MT',
  'MX',
  'MZ',
  'NA',
  'NI',
  'NL',
  'NO',
  'NZ',
  'PA',
  'PE',
  'PL',
  'PR',
  'PT',
  'PY',
  'RO',
  'RS',
  'RU',
  'SE',
  'SI',
  'SJ',
  'SK',
  'SM',
  'SR',
  'SV',
  'TN',
  'TR',
  'UA',
  'VA',
  'VE',
  'UY',
  'ZA',
];

const DropDownItem = ({
  children,
  onClickHandler,
  onChangeHandler,
  onSelectHandler,
  selected,
  value,
}) => {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onSelectHandler(value);
        onClickHandler();
      }}
      className={classNames({selected})}
    >
      {children}
    </a>
  );
};


class DropDown extends React.PureComponent {
  render() {
    const {
      open,
      selection,
      onClickHandler,
      onChangeHandler,
      onSelectHandler,
    } = this.props;

    return (
      <div className="row drop-down">
        <div className="col-xs-8">
          <input
            onChange={onChangeHandler}
            className="box"
            value={selection}>
          </input>
        </div>
        <div className="col-xs-4">
          <button
            onClick={onClickHandler}
            className="box"
          >
            {(open)? '▲' : '▼'}
          </button>
        </div>
        <div className={classNames('drop-down-item-list', {open})}>
          {
            COUNTRY_COLLECTION.map(
              (value, i) => (
                <DropDownItem
                  key={i}
                  onClickHandler={onClickHandler}
                  onChangeHandler={onChangeHandler}
                  onSelectHandler={onSelectHandler}
                  value={value}
                  selected={(value === selection)? true : false}
                >
                  {value}
                </DropDownItem>
              )
            )
          }
        </div>
      </div>
    );
  }
}
