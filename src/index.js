import ReactDOM from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import InteractiveMapApp from './InteractiveMapApp.js';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<InteractiveMapApp url="rooms.json" name='Laura' />);