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
      return res.send({ message: "No teams" });
    }

    return res.send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Database error" });
  }
});

module.exports = router;
