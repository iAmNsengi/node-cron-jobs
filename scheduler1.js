const cron = require("node-cron");

const task = () => {
  console.log("Running a schedule task at: ", new Date());
};

// scheduler tasks to run on every minute
cron.schedule("* * * * *", task);
