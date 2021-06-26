import './App.css';
import Content from './components/Content/Content'
import Header from './components/Header/Header';
import Nav from './components/Navbar/Nav';
import { BrowserRouter } from 'react-router-dom';




const App = (props) => {
  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        <Header />
        <Nav />
        <Content messages={props.messages} dialogs={props.dialogs} posts={props.posts} />
      </div>
    </BrowserRouter>
  );
}

export default App;
