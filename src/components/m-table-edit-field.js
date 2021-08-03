import DateFnsUtils from '@date-io/date-fns';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import DatePicker from '@material-ui/lab/DatePicker';
import DateTimePicker from '@material-ui/lab/DateTimePicker';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import TimePicker from '@material-ui/lab/TimePicker';
import PropTypes from 'prop-types';
import React from 'react';

class MTableEditField extends React.Component {
  getProps() {
    const {
      columnDef,
      rowData,
      onRowDataChange,
      errorState,
      onBulkEditRowChanged,
      scrollWidth,
      ...props
    } = this.props;
    return props;
  }

  renderLookupField() {
    const { helperText, error, ...props } = this.getProps();
    return (
      <FormControl error={Boolean(error)}>
        <Select
          {...props}
          value={this.props.value === undefined ? '' : this.props.value}
          onChange={(event) => this.props.onChange(event.target.value)}
          style={{
            fontSize: 13
          }}
          SelectDisplayProps={{ 'aria-label': this.props.columnDef.title }}
        >
          {Object.keys(this.props.columnDef.lookup).map((key) => (
            <MenuItem key={key} value={key}>
              {this.props.columnDef.lookup[key]}
            </MenuItem>
          ))}
        </Select>
        {Boolean(helperText) && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }

  renderBooleanField() {
    const { helperText, error, ...props } = this.getProps();

    return (
      <FormControl error={Boolean(error)} component="fieldset">
        <FormGroup>
          <FormControlLabel
            label=""
            control={
              <Checkbox
                {...props}
                value={String(this.props.value)}
                checked={Boolean(this.props.value)}
                onChange={(event) => this.props.onChange(event.target.checked)}
                style={{
                  padding: 0,
                  width: 24,
                  marginLeft: 9
                }}
                inputProps={{
                  'aria-label': this.props.columnDef.title
                }}
              />
            }
          />
        </FormGroup>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    );
  }

  renderDateField() {
    const dateFormat =
      this.props.columnDef.dateSetting &&
      this.props.columnDef.dateSetting.format
        ? this.props.columnDef.dateSetting.format
        : 'dd.MM.yyyy';
    return (
      <LocalizationProvider utils={DateFnsUtils} locale={this.props.locale}>
        <DatePicker
          {...this.getProps()}
          format={dateFormat}
          value={this.props.value || null}
          onChange={this.props.onChange}
          clearable
          InputProps={{
            style: {
              fontSize: 13
            }
          }}
          inputProps={{
            'aria-label': `${this.props.columnDef.title}: press space to edit`
          }}
        />
      </LocalizationProvider>
    );
  }

  renderTimeField() {
    return (
      <LocalizationProvider utils={DateFnsUtils} locale={this.props.locale}>
        <TimePicker
          {...this.getProps()}
          format="HH:mm:ss"
          value={this.props.value || null}
          onChange={this.props.onChange}
          clearable
          InputProps={{
            style: {
              fontSize: 13
            }
          }}
          inputProps={{
            'aria-label': `${this.props.columnDef.title}: press space to edit`
          }}
        />
      </LocalizationProvider>
    );
  }

  renderDateTimeField() {
    return (
      <LocalizationProvider utils={DateFnsUtils} locale={this.props.locale}>
        <DateTimePicker
          {...this.getProps()}
          format="dd.MM.yyyy HH:mm:ss"
          value={this.props.value || null}
          onChange={this.props.onChange}
          clearable
          InputProps={{
            style: {
              fontSize: 13
            }
          }}
          inputProps={{
            'aria-label': `${this.props.columnDef.title}: press space to edit`
          }}
        />
      </LocalizationProvider>
    );
  }

  renderTextField() {
    return (
      <TextField
        {...this.getProps()}
        fullWidth
        type={this.props.columnDef.type === 'numeric' ? 'number' : 'text'}
        placeholder={
          this.props.columnDef.editPlaceholder || this.props.columnDef.title
        }
        value={this.props.value === undefined ? '' : this.props.value}
        onChange={(event) =>
          this.props.onChange(
            this.props.columnDef.type === 'numeric'
              ? event.target.valueAsNumber
              : event.target.value
          )
        }
        InputProps={{
          style: {
            minWidth: 50,
            fontSize: 13
          }
        }}
        inputProps={{
          'aria-label': this.props.columnDef.title,
          style:
            this.props.columnDef.type === 'numeric'
              ? { textAlign: 'right' }
              : {}
        }}
      />
    );
  }

  renderCurrencyField() {
    return (
      <TextField
        {...this.getProps()}
        placeholder={
          this.props.columnDef.editPlaceholder || this.props.columnDef.title
        }
        type="number"
        value={this.props.value === undefined ? '' : this.props.value}
        onChange={(event) => {
          let value = event.target.valueAsNumber;
          if (!value && value !== 0) {
            value = undefined;
          }
          return this.props.onChange(value);
        }}
        InputProps={{
          style: {
            fontSize: 13,
            textAlign: 'right'
          }
        }}
        inputProps={{
          'aria-label': this.props.columnDef.title,
          style: { textAlign: 'right' }
        }}
        onKeyDown={this.props.onKeyDown}
        autoFocus={this.props.autoFocus}
      />
    );
  }

  render() {
    let component = 'ok';

    if (this.props.columnDef.editComponent) {
      component = this.props.columnDef.editComponent(this.props);
    } else if (this.props.columnDef.lookup) {
      component = this.renderLookupField();
    } else if (this.props.columnDef.type === 'boolean') {
      component = this.renderBooleanField();
    } else if (this.props.columnDef.type === 'date') {
      component = this.renderDateField();
    } else if (this.props.columnDef.type === 'time') {
      component = this.renderTimeField();
    } else if (this.props.columnDef.type === 'datetime') {
      component = this.renderDateTimeField();
    } else if (this.props.columnDef.type === 'currency') {
      component = this.renderCurrencyField();
    } else {
      component = this.renderTextField();
    }

    return component;
  }
}

MTableEditField.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  columnDef: PropTypes.object.isRequired,
  locale: PropTypes.object
};

export default MTableEditField;
