import React from 'react';
import Routes from './routes';
import './config/StatusBarConfig';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const App = () => <Routes />;

export default App;
