"use strict";
const alice = { name: 123, age: 25 };
const greetUser = (user) => { var _a; return `Hi ${user.name}! You are ${(_a = user.age) !== null && _a !== void 0 ? _a : "unknown"} years old.`; };
console.log(greetUser(alice));
