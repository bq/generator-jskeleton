/* global require, module */
'use strict';

var generators = require('yeoman-generator'),
    _ = require('underscore.string'),
    path = require('path'),
    chalk = require('chalk'),
    yosay = require('yosay');

// This mean you'll be able to use external generators inside your own, and allow user to build their app using multiple generators.
// http://yeoman.io/blog/cleanup.html
//
var JSkeletonGenerator = generators.Base.extend({

    init: function() {
        // this.argument('appname', {
        //     type: String,
        //     required: false
        // });

        this.appName = this.appname || path.basename(process.cwd());
        this.appName = 'jskeleton-' + _.slugify(this.appName);

        this.settings = {
            appName: this.appName
        };

        // Sets the source root in common
        // this.sourceRoot(path.join(__dirname, '../templates/common'));
    },
    install: function() {
        this.installDependencies({
            skipInstall: this.options['skip-install'],
            bower: true
        });
    },
    end: function() {
        this.log(yosay(chalk.green(this.appName) + ' has been built! :) ' + chalk.red('Bye!')));
    }

});

JSkeletonGenerator.prototype.welcome = function welcome() {
    if (!this.options['skip-welcome-message']) {
        this.log(yosay('Create another ' + chalk.bgBlue('JSkeleton') + ' & ' + chalk.bgYellow('Penguin <(")') + ' webapp!'));
    }
};

JSkeletonGenerator.prototype.scaffolding = function welcome() {
    this.directory('src');
    this.directory('doc');
    this.directory('test');
};

JSkeletonGenerator.prototype.setupEnv = function welcome() {
    this.copy('.jshintrc');
    this.copy('.jscsrc');
    this.copy('.csslintrc');
    this.copy('.editorconfig');
    this.copy('.npmrc');
    this.copy('gitignore', '.gitignore');
};

JSkeletonGenerator.prototype.packageFiles = function packageFiles() {
    this.copy('Gruntfile.js', 'Gruntfile.js');
    this.template('_bower.json', 'bower.json', this.settings);
    this.template('_package.json', 'package.json', this.settings);
};

JSkeletonGenerator.prototype._injectDependencies = function _injectDependencies() {
    if (this.options['skip-install']) {
        this.log(
            'After running `npm install & bower install`, inject your front end dependencies' +
            '\ninto your source code by running:' +
            '\n' +
            '\n' + chalk.yellow.bold('grunt wiredep')
        );
    } else {
        this.spawnCommand('grunt', ['wiredep']);
    }
};

module.exports = JSkeletonGenerator;
