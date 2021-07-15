const express = require("express");
const mysql = require("mysql2/promise");
const { mysqlConfig } = require("../../config");
const { isLoggedIn } = require("../../middleware");

const router = express.Router();

router.get("/teams", isLoggedIn, async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);

    const [data] = await con.execute("SELECT * FROM teams");
    
    con.end();

    if (data.length === 0) {
      return res.send({ message: "There are no teams" });
    }

    return res.send(data);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ error: "An unexpected error occured. Please try again" });
  }
});

module.exports = router;
