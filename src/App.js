import './App.css';
import {Routes, Route} from 'react-router-dom';
import Products from "./components/products";
import Create from "./components/create";
import Edit from "./components/edit";
import Details from "./components/Details";

    function App() {
    return (
        <Routes>
            <Route path='/' element={<Products/>}/>
            <Route path='/create' element={<Create/>}/>
            <Route path='/edit' element={<Edit/>}/>
            <Route path='/details' element={<Details/>}/>

        </Routes>
    )
}

export default App;