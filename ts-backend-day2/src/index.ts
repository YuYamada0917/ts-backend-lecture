import { userService } from "./service/userService";

// データを追加
userService.addUser({id: 1, name: "太郎", email: "taro@example.com"});
userService.addUser({id: 2, name: "花子", email: "hanako@example.com"});

// 動作確認
console.log("=== All Users ===");
console.log(userService.list());

console.log("=== getUserById(1) ===");
console.log(userService.getUserById(1));

console.log("=== getUserById(3) === (存在しないので undefined)");
console.log(userService.getUserById(3));

