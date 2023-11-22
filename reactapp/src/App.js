
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import Form from './components/Form';
import { Routes, Route } from "react-router-dom"; 
import Error404 from './components/Error404';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element = {<Main/>} />
        <Route path="/form" element = {<Form/>} />
        <Route path="*" element = {<Error404/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
