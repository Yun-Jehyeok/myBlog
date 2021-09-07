import React from 'react';
import { Container } from 'reactstrap';
import { Route, Switch } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from 'assets/theme';
import { GlobalStyles } from 'assets/global';
import { useDarkMode } from 'assets/useDarkMode';
import Toggle from 'assets/Toggle';

import MainHeader from 'components/MainHeader';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Main from 'pages/Main/Main';
import Resister from 'pages/Register/Register';
import Contact from 'pages/Contact/Contact';
import FindPassword from 'pages/FindPassword/FindPassword';
import PostList from 'pages/PostList/PostList';
import PostDetail from 'pages/PostDetail/PostDetail';
import PostWrite from 'pages/PostWrite/PostWrite';
import PostEdit from 'pages/PostEdit/PostEdit';
import Search from 'pages/Search/Search';
import CategoryResult from 'pages/CategoryResult/CategoryResult';
import { EditProtectedRoute } from './protectedRoute/ProtectedRoute';

import Fade from 'react-reveal/Fade';

function Router() {
  const [theme, themeToggler, mountedComponent] = useDarkMode();

  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  let HideHeader =
    window.location.pathname === '/' ? (
      <MainHeader theme={theme} />
    ) : window.location.pathname === '/register' ? null : window.location
        .pathname === '/findpassword' ? null : (
      <Header theme={theme} />
    );

  if (!mountedComponent) return <div />;

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      {HideHeader}
      <Fade right>
        <Toggle theme={theme} toggleTheme={themeToggler} />
      </Fade>
      <Container>
        <Switch>
          <Route path="/" exact render={() => <Main theme={theme} />} />
          <Route path="/register" exact component={Resister} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/findpassword" exact component={FindPassword} />
          <Route
            path="/postlist"
            exact
            render={() => <PostList theme={theme} />}
          />
          <Route path="/post/:id" exact component={PostDetail} />
          <Route path="/postwrite" exact component={PostWrite} />
          <Route
            path="/post/category/:categoryName"
            exact
            render={() => <CategoryResult theme={theme} />}
          />
          <EditProtectedRoute
            path="/post/:id/edit"
            exact
            component={PostEdit}
          />
          <Route
            path="/search/:searchTerm"
            exact
            render={() => <Search theme={theme} />}
          />
        </Switch>
      </Container>
      <Footer theme={theme} />
    </ThemeProvider>
  );
}

export default Router;
