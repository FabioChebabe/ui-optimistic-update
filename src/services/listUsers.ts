import { sleep } from "@/lib/utils";
import type { IUser } from "@/types/IUser";

export async function listUsers() {
    await sleep(500);
    const response = await fetch("http://localhost:4000/users");
    const data = await response.json();

    return data as IUser[];
}
