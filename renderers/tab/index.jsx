/** ParagraphOutput
  *
  * @version 1.0.0
  * @created - 2012.01.18
  * @author - Artem Slipets <49h4DhPERFECT@gmail.com> (https://www.linkedin.com/in/artemslipets/)
  *
  * Version History
  * ---------------
  * @version 1.0.0 - 2020.02.12 - *** - Artem Slipets
  */

//#region imports
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
//#endregion

const TabOutput = ({ data, classNames }) => {
  if (!data) return '';
  if (!classNames || typeof classNames !== 'string') classNames = '';

  let content = null;

  if (typeof data === 'object' && data.text && typeof data.text === 'string') content = data.text;

  return content ? (
      <div className={ classNames }>
        <p>{ ReactHtmlParser(content) }</p>
      </div>
  ) : '';
};

export default TabOutput;
