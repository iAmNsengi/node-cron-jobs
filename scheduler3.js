/** Housekeeping scheduler to delete all records older than 200 days */
const cron = require("node-cron");
const fs = require("fs");
const path = require("path");

const archive = require("./data/archive.json");

const houseKeepingTasks = () => {
  console.log("Scheduling started at: ", new Date());
  try {
    archive.map((item, index) => {
      const currentDate = new Date().getTime();
      const recordDate = new Date(item.date).getTime();
      console.log(
        "Number of days: ",
        Math.floor((currentDate - recordDate) / (1000 * 60 * 60 * 24))
      );

      if (
        Math.floor((currentDate - recordDate) / (1000 * 60 * 60 * 24)) > 200
      ) {
        archive.splice(index, 1);
      }
    });

    fs.writeFileSync(
      path.join(__dirname, "./", "data", "archive.json"),
      JSON.stringify(archive)
    );
  } catch (error) {
  } finally {
    console.log("Scheduling ended at: ", new Date());
  }
};

cron.schedule("* * * * * *", houseKeepingTasks);
