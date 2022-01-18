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
  const tableContent = content.slice(1);
  const tunesClassName = Object.keys(tunes).filter(tune => Boolean(tunes[tune])).join(' ');
  const tableClassName = [classNames.table, tunesClassName].join(' ');

  return <table className={ tableClassName }>
    <thead>
      <tr className={ classNames.tr }>
        { columnNames.map((columnName, index) => <th key={ index } className={ classNames.th }>{ ReactHtmlParser(columnName) }</th>) }
      </tr>
    </thead>
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
  </table>;
};

export default TableOutput;
