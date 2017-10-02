/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('PWA.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    requires: [
        'Ext.data.Store',
        'Ext.data.proxy.Ajax',
        'PWA.view.person.Person',
        'PWA.model.Person'
    ],

    listen: {
        controller: {
            '*': {
                'home': 'showList'
            }
        }
    },

    initViewModel: function() {
        var vm = this.getViewModel();

        // add a way to listen for these in the "listen" object

        window.addEventListener("online", function() {
            vm.set('online', true);
            vm.getStore('personnel').reload();
        });

        window.addEventListener("offline", function() {
            vm.set('online', false);
        });
    },

    onItemSelected: function (sender, index, target, record) {
        this.showPerson(record.data);
    },

    onRefresh: function() {
        this.getStore('personnel').reload();
    },

    showPerson: function(person) {
        person = Ext.create('PWA.model.Person', person);
        var main = this.lookup('main');
        var view = this.lookup('person');
        var vm = view.getViewModel();
        vm.set({ record: person });
        vm.notify();
        main.setActiveItem(view);
    },

    showList: function() {
        var main = this.lookup('main');
        main.setActiveItem(0);
    },

    onPhotoTap: function () {
        var dialog = Ext.create({
            xtype: 'photodialog'
        });

        dialog.show();

    },

    onPushTap: function (button, pressed) {
        if (pressed) {
            Ext.getApplication().webpushSW.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey:
                    this.urlBase64ToUint8Array('BFThwKrnLMBdkp2QB4Pvl-angiWrw3WRiHQFUYRvFQUgMD9S-LyfsZsdP08fsFs6V170bIHR_eNr3pmF9uHidgw')
            }).then(function (pushSubscription) {
                console.log(pushSubscription);
                button.setText('Disable Web Push');
            });
        } else {
            Ext.getApplication().webpushSW.pushManager.getSubscription().then(function(subscription) {
                if (subscription) {
                    return subscription.unsubscribe().then(function(successful) {
                        console.log(subscription);
                        button.setText('Enable Web Push');
                    })
                }
            });
        }
    },

    urlBase64ToUint8Array: function (base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/')
        ;
        const rawData = window.atob(base64);
        return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
    }

});
