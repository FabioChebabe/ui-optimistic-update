import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Header } from "./components/Header";
import { UserForm } from "./components/UserForm";
import { UsersList } from "./components/UsersList";
import { ThemeProvider } from "./context/ThemeContext";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/Sonner";
import FormPage from "./page/FormPage";

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <FormPage />
            {/* <ThemeProvider>
                <div className="max-w-xl mx-auto mt-20">
                    <Header />
                    <main className="mt-10 space-y-3">
                        <UserForm />
                        <UsersList />
                    </main>
                </div>
                <Toaster />
            </ThemeProvider> */}
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}
