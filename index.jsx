/** EditorJS-React Renderer
  *
  * A small library that provides functions to parse and render data saved by
  * EditorJS into react components
  *
  * @version 1.0.0
  * @created - 2019.08.20
  * @author - Adombang Munang Mbomndih (Bomdi) <dzedock@gmail.com> (https://bomdisoft.com)
  *
  * Version History
  * ---------------
  * @version 1.0.1 - 2020.02.12 - Covert functions to React component
  *                             - Add CodeBoxOutput
  *                             - Adombang Munang Mbomndih
  * @version 1.0.2 - 2020.05.21 - Add key to list items - Adombang Munang Mbomndih
  * @version 1.0.3 - 2020.07.17 - Add config parameter - Adombang Munang Mbomndih
  * @version 1.1.0 - 2021.04.11 - Add classNames parameter - Adombang Munang Mbomndih
  *
  */

//#region imports
import React, {useMemo, useState} from 'react';
import HeaderOutput from './renderers/header/index.jsx';
import ParagraphOutput from './renderers/paragraph/index.jsx';
import ImageOutput from './renderers/image/index.jsx';
import VideoOutput from './renderers/video/index.jsx';
import EmbedOutput from './renderers/embed/index.jsx';
import ListOutput from './renderers/list/index.jsx';
import QuoteOutput from './renderers/quote/index.jsx';
import ChecklistOutput from './renderers/checklist/index.jsx';
import WarningOutput from './renderers/warning/index.jsx';
import TableOutput from './renderers/table/index.jsx';
import DelimiterOutput from './renderers/delimiter/index.jsx';
import CodeBoxOutput from './renderers/codeBox/index.jsx';
import TabOutput from './renderers/tab/index.jsx';
//#endregion

const missingTabData = {
  data: {
    title: 'Missing Tab',
    content: [],
  },
  id: 'missing-tab',
  type: 'tab',
}

const RenderBlock = ({block, renderers, style, config, classNames, isHidden}) => {
  let Renderer = null;

  switch (block.type.toLowerCase()) {
    case 'codebox':
      Renderer = renderers.codeBox || CodeBoxOutput;
      return <Renderer key={block.id} data={ block.data } style={ style.codeBox || {}} config={ config.codeBox || {}} classNames={ classNames.codeBox || {}} />;
    case 'header':
      Renderer = renderers.header || HeaderOutput;
      return <Renderer key={block.id} data={ block.data } style={ style.header || {}} config={ config.header || {}} classNames={ classNames.header || {}} />;
    case 'paragraph':
      Renderer = renderers.paragraph || ParagraphOutput;
      return <Renderer key={block.id} data={ block.data } style={ style.paragraph || {}} config={ config.paragraph || {}}
        classNames={ classNames.paragraph || {}} />;
    case 'image':
      Renderer = renderers.image || ImageOutput;
      return <Renderer key={block.id} data={ block.data } style={ style.image || {}} config={ config.image || {}} classNames={ classNames.image || {}} />;
    case 'video':
      Renderer = renderers.video || VideoOutput;
      return <Renderer key={block.id} data={ block.data } style={ style.video || {}} config={ config.video || {}} classNames={ classNames.video || {}} />;
    case 'embed':
      Renderer = renderers.embed || EmbedOutput;
      return <Renderer key={block.id} data={ block.data } style={ style.embed || {}} config={ config.embed || {}} classNames={ classNames.embed || {}} />;
    case 'table':
      Renderer = renderers.table || TableOutput;
      return <Renderer key={block.id} data={ block.data } tunes={ block.tunes || {}} style={ style.table || {}} config={ config.table || {}} classNames={ classNames.table || {}} />;
    case 'list':
      Renderer = renderers.list || ListOutput;
      return <Renderer key={block.id} data={ block.data } style={ style.list || {}} config={ config.list || {}} classNames={ classNames.list || {}} />;
    case 'checklist':
      Renderer = renderers.checklist || ChecklistOutput;
      return <Renderer key={block.id} data={ block.data } style={ style.checklist || {}} config={ config.checklist || {}}
        classNames={ classNames.checklist || {}} />;
    case 'quote':
      Renderer = renderers.quote || QuoteOutput;
      return <Renderer key={block.id} data={ block.data } style={ style.quote || {}} config={ config.quote || {}} classNames={ classNames.quote || {}} />;
    case 'warning':
      Renderer = renderers.warning || WarningOutput;
      return <Renderer key={block.id} data={ block.data } style={ style.warning || {}} config={ config.warning || {}}
        classNames={ classNames.warning || {}} />;
    case 'delimiter':
      Renderer = renderers.delimiter || DelimiterOutput;
      return <Renderer key={block.id} style={ style.delimiter || {}} config={ config.delimiter || {}} classNames={ classNames.delimiter || {}} />;
    case 'tab':
      return (
        <div className={`renderedTabPanel ${isHidden ? 'd-none' : ''}`} key={`tab${block.id}`}>
          {block.data.content.map((tabContent, i) => (
            <RenderBlock
              key={i}
              block={tabContent}
              style={style}
              config={config}
              classNames={classNames}
              renderers={renderers}
            />
          ))}
        </div>
      );

    default: return '';
  }
}

const TabsToggler = props => (
  <div className="renderedTabsList">
    {
      props.tabList.map((block, index) => (
        <div
          key={block.data.title}
          className={`renderedTabsTab ${props.selectedTabIndex === index ? 'active' : ''}`}
          onClick={() => {
            if (props.selectedTabIndex !== index) props.handleTabChange(index);
          }}
        >
          {block.data.title}
        </div>
      ))}
  </div>
)

const groupContentIntoTabs = blocks => {
  let groupedData = undefined;
  if (blocks.some(block => block.type === 'tab')) {
    groupedData = [];

    if (blocks[0].type !== 'tab') groupedData.push(missingTabData);
    blocks.forEach(block => {
      if (block.type === 'tab') {
        groupedData.push({...block, data: {...block.data, content: []}});
      } else {
        groupedData[groupedData.length - 1].data.content.push(block);
      }
    })
  }

  return groupedData;
}

const Output = ({ data, style, classNames, config, renderers }) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  if (!data || typeof data !== 'object') return '';
  if (!style || typeof style !== 'object') style = {};
  if (!classNames || typeof classNames !== 'object') classNames = {};
  if (!config || typeof config !== 'object') config = {};
  if (!renderers || typeof renderers !== 'object') renderers = {};

  const tabList = useMemo(() => groupContentIntoTabs(data.blocks), [data.blocks]);
  const doContainTabs = Boolean(tabList);
  const renderedData = tabList ? {blocks: tabList} : data;

  return (
    <>
      {doContainTabs && (
        <TabsToggler
          tabList={tabList}
          selectedTabIndex={selectedTabIndex}
          handleTabChange={setSelectedTabIndex}
        />
      )}
      {
        renderedData.blocks.map((block, index) => (
          <RenderBlock
            key={block.id}
            isHidden={block.type === 'tab' && selectedTabIndex !== index}
            classNames={classNames}
            block={block}
            config={config}
            style={style}
            renderers={renderers}
          />
        ))
      }
    </>
  )
};

export {
  HeaderOutput, ParagraphOutput, ImageOutput, VideoOutput, EmbedOutput, TableOutput, CodeBoxOutput, ListOutput, QuoteOutput,
  ChecklistOutput, WarningOutput, DelimiterOutput, TabOutput, Output as default
};
