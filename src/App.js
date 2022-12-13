import './App.css';
import ChatWindow from './components/ChatWindow';
import MainView from './components/MainView';
import { signInWithGoogle } from './firebase';

function App() {
  return (
    <div className='h-screen w-screen max-h-screen bg-slate-200'>
      <ChatWindow />
      <MainView />
      {localStorage.getItem('verified') === false ? <button className='bg-cyan-400 rounded-full p-3 position: absolute right-0 top-0 hover:bg-cyan-300' onClick={signInWithGoogle}>Sign in with Google</button> : null}
    </div>
  );
}

export default App;
