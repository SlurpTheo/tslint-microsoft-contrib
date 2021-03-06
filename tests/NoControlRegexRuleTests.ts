/// <reference path="../typings/mocha.d.ts" />
/// <reference path="../typings/chai.d.ts" />

/* tslint:disable:quotemark */
/* tslint:disable:no-multiline-string */

import TestHelper = require('./TestHelper');

/**
 * Unit tests.
 */
describe('noControlRegexRule', () : void => {

    var ruleName : string = 'no-control-regex';

    it('should pass on chars higher than x20', () : void => {
        var script : string = `
            var pattern1 = /\\x20/;
            var pattern2 = /\\x21/;
            var pattern3 = /\\x30/;
            var pattern4 = /\\x31/;
            var pattern5 = /\\x20/;
            var pattern6 = new RegExp("\\x20");
        `;

        TestHelper.assertViolations(ruleName, script, [ ]);
    });

    it('should fail on x1f', () : void => {
        var script : string = `
            var pattern1 = /\\x1f/;
            var pattern2 = new RegExp("something \\x1f something else");
            var pattern3 = RegExp("\\x1f trailing text");
        `;

        TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Unexpected control character in regular expression",
                "name": "file.ts",
                "ruleName": "no-control-regex",
                "startPosition": { "character": 28, "line": 2 }
            },
            {
                "failure": "Unexpected control character in regular expression",
                "name": "file.ts",
                "ruleName": "no-control-regex",
                "startPosition": { "character": 39, "line": 3 }
            },
            {
                "failure": "Unexpected control character in regular expression",
                "name": "file.ts",
                "ruleName": "no-control-regex",
                "startPosition": { "character": 35, "line": 4 }
            }
        ]);
    });

    it('should fail on x00', () : void => {
        var script : string = `
            var pattern1 = /\\x00/;
            var pattern2 = new RegExp("\\x00");
            var pattern3 = RegExp("\\x00");
        `;

        TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Unexpected control character in regular expression",
                "name": "file.ts",
                "ruleName": "no-control-regex",
                "startPosition": { "character": 28, "line": 2 }
            },
            {
                "failure": "Unexpected control character in regular expression",
                "name": "file.ts",
                "ruleName": "no-control-regex",
                "startPosition": { "character": 39, "line": 3 }
            },
            {
                "failure": "Unexpected control character in regular expression",
                "name": "file.ts",
                "ruleName": "no-control-regex",
                "startPosition": { "character": 35, "line": 4 }
            }
        ]);
    });

});
/* tslint:enable:quotemark */
/* tslint:enable:no-multiline-string */
