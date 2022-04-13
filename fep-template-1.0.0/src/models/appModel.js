import mirror, { connect, withRouter } from 'mirrorx';
// import { httpPost } from '../utils/httpClient';
// import GlobalError from '../utils/GlobalError';
import App from '../app/App';

mirror.model({
  name: 'app',

  initialState: {},

  reducers: {},

  effects: {}
});

export default withRouter(
  connect(state => {
    return state.modelName;
  })(App)
);
