import { useUpdateUser } from "@/hooks/useUpdateUser";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { Skeleton } from "./ui/skeleton";
import { Switch } from "./ui/Switch";
import { useUsers } from "@/hooks/useUsers";

export function UsersList() {
    const { users, isLoading } = useUsers();
    const { updateUser } = useUpdateUser();

    const handleCheckedChange = async (id: string, blocked: boolean) => {
        await updateUser({ blocked, id });
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
                    className="border p-4 rounded-md flex justify-between items-center"
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
                    <Switch
                        checked={user.blocked}
                        onCheckedChange={(blocked) =>
                            handleCheckedChange(user.id, blocked)
                        }
                    />
                </div>
            ))}
        </div>
    );
}
