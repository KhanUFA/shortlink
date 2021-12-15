import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {ListLinksPage} from "./pages/ListLinksPage"
import {CreateLinkPage} from "./pages/CreateLinkPage"
import {DetailsLinkPage} from "./pages/DetailsLinkPage"
import {Authpage} from "./pages/Authpage"

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return(
            <Switch>
                <Route path="/links" exact>
                    <ListLinksPage />
                </Route>

                <Route path="/create" exact>
                    <CreateLinkPage />
                </Route>

                <Route path="/detail/:id" exact>
                    <DetailsLinkPage/>
                </Route>

                <Redirect to={"/create"}/>
            </Switch>
        )
    }

    return(
            <Switch>
                <Route path="/">
                    {<Authpage />}
                </Route>

                <Redirect to={"/"}/>
            </Switch>
    )
}