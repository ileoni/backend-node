require("dotenv/config");

const PORT = process.env.PORT || 3333;
require("./app").listen(PORT, () => console.log(`backend executando na porta ${PORT}`));