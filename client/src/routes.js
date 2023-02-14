import AdminPage from "./pages/AdminPage"
import CalculatorPage from "./pages/CalculatorPage"
import CreateNewProjectPage from "./pages/CreateNewProjectPage"
import MainPage from "./pages/MainPage"
import ReviewPage from "./pages/ReviewPage"
import WatchlistPage from "./pages/WatchlistPage"
import { ADMIN_PAGE_ROUTE, CALCULATOR_PAGE_ROUTE, CREATE_NEW_PROJECT_PAGE_ROUTE, MAIN_PAGE_ROUTE, REVIEW_PAGE_ROUTE, WATCHLIST_ROUTE } from "./utils/consts"

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

    {
        path: CREATE_NEW_PROJECT_PAGE_ROUTE,
        Component: CreateNewProjectPage
    },

    {
        path: CALCULATOR_PAGE_ROUTE,
        Component: CalculatorPage
    }
]

export const nonAuthRoutes = [
    {
        path: MAIN_PAGE_ROUTE, //comosite path + component
        Component: MainPage
    }
]