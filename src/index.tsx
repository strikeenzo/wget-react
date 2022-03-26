import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './i18n';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { theme } from 'theme';
import { ThemeProvider } from '@mui/material/styles';
import { ExerciseStateProvider, WeightStateProvider } from 'state';
import { WeightOverview } from "pages";
import { OverviewDashboard } from "components/BodyWeight/OverviewDashboard/OverviewDashboard";
import { LoadingWidget } from "components/Core/LoadingWidget/LoadingWidget";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // set a stale time of 20 seconds
            //staleTime: 1000 * 20,
        },
    }
});

const rootElement = document.getElementById("root");
if (rootElement) {
    ReactDOM.render(
        <React.StrictMode>
            <Suspense fallback={<LoadingWidget />}>
                <Router>
                    <ExerciseStateProvider>
                        <WeightStateProvider>
                            <ThemeProvider theme={theme}>
                                <QueryClientProvider client={queryClient}>
                                    <App />
                                    <ReactQueryDevtools />
                                </QueryClientProvider>
                            </ThemeProvider>
                        </WeightStateProvider>
                    </ExerciseStateProvider>
                </Router>
            </Suspense>
        </React.StrictMode>,
        rootElement
    );
}

/*
 * Components used in the wger django app, don't change the IDs here
 */
const weightOverview = document.getElementById("react-weight-overview");
if (weightOverview) {
    ReactDOM.render(
        <Suspense fallback={<LoadingWidget />}>
            <ExerciseStateProvider>
                <WeightStateProvider>
                    <ThemeProvider theme={theme}>
                        <WeightOverview />
                    </ThemeProvider>
                </WeightStateProvider>
            </ExerciseStateProvider>
        </Suspense>,
        weightOverview
    );
}

const weightDashboard = document.getElementById("react-weight-dashboard");
if (weightDashboard) {
    ReactDOM.render(
        <Suspense fallback={<LoadingWidget />}>
            <ExerciseStateProvider>
                <WeightStateProvider>
                    <ThemeProvider theme={theme}>
                        <OverviewDashboard />
                    </ThemeProvider>
                </WeightStateProvider>
            </ExerciseStateProvider>
        </Suspense>,
        weightDashboard
    );
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
