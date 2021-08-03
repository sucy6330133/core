import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';

import MaterialTable from '../dist';

import { makeData, columns } from './test.helper';

configure({ adapter: new Adapter() });

/**
 * Uses '../dist' for MaterialTable
 */
describe('Render Table : Post Build', () => {
  // Render empty table
  describe('when attempting to render an empty table', () => {
    it('renders without crashing', () => {
      shallow(
        <ThemeProvider theme={createTheme()}>
          <MaterialTable />
        </ThemeProvider>
      );
    });
  });
  // Render table with random data
  describe('when attempting to render a table with data', () => {
    it('renders without crashing', () => {
      const data = makeData();
      shallow(
        <ThemeProvider theme={createTheme()}>
          <MaterialTable data={data} columns={columns} />
        </ThemeProvider>
      );
    });
  });
});
