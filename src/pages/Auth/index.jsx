import { useRouteMatch, Route, Redirect } from "react-router-dom"

import CustomSwitch from "components/CustomSwitch"

import Login from "./Login"
import Register from "./Register"

export default function Auth() {
    const match = useRouteMatch()

    return (
        <CustomSwitch>
            <Route exact path={`${match.path}/login`} component={Login} />
            <Route exact path={`${match.path}/register`} component={Register} />
            <Route exact path={`${match.path}`}>
                <Redirect to={`${match.path}/login`} />
            </Route>
        </CustomSwitch>
    )
}
