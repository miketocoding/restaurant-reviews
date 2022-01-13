// destructure useState
import React, { useState } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

// import other created componenets
import AddReview from './components/add-review'
import Restaurant from "./components/restaurants"
import RestaurantsList from "./components/restaurants-list"
import Login from "./components/login"


function App() {
  // create a user variable in the state using hooks
  const [user, setUser] = useState(null)

  // dummy login system. Won't save user to db.
  // async functions
  // if call login function and pass in user, user variable will be updated with user passed into function
  async function login(user = null) {
    setUser(user)
  }
  // logout function
  async function logout(user = null) {
    setUser(null)
  }

  return (
    <div>
      {/* standard bootstrap navbar */}
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        {/* Link: image or logo - brand */}
        <a href="/restaurants" className="navbar-brand">
          Restaurant Reviews
        </a>
        {/* navigation part of navbar */}
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            {/* link from react-router-dom. Route to different URL */}
            <Link to={"/restaurants"} className="nav-link">
              Restaurants
            </Link>
          </li>
          <li className="nav-item" >
            {/* this is one link but will look different depending on user status. Ternary statement */}
            { user ? (
              <a onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
                Logout {user.name}
              </a>
            ) : (            
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
            )}

          </li>
        </div>
      </nav>

      {/* rest of page after nav section. Routes section */}
      <div className="container mt-3">
        {/* switch between different routes */}
        {/* in v6 of React-router-dom, switch replaced by Routes */}
        <Switch>
          <Route exact path={["/", "/restaurants"]} component={RestaurantsList} />
          {/* loading add review componenet */}
          <Route 
            path="/restaurants/:id/review"
            // user render instead of componenets (above) because it allows us to pass props
            render={(props) => (
              <AddReview {...props} user={user} />
            )}
          />
          {/* load a specific restaurant */}
          <Route 
            path="/restaurants/:id"
            render={(props) => (
              <Restaurant {...props} user={user} />
            )}
          />
          {/* load the login componenet */}
          <Route 
            path="/login"
            render={(props) => (
              <Login {...props} login={login} />
            )}
          />
        </Switch>
      </div>
    </div>
  )
}

export default App;
