interface User {
    name: string;
    age?: number;
}
const alice: User ={ name: "Alice", age: 25 };

const greetUser = (user: User): string =>
    `Hi ${user.name}! You are ${user.age ?? "unknown"} years old.`;

console.log(greetUser(alice));
