import { Switch, Redirect } from "react-router-dom"

export default function CustomSwitch({ children }) {
  return (
    <Switch>
      {children}
      <Redirect to='/not-found' />
    </Switch>
  )
}
