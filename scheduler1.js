const cron = require("node-cron");

const task = () => {
  console.log("Running a schedule task at: ", new Date());
};

cron.schedule("* * * * *", task);
