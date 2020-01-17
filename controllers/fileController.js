
const fs = require('fs');
const extract = require('extract-zip')
const formidable = require('formidable');
const path = require('path');
const uploadDir = path.join(__dirname, '/uploads/');
const extractDir = path.join(__dirname, '/app/');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  if (!fs.existsSync(extractDir)) {
    fs.mkdirSync(extractDir);
  }

module.exports = {

    bulkUpload: async(req, res, next) => {
        const form = new formidable.IncomingForm();
        // file size limit 100MB. change according to your needs
        form.maxFileSize = 100 * 1024 * 1024;
        form.keepExtensions = true;
        form.multiples = true;
        form.uploadDir = uploadDir;
      
        // collect all form files and fileds and pass to its callback
        form.parse(req, (err, fields, files) => {
          // when form parsing fails throw error
          if (err) return res.status(500).json({ error: err });
      
          if (Object.keys(files).length === 0) return res.status(400).json({ message: "no files uploaded" });
      
          // Iterate all uploaded files and get their path, extension, final extraction path
          const filesInfo = Object.keys(files).map((key) => {
            const file = files[key];
            const filePath = file.path;
            const fileExt = path.extname(file.name);
            const fileName = path.basename(file.name, fileExt);
            const destDir = path.join(extractDir, fileName);
      
            return { filePath, fileExt, destDir };
          });
      
          // Check whether uploaded files are zip files
          const validFiles = filesInfo.every(({ fileExt }) => fileExt === '.zip');
      
          // if uploaded files are not zip files, return error
          if (!validFiles) return res.status(400).json({ message: "unsupported file type" });
      
          res.status(200).json({ uploaded: filesInfo });
      
          // iterate through each file path and extract them
          filesInfo.forEach(({filePath, destDir}) => {
            // create directory with timestamp to prevent overwrite same directory names
            extract(filePath, { dir: `${destDir}_${new Date().getTime()}` }, (err) => {
              if (err) console.error('extraction failed.');
            });
          });
        });
      
        // runs when new file detected in upload stream
        form.on('fileBegin', function (name, file) {
          // get the file base name `index.css.zip` => `index.html`
          const fileName = path.basename(file.name, path.extname(file.name));
          const fileExt = path.extname(file.name);
          // create files with timestamp to prevent overwrite same file names
          file.path = path.join(uploadDir, `${fileName}_${new Date().getTime()}${fileExt}`);
        });
      }
    

   /*  bulkUpload: async  (req, res, next) => {
        try {
            debugger;
            if (result) {
                res.status(200).json({ message: 'LOGIN SUCCESS', data: user });
            }
            else {
                res.status(208).send({ message: 'access denied, please enter a valid password'});
            }
        } catch (error) {
            res.status(500).send({ message: 'User not found', error: error });
        }

    } */
}
