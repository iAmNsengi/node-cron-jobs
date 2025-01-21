/** Job to check the status of invoices
 * and if status is paid we archive it */
const cron = require("node-cron");
const fs = require("fs");
const path = require("path");

const invoices = require("./data/invoice.json");

const archiveInvoicesTask = () => {
  console.log("Running archive invoices task: ", new Date());
  try {
    const paidInvoices = invoices.filter((item) => item.status == "paid");

    if (paidInvoices.length) {
      paidInvoices.forEach((item) =>
        invoices.splice(
          invoices.findIndex((e) => e.status === item.status),
          1
        )
      );

      fs.writeFileSync(
        path.join(__dirname, "./", "data", "invoice.json"),
        JSON.stringify(invoices),
        "utf-8"
      );

      fs.writeFileSync(
        path.join(__dirname, "./", "data", "archive.json"),
        JSON.stringify(paidInvoices),
        "utf-8"
      );
    }
  } catch (error) {
    console.error("An error occurred", error);
  } finally {
    console.log("Archive invoices task ended", new Date());
  }
};

// write to archive in every 30 seconds
cron.schedule("*/30 * * * * *", archiveInvoicesTask);
