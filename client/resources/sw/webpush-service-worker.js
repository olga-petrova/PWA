self.addEventListener('push', function(event) {
  const promiseChain = self.registration.showNotification('A notification from server received!');

  event.waitUntil(promiseChain);
});
