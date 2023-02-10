import AdminPage from "./pages/AdminPage"
import MainPage from "./pages/MainPage"
import ReviewPage from "./pages/ReviewPage"
import WatchlistPage from "./pages/WatchlistPage"
import { ADMIN_PAGE_ROUTE, MAIN_PAGE_ROUTE, REVIEW_PAGE_ROUTE, WATCHLIST_ROUTE } from "./utils/consts"

export const authRoutes = [
    {
        path: ADMIN_PAGE_ROUTE, //comosite path + component
        Component: AdminPage
    },

    {
        path: REVIEW_PAGE_ROUTE, //comosite path + component
        Component: ReviewPage
    },

    {
        path: WATCHLIST_ROUTE, //comosite path + component
        Component: WatchlistPage
    },
]

export const nonAuthRoutes = [
    {
        path: MAIN_PAGE_ROUTE, //comosite path + component
        Component: MainPage
    }
]