module.exports = {
    tags: ['casperjs'],

    'Demo test casperjs.readthedocs.org': function(client) {
        client
            .url('http://casperjs.readthedocs.org/en/latest/modules/casper.html')
            .waitForElementVisible('body', 1000)

        .assert.title('The casper module — CasperJS 1.1.0-DEV documentation')

        .useCss()
            .assert.visible('input[type="text"]')

        .useXpath()
            .assert.visible('//input[@type="text"]')
            .setValue('//input[@type="text"]', 'zoom')

        .useCss()
            .waitForElementVisible('input[value="Go"]', 1000)
            .click('input[value="Go"]')
            .pause(1000)
            .assert.containsText('#search-documentation', 'Search')
            .end();
    }
};
