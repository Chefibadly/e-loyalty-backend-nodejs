const QRCode= require('qrcode');
const Jimp = require("jimp");
// Importing filesystem module
const fs = require('fs')
// Importing qrcode-reader module
const qrCode = require('qrcode-reader');



helpersFunctions = {
    generateQRCode: generateQR = async text => {
        try {
            const url = await QRCode.toDataURL(text)
            //console.log(url)
            return url

        } catch (err) {
          console.error(err)
        }
      },
      outputQRImage: imageQRCode = ()=>{
        const buffer = fs.readFileSync('C:/Users/Chedly/Desktop/pfe' +'/image.png');
        Jimp.read(buffer, function(err, image) {
            
            if (err) {
                console.error(err);
            }
            // Creating an instance of qrcode-reader module
            let qrcode = new qrCode();
            qrcode.callback = function(err, value) {
                if (err) {
                    console.error(err);
                }
                // Printing the decrypted value
                console.log(value.result);
            };
            // Decoding the QR code
            qrcode.decode(image.bitmap);
        });
      }
      
    
}

module.exports = helpersFunctions;