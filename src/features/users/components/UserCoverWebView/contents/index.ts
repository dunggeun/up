import type { CoverGenerateConfig } from '../types';

const IMAGE_SIZE = 512;

export const getPageSource = (config: CoverGenerateConfig): string => {
  const expPercent = (config.user.currentExp / config.user.totalExp) * 100;
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
            font-size: 16px;
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

          .canvas {
            display: flex;
            flex-direction: column;
            align-content: stratch;
            width: ${IMAGE_SIZE}px;
            height: ${IMAGE_SIZE}px;
            padding: 40px;
            margin-bottom: 36px;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0,0,0,.3);
          }
          
          .canvas > .profile {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }
          
          .canvas > .profile > h1 {
            margin: 0;
            font-size: 60px;
            color: #2e2e2e;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            word-break: break-all;
          }
          
          .progressbar {
            height: 72px;
            width: 100%;
            border: 10px solid #2e2e2e;
            border-radius: 9999px;
            overflow: hidden;
          }
          
          .progressbar > .value {
            height: 100%;
            background-color: ${config.color};
          }
          
          .percent {
            bottom: 100%;
            left: 12px;
            margin: 0;
            color: #cccccc;
            font-size: 24px;
            width: 100%;
            text-align: right;
          }
          
          .canvas > .date {
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 12px;
            padding-bottom: 12px;
          }
          
          .date > h2 {
            margin: 0;
            font-size: 40px;
            color: #777777;
          }

          .button {
            position: relative;
            height: 112px;
            margin-bottom: 16px;
          }
    
          .button > .cap {
            position: absolute;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            padding: 0 12px;
            border: 10px solid #2e2e2e;
            border-radius: 16px;
            background-color: white;
            font-size: 40px;
            text-align: center;
            color: #2e2e2e;
            z-index: 1;
          }
    
          .button > .shadow {
            position: absolute;
            left: 0;
            bottom: -20px;
            width: 100%;
            height: 100%;
            background-color: #2e2e2e;
            border-radius: 16px;
            z-index: 0;
          }

        </style>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.min.js"
          crossorigin="anonymous"
        ></script>
      </head>
      <body>
        <main id="canvas" class="canvas">
          <div class="profile">
            <h1>
              Lv.${config.user.level} ${config.user.name}
            </h1>
            <div class="progressbar">
              <div
                class="value"
                style="width: ${expPercent}%"
              ></div>
            </div>
            <div class="percent">
              ${expPercent.toFixed(1)}%
              (${config.user.currentExp}/${config.user.totalExp})
            </div>
          </div>
          <div class="date">
            <h2>
              ${config.date}
            </h2>
          </div>
          <div class="button">
            <div class="cap">UP!</div>
            <div class="shadow"></div>
          </div>
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

          window.onload = () => {
            setTimeout(generate, 500);
          };
        </script>
      </body>
    </html>
  `;
};
