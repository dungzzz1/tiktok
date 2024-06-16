import routsconfig from '~/config/index';
import Live from '~/pages/Live';
import Explore from '~/pages/Explore';
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Uploadvideo from '~/pages/Upload';
import Individua from '~/pages/individuas';
import { HeaderOnly } from '~/Layout';
import FileUser from '~/components/FileUser';
import Logout from '~/components/Logout';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '~/redux/UserSlice';
import  { Route,Navigate   }  from 'react-router-dom';
import Seach from '~/pages/Seach';
import New from '~/pages/New';

const PrivateRoute = ({ component: Component, layout: Layout, ...rest }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    return (
      <Route
        {...rest}
        render={(props) =>
          isLoggedIn ? (
            <Layout>
              <Component {...props} />
            </Layout>
          ) : (
            <Navigate to={routsconfig.home} />
          )
        }
      />
    );
};
  
// eslint-disable-next-line
const pulicRouters = [
    { path: routsconfig.home, component: Home },
    { path: routsconfig.Logout, component: Logout },
    { path: routsconfig.following, component: Following },
    { path: routsconfig.Live, component: Live },
    { path: routsconfig.Seach, component: Seach },
    { path: routsconfig.Individua, component: Individua },
    { path: routsconfig.Uploadvideo, component: Uploadvideo, layout: HeaderOnly },
    { path: routsconfig.Explore, component: Explore},
    { path: routsconfig.FileUser, component: FileUser },
    { path: routsconfig.New, component: New },
];

const privateRouters = [
    { path:routsconfig.Uploadvideo, component: Uploadvideo, layout: HeaderOnly }
];

export { pulicRouters, privateRouters,PrivateRoute };
