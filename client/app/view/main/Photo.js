/**
 * This view is an example list of people.
 */
Ext.define('PWA.view.main.Photo', {
    extend: 'Ext.Dialog',
    xtype: 'photodialog',
    requires: [
        'PWA.view.main.MainController',
        'Ext.d3.canvas.Canvas',
        'Ext.Video'
    ],

    controller: 'photo',

    title: 'Take a photo',

    layout: 'vbox',
    closable: true,

    items: [
        {
            xtype: 'container',
            layout: 'fit',
            width: 320,
            height: 240,
            items: [
                {
                    xtype    : 'video',
                    reference: 'video'
                }
            ]
        },
        {
            xtype: 'button',
            text: 'Capture',
            handler: 'onCaptureTap'
        },
        {
            xtype: 'd3-canvas',
            width: 320,
            height: 240,
            reference: 'canvas'
        }
    ],

    listeners: {
        show: 'onDialogShow',
        close: 'onDialogClose'
    }
});
