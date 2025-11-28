import { sleep } from "@/lib/utils";
import type { IUser } from "@/types/IUser";

type IUpdateUserDTO = Partial<Omit<IUser, "id">> & { id: string };

export async function updateUser({
    blocked,
    name,
    username,
    id,
}: IUpdateUserDTO) {
    await sleep(500);

    const response = await fetch(`http://localhost:4000/users/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            blocked,
            name,
            username,
        }),
    });

    const data = await response.json();
    return data as IUser;
}
