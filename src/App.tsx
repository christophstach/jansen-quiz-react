import { Provider } from 'jotai';
import Quiz from './components/Quiz';

function App() {
  return (
    <Provider>
      <div className="tw-preflight">
        <Quiz />
      </div>
    </Provider>
  );
}

export default App;
