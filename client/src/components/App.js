import '../styles/App.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Main from './Main.js';
import Quiz from './Quiz.js';
import Result from './Result.js';
//import Submit from './Submit.js';
import { CheckUserExist } from '../helper/helper';
const router=createBrowserRouter([
  
  {
     path:'/',
     element:<Main/>
  },
  {
    path:'/quiz',
    element:<CheckUserExist><Quiz/></CheckUserExist>
  },
  {
    path:'/result',
    element:<CheckUserExist><Result/></CheckUserExist>
  },
])
function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
