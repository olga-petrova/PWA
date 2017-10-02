/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('PWA.view.main.PhotoController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.photo',

    onDialogShow: function () {
        var player = this.lookup('video'),
            handleSuccess = function(stream) {
                // Attach the video stream to the video element and autoplay.
                player.media.dom.srcObject = stream;
                player.stream = stream;
            };
        player.ghost.hide();
        player.media.dom.autoplay = true;
        navigator.mediaDevices.getUserMedia({video: true})
            .then(handleSuccess);
    },

    onCaptureTap: function () {
        var player = this.lookup('video'),
            snapshotCanvas = this.lookup('canvas'),
            context = snapshotCanvas.context2D;
        // Draw the video frame to the canvas.
        context.drawImage(player.media.dom, 0, 0, player.media.getWidth(), 
            player.media.getHeight());
    },

    onDialogClose: function () {
        var player = this.lookup('video'),
            videoTracks = player.stream.getVideoTracks();
        // Stop all video streams.
        videoTracks.forEach(function(track) {track.stop()});
    }
});
