const today = new Date();
console.log(today);
console.log(today.toLocaleString(), 11);
console.log(today.toUTCString());
// YYYY-MM-DDTHH:mm:ss.sssZ

const test = new Date("2022-12-05");
console.log("---");
console.log(test);
console.log(test.toISOString());

const test2 = new Date("05/12/2022, 10:49:25 pm");
console.log("---22");
console.log(test2);
console.log(test.toISOString());

//https://momentjs.com/timezone/
