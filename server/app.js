const {section} = require("./config/db");
console.log('Hello from backend');

(async () => {
    const sections = await section.find();
    console.log(await sections.toArray());
})();




