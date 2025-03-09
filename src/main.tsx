import { createRoot } from 'react-dom/client'
import { Provider} from "react-redux";
import { store } from './redux/store.ts';
import { RouterProvider } from 'react-router-dom';
import router from './routers/router.tsx';

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <RouterProvider router={router} ></RouterProvider>
    </Provider>

)
