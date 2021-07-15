const express = require("express"),
  app = express(),
  fs = require("fs"),
  fse = require("fs-extra"),
  shell = require("shelljs"),  
  path = require("path"),
  successFolderPath = "./Reports/Success/",
  errorFolderPath = "./Reports/Error/",
  defaultFileExtension = "csv",
  NEW_LINE = "\r\n";

shell.mkdir("-p", successFolderPath);
shell.mkdir("-p", errorFolderPath);

app.use(express.json({ limit: "50mb", extended: true })); 
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.get("/", (req, res) => {
  res.send("Server is running and receiving requests");
});

app.post("/write-success", async (req, res) => {
  const extension = req.body.fileExtension || defaultFileExtension,
    filename = `${req.body.requestName || ''}${req.body.fileSuffix || ''}`,
    filePath = `${path.join(successFolderPath, filename || Date.now)}.${extension}`;

  try {
    const exists = await fse.pathExists(filePath);
    if (!exists) {
      await fse.outputFile(filePath, req.body.reportFileHeader + NEW_LINE);
    }
  } catch (err) {
    console.error(err);
  }

  fs.appendFileSync(filePath, req.body.reportFileValues + NEW_LINE, "utf8");
  res.send("Success");
});

app.post("/write-error", async (req, res) => {
  const extension = req.body.fileExtension || defaultFileExtension,
    filename = `${req.body.requestName || ''}${req.body.fileSuffix || ''}`,
    filePath = `${path.join(errorFolderPath, filename || Date.now)}.${extension}`;

  try {
    const exists = await fse.pathExists(filePath);
    if (!exists) {
      await fse.outputFile(filePath, req.body.reportFileHeader + NEW_LINE);
    }
  } catch (err) {
    console.error(err);
  }

  fs.appendFileSync(filePath, req.body.reportFileValues + NEW_LINE, "utf8");
  res.send("Success");
});

app.listen(3000, () => {
  console.log("Reporting App is listening now!");
  console.log(
    `Successful requests is being stored at location: ${path.join(
      process.cwd(),
      successFolderPath
    )}`
  );
  console.log(
    `Errored requests is being stored at location: ${path.join(
      process.cwd(),
      errorFolderPath
    )}`
  );
});
