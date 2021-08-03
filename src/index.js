import withStyles from '@material-ui/styles/withStyles';
import React from 'react';
import { defaultProps } from './defaults';
import MaterialTable from './material-table';
import { propTypes } from './prop-types';
import './utils/polyfill';

MaterialTable.defaultProps = defaultProps;
MaterialTable.propTypes = propTypes;

const styles = (theme) => ({
  paginationRoot: {
    width: '100%'
  },
  paginationToolbar: {
    padding: 0,
    width: '100%'
  },
  paginationCaption: {
    display: 'none'
  },
  paginationSelectRoot: {
    margin: 0
  }
});

export default withStyles(styles, { withTheme: true })((props) => (
  <MaterialTable {...props} ref={props.tableRef} />
));

export {
  MTableAction,
  MTableActions,
  MTableBody,
  MTableBodyRow,
  MTableCell,
  MTableEditCell,
  MTableEditField,
  MTableEditRow,
  MTableFilterRow,
  MTableGroupbar,
  MTableGroupRow,
  MTableHeader,
  MTablePagination,
  MTableSteppedPagination,
  MTableToolbar
} from './components';
