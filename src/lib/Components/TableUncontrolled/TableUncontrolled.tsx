import * as React from 'react';

import { ITableInstance, ITableProps } from '../Table/Table';

import { ChildComponents } from '../../Models/ChildComponents';
import { DispatchFunc } from '../../types';
import { TableControlled } from '../TableControlled/TableControlled';
import { getTable } from '../../hooks/UseTable';
import { kaReducer } from '../../Reducers/kaReducer';

export interface ITableUncontrolledProps extends ITableProps {
  childComponents?: ChildComponents;
  table?: ITableInstance;
}

export const TableInstanceContext = React.createContext<ITableInstance>({} as ITableInstance);

export const TableUncontrolled: React.FunctionComponent<ITableUncontrolledProps> = (props) => {
  const [tableProps, changeTableProps] = React.useState({ ...props, ...props.table?.props });
  const { table: _, ...tablePropsUncontrolled } = tableProps;
  const contextTable = props.table || getTable();

  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => {
      const nextState = kaReducer(prevState, action);
      setTimeout(() => {
        contextTable.onDispatch?.(action, nextState);
      }, 0);
      return nextState;
    });
  };
  contextTable.props = tablePropsUncontrolled;
  contextTable.changeProps = changeTableProps;
  contextTable.dispatch = dispatch;

  React.useEffect(() => {
    if (props?.loading?.enabled !== tablePropsUncontrolled?.loading?.enabled) {
      props?.loading?.enabled ? contextTable.showLoading() : contextTable.hideLoading();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.loading?.enabled]);

  return (
    <TableInstanceContext.Provider value={contextTable}>
      <TableControlled
        {...tablePropsUncontrolled}
        childComponents={props.childComponents}
        extendedFilter={props.extendedFilter}
        filter={props.filter}
        format={props.format}
        dispatch={dispatch}
      />
    </TableInstanceContext.Provider>
  );
};
