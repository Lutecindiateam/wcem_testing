const axios = require('axios');
const otpverify = require('../../models/partner/otp');
const upload = require('../../models/partner/upload');

exports.sendOtp = async (req, res) => {
    // console.log(req.body);
    return res.status(200).json({ message: "success", type: "success" })
    const number = "+91" + req.body.number;
    const options = {
        method: 'POST',
        url: `https://control.msg91.com/api/v5/otp?template_id=65ce0071d6fc0527d10a0e62&mobile=${number}`,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authkey: '394213AT3rL5M7sB65cef71aP1'
        },
        data: { Param1: 'value1', Param2: 'value2', Param3: 'value3' }
    };

    axios
        .request(options)
        .then(function (response) {
            res.status(200).json(response.data)
        })
        .catch(function (error) {
            console.error(error);
            console.log(error);
        });
}

exports.verifyOtp = async (req, res) => {
    const saveMobile = await otpverify.create({ mobile: req.body.number })
    if (saveMobile) {
        res.status(200).json({ message: "success", type: "success" })
    }
    return;
    const { otp } = req.body;
    const number = "+91" + req.body.number;
    const options = {
        method: 'GET',
        url: `https://control.msg91.com/api/v5/otp/verify?otp=${otp}&mobile=${number}`,
        headers: { accept: 'application/json', authkey: '394213AT3rL5M7sB65cef71aP1' }
    };

    axios
        .request(options)
        .then(async function (response) {
            // const mobile = number.substring(3);
            // const candidateNum = await upload.findOneAndUpdate(
            //     { mobile: mobile },
            //     {
            //         $set: {
            //             verifycandidate: true,
            //         },
            //     },
            //     { new: true }
            // );
            // const parentNum = await upload.findOneAndUpdate(
            //     { parent_mobile: mobile },
            //     {
            //         $set: {
            //             verifyparent: true,
            //         },
            //     },
            //     { new: true }
            // );

            const saveMobile = await otpverify.create({ mobile: req.body.number })
            if (saveMobile) {
                res.status(200).json(response.data)
            }
        })
        .catch(function (error) {
            console.error(error);
        });


}