import { sleep } from "@/lib/utils";
import type { IUser } from "@/types/IUser";

type ICreateUserDTO = Omit<IUser, "id"> & { tmpUserId?: string };

export async function createUser({ blocked, name, username }: ICreateUserDTO) {
    await sleep(500);

    const response = await fetch("http://localhost:4000/users", {
        method: "POST",
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
