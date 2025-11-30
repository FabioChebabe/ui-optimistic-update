import { useUpdateUser } from "@/hooks/useUpdateUser";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { Skeleton } from "./ui/Skeleton";
import { Switch } from "./ui/Switch";
import { useUsers } from "@/hooks/useUsers";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";
import { RotateCcw } from "lucide-react";
import { useCreateUser } from "@/hooks/useCreateUser";

export function UsersList() {
    const { users, isLoading } = useUsers();
    const { updateUser } = useUpdateUser();
    const { createUser } = useCreateUser();

    const handleCheckedChange = async (id: string, blocked: boolean) => {
        try {
            await updateUser({ blocked, id });
        } catch (error) {
            toast.error("Erro ao atualizar o usuário.");
            console.log(error);
        }
    };

    return (
        <div className="space-y-4">
            {isLoading && (
                <>
                    <Skeleton className="h-[82px]" />
                    <Skeleton className="h-[82px]" />
                    <Skeleton className="h-[82px]" />
                </>
            )}
            {users.map((user) => (
                <div
                    key={user.id}
                    className={cn(
                        "border p-4 rounded-md flex justify-between items-center",
                        user.status === "pending" && "opacity-60",
                        user.status === "error" &&
                            "border-destructive bg-destructive/10",
                    )}
                >
                    <div className="flex items-center gap-4 ">
                        <Avatar className="w-12 h-12">
                            <AvatarImage
                                src={`https://github.com/${user.username}.png`}
                            />
                            <AvatarFallback>
                                {user.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <strong className="text-lg block leading-4">
                                {user.name}
                            </strong>
                            <small className="text-muted-foreground">
                                @{user.username}
                            </small>
                        </div>
                    </div>
                    {user.status === "error" ? (
                        <Button
                            variant="outline"
                            onClick={() =>
                                createUser({
                                    name: user.name,
                                    username: user.username,
                                    blocked: user.blocked,
                                    tmpUserId: user.id,
                                })
                            }
                        >
                            <RotateCcw />
                        </Button>
                    ) : (
                        <Switch
                            checked={user.blocked}
                            onCheckedChange={(blocked) =>
                                handleCheckedChange(user.id, blocked)
                            }
                            disabled={user.status === "pending"}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
