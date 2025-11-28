import { useCreateUser } from "@/hooks/useCreateUser";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export function UserForm() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const { isLoading, createUser } = useCreateUser();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await createUser({ name, username, blocked: false });
            setName("");
            setUsername("");
            toast.success("Usuário criado com sucesso!");
        } catch (error) {
            toast.error("Erro ao criar o usuário.");
            console.log(error);
        }
    };

    return (
        <form className="bg-muted/50 p-4 rounded-md" onSubmit={handleSubmit}>
            <div className="flex gap-2">
                <Input
                    placeholder="Nome do usuario"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <Input
                    placeholder="@ no github"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </div>
            <Button className="mt-3 w-full" disabled={isLoading} type="submit">
                {isLoading ? <Loader2 className="animate-spin" /> : "Cadastrar"}
            </Button>
        </form>
    );
}
