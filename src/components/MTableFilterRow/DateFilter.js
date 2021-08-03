import DateFnsUtils from '@date-io/date-fns';
import DatePicker from '@material-ui/lab/DatePicker';
import DateTimePicker from '@material-ui/lab/DateTimePicker';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import TimePicker from '@material-ui/lab/TimePicker';
import React from 'react';
import { getLocalizedFilterPlaceHolder } from './utils';

function DateFilter({
  columnDef,
  onFilterChanged,
  localization,
  forwardedRef
}) {
  const onDateInputChange = (date) =>
    onFilterChanged(columnDef.tableData.id, date);

  const pickerProps = {
    value: columnDef.tableData.filterValue || null,
    onChange: onDateInputChange,
    placeholder: getLocalizedFilterPlaceHolder(columnDef),
    clearable: true
  };

  let dateInputElement = null;
  if (columnDef.type === 'date') {
    dateInputElement = <DatePicker {...pickerProps} ref={forwardedRef} />;
  } else if (columnDef.type === 'datetime') {
    dateInputElement = <DateTimePicker {...pickerProps} ref={forwardedRef} />;
  } else if (columnDef.type === 'time') {
    dateInputElement = <TimePicker {...pickerProps} ref={forwardedRef} />;
  }

  return (
    <LocalizationProvider
      utils={DateFnsUtils}
      locale={localization.dateTimePickerLocalization}
    >
      {dateInputElement}
    </LocalizationProvider>
  );
}

export default React.forwardRef(function DateFilterRef(props, ref) {
  return <DateFilter {...props} forwardedRef={ref} />;
});
