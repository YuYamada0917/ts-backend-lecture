import { User } from "../models/user";

class UserService {
    private users: User[] = [];

    // ユーザーを追加
    addUser(user: User): void {
        this.users.push(user);
    }

    // IDで1件取得(無ければundefined)
    getUserById(id: number): User | undefined {
        return this.users.find((u) => u.id === id);
    }

    // 全件取得
    list(): readonly User[] {
        return this.users;
    }
}

export const userService = new UserService();