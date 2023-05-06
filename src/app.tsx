import React, {FC} from 'react';
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux';

import 'taro-ui/dist/style/index.scss'

import './app.scss';

interface MyState {
}

const reducers = combineReducers({
  thread: (state: MyState = {}, action) => {
    if (action.type === 'SET_CURRENT_THREAD') {
      return {
        ...state,
        ...action.thread,
      };
    }
    return state;
  },
});

const store = createStore(reducers);

interface Props {
  children: React.ReactNode;
}

const App: FC<Props> = ({children}) => {
  // children是将要会渲染的页面
  return <Provider store={store}> {children} </Provider>
};

export default App;
