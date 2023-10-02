import { store } from 'store';
import './App.css';
import { HomeContainer } from 'container';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <HomeContainer />
    </Provider>
  );
}

export default App;
