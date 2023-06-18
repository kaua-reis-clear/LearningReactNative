import {Platform} from 'react-native';

import AndroidPicker from './index.android';
import IOSPicker from './index.ios';

export default Platform.OS === 'ios' ? IOSPicker : AndroidPicker;
