const COUNTRY_COLLECTION = [
  'AD',
  'AG',
  'AI',
  'AL',
  'AM',
  'AO',
  'AR',
  'AS',
  'AT',
  'AU',
  'AW',
  'AX',
  'AZ',
  'BA',
  'BB',
  'BE',
  'BG',
  'BI',
  'BL',
  'BO',
  'BQ',
  'BR',
  'BS',
  'BW',
  'BY',
  'BZ',
  'CA',
  'CC',
  'CD',
  'CF',
  'CG',
  'CH',
  'CL',
  'CM',
  'CN',
  'CO',
  'CR',
  'CU',
  'CW',
  'CY',
  'CZ',
  'DE',
  'DK',
  'DM',
  'DO',
  'EC',
  'EE',
  'ES',
  'ET',
  'FI',
  'FO',
  'FR',
  'GA',
  'GB',
  'GD',
  'GF',
  'GG',
  'GI',
  'GL',
  'GP',
  'GQ',
  'GR',
  'GT',
  'GU',
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
  'JP',
  'KE',
  'KR',
  'LI',
  'LS',
  'LT',
  'LU',
  'LV',
  'MC',
  'MD',
  'ME',
  'MG',
  'MK',
  'MQ',
  'MT',
  'MW',
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
  'PT',
  'PY',
  'RE',
  'RO',
  'RS',
  'RU',
  'RW',
  'SE',
  'SH',
  'SI',
  'SJ',
  'SK',
  'SM',
  'SO',
  'SS',
  'SV',
  'TG',
  'TO',
  'TR',
  'TZ',
  'UA',
  'UG',
  'US',
  'UY',
  'VA',
  'VE',
  'VN',
  'XK',
  'YT',
  'ZA',
  'ZM',
  'ZW',
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
        <div className={classNames('drop-down-item-list',
           {open})}>
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
