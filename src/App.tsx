import { BrowserRouter, Route, Routes } from 'react-router-dom';

import routeInfo from './router/router';

// import './origin_file/App.css';
// import { useState } from 'react';
// import reactLogo from './assets/react.svg';

function App() {
    // const [count, setCount] = useState(0);

    return (
        <BrowserRouter>
            <Routes>
                {routeInfo.map(({ path, element }, index) => (
                    <Route
                        path={path as string}
                        element={element}
                        key={index}
                    />
                ))}
            </Routes>
        </BrowserRouter>
    );

    // return (
    //     <div className='App'>
    //         <div>
    //             <a href='https://vitejs.dev' target='_blank' rel='noreferrer'>
    //                 <img src='/vite.svg' className='logo' alt='Vite logo' />
    //             </a>
    //             <a href='https://reactjs.org' target='_blank' rel='noreferrer'>
    //                 <img src={reactLogo} className='logo react' alt='React logo' />
    //             </a>
    //         </div>
    //         <h1>Vite + React</h1>
    //         <div className='card'>
    //             <button onClick={() => setCount(count => count + 1)}>
    //                 count is {count}
    //             </button>
    //             <p>
    //                 Edit <code>src/App.tsx</code> and save to test HMR
    //             </p>
    //         </div>
    //         <p className='read-the-docs'>
    //             Click on the Vite and React logos to learn more
    //         </p>
    //     </div>
    // );
}

export default App;
