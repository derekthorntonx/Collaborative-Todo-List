import './App.css';
import ChatWindow from './components/ChatWindow';
import MainView from './components/MainView';
import { signInWithGoogle } from './firebase';

function App() {
  return (
    <div className='h-screen w-screen max-h-screen bg-slate-200 overflow-hidden'>
      <ChatWindow />
      <MainView />
      <button className='bg-cyan-400' onClick={signInWithGoogle}>Sign in with google</button>
      <h2>Hello, {localStorage.getItem('name')}</h2>
      <img alt='User Display Pic' src={localStorage.getItem('picture')} />
    </div>
  );
}

export default App;
