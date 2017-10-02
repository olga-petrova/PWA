/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('PWA.Application', {
    extend: 'Ext.app.Application',

    name: 'PWA',

    stores: [
        // TODO: add global / shared stores here
    ],

    launch: function () {
        this.registerWebPushServiceWorker();
    },

    profiles: [
        'Phone',
        'Tablet'
    ],

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
        
    },

    registerWebPushServiceWorker: function () {
        if ('serviceWorker' in navigator) { 
            if ('PushManager' in window) { 
                return navigator.serviceWorker.register('resources/sw/webpush-service-worker.js')
                .then(function(registration) {
                    Ext.getApplication().webpushSW = registration;
                });
            }
        }

    }
});
