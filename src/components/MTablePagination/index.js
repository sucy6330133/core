/* eslint-disable no-unused-vars */
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
/* eslint-enable no-unused-vars */

function MTablePagination(props) {
  const handleFirstPageButtonClick = (event) => {
    props.onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    props.onPageChange(event, props.page - 1);
  };

  const handleNextButtonClick = (event) => {
    props.onPageChange(event, props.page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    props.onPageChange(
      event,
      Math.max(0, Math.ceil(props.count / props.rowsPerPage) - 1)
    );
  };

  function render() {
    const {
      classes,
      count,
      page,
      rowsPerPage,
      theme,
      showFirstLastPageButtons
    } = props;

    const localization = {
      ...MTablePagination.defaultProps.localization,
      ...props.localization
    };

    return (
      <div className={classes.root} ref={props.forwardedRef}>
        {showFirstLastPageButtons && (
          <Tooltip title={localization.firstTooltip}>
            <span>
              <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label={localization.firstAriaLabel}
                size="large"
              >
                {theme.direction === 'rtl' ? (
                  <props.icons.LastPage />
                ) : (
                  <props.icons.FirstPage />
                )}
              </IconButton>
            </span>
          </Tooltip>
        )}
        <Tooltip title={localization.previousTooltip}>
          <span>
            <IconButton
              onClick={handleBackButtonClick}
              disabled={page === 0}
              aria-label={localization.previousAriaLabel}
              size="large"
            >
              {theme.direction === 'rtl' ? (
                <props.icons.NextPage />
              ) : (
                <props.icons.PreviousPage />
              )}
            </IconButton>
          </span>
        </Tooltip>
        <Typography
          variant="caption"
          style={{
            flex: 1,
            textAlign: 'center',
            alignSelf: 'center',
            flexBasis: 'inherit'
          }}
        >
          {localization.labelDisplayedRows
            .replace(
              '{from}',
              props.count === 0 ? 0 : props.page * props.rowsPerPage + 1
            )
            .replace(
              '{to}',
              Math.min((props.page + 1) * props.rowsPerPage, props.count)
            )
            .replace('{count}', props.count)}
        </Typography>
        <Tooltip title={localization.nextTooltip}>
          <span>
            <IconButton
              onClick={handleNextButtonClick}
              disabled={page >= Math.ceil(count / rowsPerPage) - 1}
              aria-label={localization.nextAriaLabel}
              size="large"
            >
              {theme.direction === 'rtl' ? (
                <props.icons.PreviousPage />
              ) : (
                <props.icons.NextPage />
              )}
            </IconButton>
          </span>
        </Tooltip>
        {showFirstLastPageButtons && (
          <Tooltip title={localization.lastTooltip}>
            <span>
              <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label={localization.lastAriaLabel}
                size="large"
              >
                {theme.direction === 'rtl' ? (
                  <props.icons.FirstPage />
                ) : (
                  <props.icons.LastPage />
                )}
              </IconButton>
            </span>
          </Tooltip>
        )}
      </div>
    );
  }

  return render();
}

const actionsStyles = (theme) => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    display: 'flex'
    // lineHeight: '48px'
  }
});

MTablePagination.propTypes = {
  onPageChange: PropTypes.func,
  page: PropTypes.number,
  count: PropTypes.number,
  rowsPerPage: PropTypes.number,
  classes: PropTypes.object,
  localization: PropTypes.object,
  theme: PropTypes.any,
  showFirstLastPageButtons: PropTypes.bool
};

MTablePagination.defaultProps = {
  showFirstLastPageButtons: true,
  localization: {
    firstAriaLabel: 'First Page',
    firstTooltip: 'First Page',
    previousAriaLabel: 'Previous Page',
    previousTooltip: 'Previous Page',
    nextAriaLabel: 'Next Page',
    nextTooltip: 'Next Page',
    lastAriaLabel: 'Last Page',
    lastTooltip: 'Last Page',
    labelDisplayedRows: '{from}-{to} of {count}',
    labelRowsPerPage: 'Rows per page:'
  }
};

const MTableGroupRowRef = React.forwardRef(function MTablePaginationRef(
  props,
  ref
) {
  return <MTablePagination {...props} forwardedRef={ref} />;
});

const MTablePaginationOuter = withStyles(actionsStyles, { withTheme: true })(
  MTableGroupRowRef
);

export default MTablePaginationOuter;
