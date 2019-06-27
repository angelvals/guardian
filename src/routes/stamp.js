const express = require('express')
const router = express.Router()
const request = require('request');

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "RacfId": "mf01b",
    "Source": "Swagger"
}

const baseUrl = "http://engdeviis.nscorp.com/svcStampAPI/api/"

router.get('/getRegions', (req, res) => {
    const racf_id = req.query.racf_id || "mf01b";
    const inclusive = req.query.inclusive || "true";

    const options = {
        url: `${baseUrl}Read/SubRegionListByRacf_id?racf_id=${racf_id}&inclusive=${inclusive}`,
        headers: headers
    };
    request.get(options, (error, response, body) => {
        res.send({
            error: error,
            statusCode: response && response.statusCode,
            body: JSON.parse(body)
        })
    });
})

router.get('/getLines', (req, res) => {
    const iSubID = req.query.iSubID || "2";

    const options = {
        url: `${baseUrl}Read/GetLineSorted?iSubID=${iSubID}`,
        headers: headers
    };
    request.get(options, (error, response, body) => {
        res.send({
            error: error,
            statusCode: response && response.statusCode,
            body: JSON.parse(body)
        })
    });
})

router.get('/getLocations', (req, res) => {
    const sName =  req.query.sName || "CINCINNATI LINE";
    const sID =  req.query.sID || "2";
    const locationType =  req.query.locationType || "Crossing";

    const options = {
        url: `${baseUrl}Read/vw_RemedyLocationListBySubregionLine?sName=${sName}&sID=${sID}&locationType=${locationType}`,
        headers: headers
    };
    request.get(options, (error, response, body) => {
        res.send({
            error: error,
            statusCode: response && response.statusCode,
            body: JSON.parse(body)
        })
    });
})

router.get('/getInspectionTests', (req, res) => {
    const atcsID = req.query.atcsID || "8649";
    const startDT = req.query.startDT || "05/11/2019";
    const endDT = req.query.endDT || "07/11/2019";

    const options = {
        url: `${baseUrl}Read/stpGetCrossingTestDetail?atcsID=${atcsID}&startDT=${startDT}&endDT=${endDT}`,
        headers: headers
    };
    request.get(options, (error, response, body) => {
        res.send({
            error: error,
            statusCode: response && response.statusCode,
            body: JSON.parse(body)
        })
    });
})

router.get('/getTestList', (req, res) => {
    const options = {
        url: `${baseUrl}Read/FRA_TestList`,
        headers: headers
    };
    request.get(options, (error, response, body) => {
        res.send({
            error: error,
            statusCode: response && response.statusCode,
            body: JSON.parse(body)
        })
    });
})

router.post('/outOfSeqLog', (req, res) => {
    const options = {
        url: `${baseUrl}Create/OutOfSeqLog`,
        headers: headers,
        form: `{
            "OutOfSeq_ID": "${req.params.OutOfSeq_ID || 0}",
            "ATCS_ID": "${req.params.ATCS_ID || 0}",
            "Racf_ID": "${headers.RacfId}",
            "Part_number": "${req.params.Part_number || 0}",
            "Section_number": "${req.params.Section_number || 0}",
            "Action": "${req.params.Action || "" }",
            "FRA_TestID": "${req.params.FRA_TestID || 0}",
            "Equip_ID": "${req.params.Equip_ID || 0}",
            "Equipment": "${req.params.Equipment || "" }",
            "DateSelected": "${req.params.DateSelected || new Date().toISOString()}",
            "NextTestDate": "${req.params.NextTestDate || new Date().toISOString()}",
            "cycleSelected": "${req.params.cycleSelected || "" }",
            "comments": "${req.params.comments || "" }",
            "LogDate": "${req.params.LogDate || new Date().toISOString()}"
        }`,
    };
    request.post(options, (error, response, body) => {
        res.send({
            error: error,
            statusCode: response && response.statusCode,
            body: JSON.parse(body)
        })
    });
})

module.exports = router