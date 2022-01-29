/** TableOutput
  *
  * @version 1.0.0
  * @created - 2019.11.02
  * @author - Adombang Munang Mbomndih (Bomdi) <dzedock@gmail.com> (https://bomdisoft.com)
  *
  * Version History
  * ---------------
  * @version 1.0.1 - 2020.02.12 - Covert to React component - Adombang Munang Mbomndih
  * @version 1.0.2 - 2020.05.21 - Add key to list items - Adombang Munang Mbomndih
  * @version 1.0.3 - 2020.07.17 - Add config parameter - Adombang Munang Mbomndih
  * @version 1.1.0 - 2021.04.11 - Add classNames parameter - Adombang Munang Mbomndih
  * @version 1.1.1 - 2021.04.12 - Add validation for config parameter - Adombang Munang Mbomndih
  */

//#region imports
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import tableOutputStyle from './style';
//#endregion

const supportedKeys = ['table', 'tr', 'th', 'td'];

const MobileTableRow = ({colIndex, classNames, columnName, row, isLastRow}) => {
  const colContent = row[colIndex];

  if (isLastRow && !colContent) return null;
  if (isLastRow && colContent.toLowerCase() === 'total') {
    return (
      <tr className={classNames.tr}>
        <td className={classNames.td}>{ReactHtmlParser('Total')}</td>
        <td className={classNames.td}/>
      </tr>
    );
  }
  return (
    <tr className={classNames.tr}>
      <td className={classNames.td}>{ReactHtmlParser(columnName)}</td>
      <td className={classNames.td}>{ReactHtmlParser(colContent)}</td>
    </tr>
  );
};

const MobileTable = ({tableContent, columnNames, classNames, tunesClassName}) => {
  const lastRowIndex = tableContent.length - 1;

  return tableContent.map((row, rowIndex) => {
    const isLastRow = rowIndex === lastRowIndex;
    const mobileTableClassname = `${classNames.table} mobileTable ${isLastRow ? tunesClassName : ''}`;

    return (
      <table key={`mobileTable${rowIndex}`} className={mobileTableClassname}>
        <tbody>
          {
            columnNames.map((columnName, colIndex) => (
              <MobileTableRow
                key={`mobileTR${colIndex}`}
                colIndex={colIndex}
                classNames={classNames}
                columnName={columnName}
                row={row}
                isLastRow={isLastRow}
              />
            ))
          }
        </tbody>
      </table>
    );
  });
};

const DesktopTable = ({data, tableContent, columnNames, hasMoreThanTwoColumns, classNames, tunesClassName}) => {
  const extraClass = hasMoreThanTwoColumns ? 'hideOnMobile' : '';
  const tableClassName = [classNames.table, tunesClassName, extraClass, 'desktopTable'].join(' ');

  return (
    <table className={tableClassName}>
      {data.withHeadings && (
        <thead>
          <tr className={classNames.tr}>
            {columnNames.map((columnName, index) => <th key={index} className={classNames.th}>{ReactHtmlParser(columnName)}</th>)}
          </tr>
        </thead>
      )}
      <tbody>
        {
          tableContent.map((row, index) => (
            <tr key={ index } className={ classNames.tr }>
              {
                Array.isArray(row) && row.length > 1 &&
                  row.map((columnValue, i) => <td key={ i } className={ classNames.td }>{ ReactHtmlParser(columnValue) }</td>)
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

const TableOutput = ({ data, tunes, style, classNames, config }) => {
  if (!data) return '';
  if (!style || typeof style !== 'object') style = {};
  if (!config || typeof config !== 'object') config = {};
  if (!classNames || typeof classNames !== 'object') classNames = {};

  supportedKeys.forEach(key => {
    if (!style[key] || typeof style[key] !== 'object') style[key] = {};
    if (!classNames[key] || typeof classNames[key] !== 'string') classNames[key] = '';
  });

  // const tableStyle = config.disableDefaultStyle ? style.table : { ...tableOutputStyle.table, ...style.table };
  // const trStyle = config.disableDefaultStyle ? style.tr : { ...tableOutputStyle.tr, ...style.tr };
  // const thStyle = config.disableDefaultStyle ? style.th : { ...tableOutputStyle.th, ...style.th };
  // const tdStyle = config.disableDefaultStyle ? style.td : { ...tableOutputStyle.td, ...style.td };

  let content = data.content || [];
  if (!Array.isArray(content) || content.length < 1) return '';

  const columnNames = content[0];
  const hasMoreThanTwoColumns = columnNames.length > 2;
  const tableContent = data.withHeadings ? content.slice(1) : content;
  const tunesClassName = Object.keys(tunes).filter(tune => Boolean(tunes[tune])).join(' ');

  return (
    <div className="tableContainer">
      {hasMoreThanTwoColumns && (
        <MobileTable
          tableContent={tableContent}
          columnNames={columnNames}
          classNames={classNames}
          tunesClassName={tunesClassName}
        />
      )}
      <DesktopTable
        data={data}
        tableContent={tableContent}
        columnNames={columnNames}
        classNames={classNames}
        tunesClassName={tunesClassName}
        hasMoreThanTwoColumns={hasMoreThanTwoColumns}
      />
    </div>
  );
};

export default TableOutput;
