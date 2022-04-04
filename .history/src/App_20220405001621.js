import { Route, Redirect } from "react-router-dom"
import { ThemeProvider } from "styled-components"

import Theme from "styles/Theme"

import Page404 from "pages/404"
import Global from "styles/Global"

import CustomSwitch from "components/CustomSwitch"

import Layout from "components/Layout"
import "antd/dist/antd.css"

import Auth from "pages/Auth"
import Dashboard from "pages/Dashboard"
function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Global />
      <CustomSwitch>
        <Route exact path='/' render={() => <Redirect to='/auth/login' />} />
        <Route path={["/dashboard"]}>
          <Layout>
            <CustomSwitch>
              <Route exact path='/dashboard'>
                <Dashboard />
              </Route>
            </CustomSwitch>
          </Layout>
        </Route>
        <Route path={`/auth`} component={Auth} />
        <Route path={`/not-found`} component={Page404} />
      </CustomSwitch>
    </ThemeProvider>
  )
}

export default App
