import { match } from 'ts-pattern';
import { ROOT_FONT_SIZE } from 'src/themes';
import { colors } from 'src/themes/colors';
import { replacePlaceholder } from 'src/utils';
import { t } from 'src/translations';
import type { CoverGenerateConfig } from '../types';

const IMAGE_SIZE = 1080;
const MAX_LIST_ITEM_COUNT = 3;

export const getPageSource = (config: CoverGenerateConfig): string => {
  const expPercent = ((config.currentExp / config.targetExp) * 100).toFixed(1);
  const isEmpty = config.missions.length === 0;
  const isOver = config.missions.length > MAX_LIST_ITEM_COUNT;
  const overCount = config.missions.length - MAX_LIST_ITEM_COUNT;
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Up</title>
        <meta charset="utf-8">
        <link
          href="https://fonts.googleapis.com/css2?family=Jua&display=swap"
          rel="stylesheet"
          crossorigin="anonymous"
        >
        <style>
    
          * {
            font-family: Jua, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, Inter-serif;
            font-weight: normal;
            box-sizing: border-box;
            font-size: ${ROOT_FONT_SIZE * 2}px;
          }
    
          html, body {
            width: ${IMAGE_SIZE}px;
            height: ${IMAGE_SIZE}px;
            padding: 0;
            margin: 0;
          }
    
          body {
            display: flex;
            justify-content: center;
            align-items: center;
          }
    
          h1 {
            margin: 0;
            font-size: 2rem;
          }
      
          h2 {
            margin: 0;
            font-size: 1.5rem;
            color: ${colors.$text_secondary};
          }
    
          section {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            gap: .25rem;
            width: 100%;
          }
    
          .canvas {
            display: flex;
            flex-direction: column;
            align-content: space-evenly;
            width: ${IMAGE_SIZE}px;
            height: ${IMAGE_SIZE}px;
            padding: 2.25rem;
            background-color: #ffffff;
          }
    
          div.progressbar {
            height: 2rem;
            width: 100%;
            border: .25rem solid ${colors.$border};
            border-radius: 9999px;
            overflow: hidden;
          }
          
          div.progressbar > .value {
            height: 100%;
            background-color: ${config.userColor};
          }
    
          div.button {
            position: relative;
            width: 100%;
            height: 3.5rem;
            margin-bottom: 0.75rem;
          }
    
          div.button > .cap {
            position: absolute;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            padding: .5rem;
            border: .25rem solid ${colors.$border};
            border-radius: 0.75rem;
            background-color: white;
            font-size: 1.5rem;
            text-align: center;
            color: ${colors.$border};
            z-index: 1;
          }
    
          div.button > .shadow {
            position: absolute;
            left: 0;
            bottom: -.5rem;
            width: 100%;
            height: 100%;
            background-color: ${colors.$border};
            border-radius: 0.75rem;
            z-index: 0;
          }
          
          section.profile > h1 {
            width: 100%;
            color: ${colors.$border};
            white-space: nowrap;
            text-overflow: ellipsis;
            word-break: break-all;
            text-align: left;
            overflow: hidden;
          }
    
          section.profile > .percent {
            width: 100%;
            margin: 0;
            color: ${colors.$text_tertiary};
            font-size: 1rem;
            text-align: right;
          }
    
          section.mission-list {
            flex-grow: 1;
            gap: .5rem;
          }
    
          section.mission-list.no-mission {
            justify-content: center;
          }
    
          section.mission-list > h2 {
            padding: .25rem 0;
          }
    
          section.date {
            padding-top: .25rem;
            padding-bottom: .5rem;
          }
    
          section.date > h2,
          section.mission-list > h2,
          section.summary > h1 {
            width: 100%;
            text-align: center;
          }

          section.summary {
            text-align: center;
          }
    
          section.summary b {
            color: ${config.userColor};
            font-size: 2rem;
          }
    
        </style>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.min.js"
          crossorigin="anonymous"
        ></script>
      </head>
      <body>
        <main id="canvas" class="canvas">
          <section class="profile">
            <h1>
              Lv.${config.level} ${config.name}
            </h1>
            <div class="progressbar">
              <div
                class="value"
                style="width: ${expPercent}%"
              ></div>
            </div>
            <div class="percent">
              ${expPercent}%
              (${config.currentExp}/${config.targetExp})
            </div>
          </section>
          <section class="date">
            <h2>${config.formattedDate} ${t('label.mission')}</h2>
          </section>
          <section class="mission-list ${isEmpty ? 'no-mission' : ''}">
            ${config.missions
              .slice(0, MAX_LIST_ITEM_COUNT)
              .map(
                (title) => `
                <div class="button">
                  <div class="cap">${title}</div>
                  <div class="shadow"></div>
                </div>
              `,
              )
              .join('')}


            ${match({ isEmpty, isOver })
              .with(
                { isEmpty: true },
                () => `<h2>${t('message.no_mission')}</h2>`,
              )
              .with(
                { isOver: true },
                () =>
                  `<h2>${replacePlaceholder(
                    t('label.and_more'),
                    overCount.toString(),
                  )}</h2>`,
              )
              .otherwise(() => '')}
          </section>
          <section class="summary">
            <h1>EXP <b>+${config.earnedExp}</b></h1>
          </section>
        </main>
        <script>
          function postMessage(type, data) {
            if (!window.ReactNativeWebView) return;
            const event = { type, data };
            window.ReactNativeWebView.postMessage(JSON.stringify(event));
          }
    
          function generate() {
            domtoimage
              .toJpeg(document.getElementById('canvas'), { quality: 0.95 })
              .then((dataUrl) => postMessage('success', dataUrl))
              .catch((error) => postMessage('error', error.message || 'unknown error'));
          }
    
          window.onload = generate;
        </script>
      </body>
    </html>
  `;
};
