# phl-pac-complaints

A thin Node.js client for working with Philadelphia's [Police Advisory Commission Complaints API](http://gis.phila.gov/ArcGIS/rest/services/PhilaGov/PAC_Complaints_2009_2012/MapServer).

This is a work in progress.

Learn more about Philadelphia's PAC Complaints data on [OpenDataPhilly](http://opendataphilly.org/opendata/resource/218/philadelphia-police-advisory-commission-complaints).

## Example Usage

    var Phl = require('phl_pac_complaints.js');
    var phl = new Phl();

    phl.getData({action: 'reject'}, function (error, data) {
        if (error) return error;
        console.log(data);
    });
