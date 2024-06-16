import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { pulicRouters } from './Routers';
import { DefaultLayout } from './Layout';
function App() {
    // eslint-disable-next-line
    return (
        <Router>
            <div className="App">
                <Routes>
                    {pulicRouters.map((router, index) => { 
                        const Pages = router.component;
                        let Layout = DefaultLayout
                        if(router.layout){
                            Layout = router.layout
                        }else if(router.layout === null){
                            Layout = Fragment
                        }
                        return (
                            <Route
                                key={index}
                                path={router.path}
                                element={
                                    <Layout>
                                        <Pages />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
