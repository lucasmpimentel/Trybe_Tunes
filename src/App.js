import React from 'react';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <h1>TrybeTunes</h1>
          <section>
            <Switch>
              <Route exact path="/" component={ Login } />
              <Route exact path="/search" component={ Search } />
              <Route exact path="/album/:id" component={ Album } />
              <Route exact path="/favorites" component={ Favorites } />
              <Route exact path="/profile" component={ Profile } />
              <Route exact path="/profile/edit" component={ ProfileEdit } />
              <Route exact path="*" component={ NotFound } />
            </Switch>
          </section>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
