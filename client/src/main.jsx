
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RecoilRoot } from 'recoil'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import {store} from "./store/store.js"
import { SocketProvider } from './SockerWrapper.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  
  <Provider store={store}> 
  <SocketProvider>
  <RecoilRoot>
    <App />
    </RecoilRoot>
    </SocketProvider>
    </Provider>
    </BrowserRouter>
)
