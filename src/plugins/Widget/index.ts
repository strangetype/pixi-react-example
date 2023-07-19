import appendScript from 'utils/appendScript';
import appendLink from 'utils/appendLink';
export function WidgetLoad () {
// Load css
    const css = 'https://diamond-slots-v2.games-platform.staging.svc-cloud.com/assets/widget/app.css?v=' + Date.now();
    // Load js
    const js = 'https://diamond-slots-v2.games-platform.staging.svc-cloud.com/assets/widget/app.js?v=' + Date.now();

    // tag widget
    const tag = global.document.createElement('widget-loader');
    global.document.body.appendChild(tag);

    return Promise.all([
        appendScript(js),
        appendLink(css)
    ]);
};
