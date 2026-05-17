import { RouterProvider } from 'react-router-dom';
import router from './routes';

/**
 * App root component.
 * Provides the router to the entire application.
 */
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
