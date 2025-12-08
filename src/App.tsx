import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ThemeProvider } from "./context/ThemeContext";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/Sonner";
import { Route, Routes } from "react-router";
import FormPage from "./page/FormPage";
import Page from "./page/OptmisticUpdate";
import Navbar from "./components/Navbar";

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Page />} />
                    <Route path="/form" element={<FormPage />} />
                </Routes>

                <Toaster />
            </ThemeProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}
