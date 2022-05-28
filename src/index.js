import ReactDOM from 'react-dom/client';

import InteractiveMapApp from './InteractiveMapApp.js';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<InteractiveMapApp url="rooms.json" name='Laura' />);