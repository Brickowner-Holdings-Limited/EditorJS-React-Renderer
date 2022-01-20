/** ParagraphOutput
  *
  * @version 1.0.0
  * @created - 2019.08.20
  * @author - Adombang Munang Mbomndih (Bomdi) <dzedock@gmail.com> (https://bomdisoft.com)
  *
  * Version History
  * ---------------
  * @version 1.0.1 - 2020.02.12 - Covert to React component - Adombang Munang Mbomndih
  * @version 1.0.2 - 2020.07.17 - Add config parameter - Adombang Munang Mbomndih
  * @version 1.1.0 - 2021.04.11 - Add classNames parameter - Adombang Munang Mbomndih
  * @version 1.1.1 - 2021.04.12 - Add validation for config parameter - Adombang Munang Mbomndih
  */

//#region imports
import React from 'react';
import ReactHtmlParser, {convertNodeToElement} from 'react-html-parser';
import paragraphOutputStyle from './style';
//#endregion

const transformAnchor = (node, index) => {
  if (node.type === 'tag' && node.name === 'a') {
    node.attribs = {
      ...node.attribs,
      target: '_blank',
      rel: 'noopener noreferrer'
    }

    return convertNodeToElement(node, index, transformAnchor);
  }
}

const ParagraphOutput = ({ data, style, classNames, config }) => {
  if (!data) return '';
  if (!style || typeof style !== 'object') style = {};
  if (!config || typeof config !== 'object') config = {};
  if (!classNames || typeof classNames !== 'string') classNames = '';

  // const paragraphStyle = config.disableDefaultStyle ? style : { ...paragraphOutputStyle, ...style };
  let content = null;

  if (typeof data === 'string') content = data;
  else if (typeof data === 'object' && data.text && typeof data.text === 'string') content = data.text;

  return content ? <p className={ classNames }>{ ReactHtmlParser(content, {transform: transformAnchor}) }</p> : '';
};

export default ParagraphOutput;
