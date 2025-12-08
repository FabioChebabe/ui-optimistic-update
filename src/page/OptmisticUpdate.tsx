import { Header } from "@/components/Header";
import { UserForm } from "@/components/UserForm";
import { UsersList } from "@/components/UsersList";

export default function Page() {
    return (
        <div className="max-w-xl min-h-full mx-auto mt-20">
            <Header />
            <main className="mt-10 space-y-3">
                <UserForm />
                <UsersList />
            </main>
        </div>
    );
}
