import EmptyCells from '../EmptyCells/EmptyCells';
import HeadCell from '../HeadCell/HeadCell';
import { IHeadRowProps } from '../../props';
import React from 'react';
import defaultOptions from '../../defaultOptions';
import { getElementCustomization } from '../../Utils/ComponentUtils';

const HeadRow: React.FunctionComponent<IHeadRowProps> = (props) => {
  const {
    areAllRowsSelected,
    childComponents,
    columnReordering,
    columnResizing,
    columns,
    dispatch,
    filteringMode,
    groupColumnsCount,
    sortingMode
  } = props;
  const { elementAttributes, content } = getElementCustomization({
    className: defaultOptions.css.theadRow
  }, props, childComponents.headRow);
  return (
    <tr {...elementAttributes}>
      {
        content ||
        (
          <>
            <EmptyCells count={groupColumnsCount} isTh={true} dispatch={dispatch} />
            {
              columns.map((column) => {
                return (
                  <HeadCell
                    areAllRowsSelected={areAllRowsSelected}
                    childComponents={childComponents}
                    columnReordering={columnReordering}
                    columnResizing={columnResizing}
                    column={column}
                    dispatch={dispatch}
                    filteringMode={filteringMode}
                    key={column.key}
                    sortingMode={sortingMode}
                  />
                );
              })
            }
          </>
        )
      }
    </tr>
  );
};

export default HeadRow;
