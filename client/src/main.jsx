
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RecoilRoot } from 'recoil'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <BrowserRouter >
    <RecoilRoot>
      <GoogleOAuthProvider clientId='849621149208-ocqg7s76961aa2egbovk16pbgnsg15gr.apps.googleusercontent.com'>
        <App />
      </GoogleOAuthProvider>
    </RecoilRoot>
  </BrowserRouter>
)
