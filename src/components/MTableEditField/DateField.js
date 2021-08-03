import DateFnsUtils from '@date-io/date-fns';
import DatePicker from '@material-ui/lab/DatePicker';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import React from 'react';

function DateField({
  columnDef,
  value,
  onChange,
  locale,
  forwardedRef,
  ...rest
}) {
  const getProps = () => {
    const {
      columnDef,
      rowData,
      onRowDataChange,
      errorState,
      onBulkEditRowChanged,
      scrollWidth,
      ...remaining
    } = rest;
    return remaining;
  };

  const dateFormat =
    columnDef.dateSetting && columnDef.dateSetting.format
      ? columnDef.dateSetting.format
      : 'dd.MM.yyyy';

  const datePickerProps = getProps();

  return (
    <LocalizationProvider utils={DateFnsUtils} locale={locale}>
      <DatePicker
        {...datePickerProps}
        ref={forwardedRef}
        format={dateFormat}
        value={value || null}
        onChange={onChange}
        clearable
        InputProps={{
          style: {
            fontSize: 13
          }
        }}
        inputProps={{
          'aria-label': `${columnDef.title}: press space to edit`
        }}
      />
    </LocalizationProvider>
  );
}

export default React.forwardRef(function DateFieldRef(props, ref) {
  return <DateField {...props} forwardedRef={ref} />;
});
