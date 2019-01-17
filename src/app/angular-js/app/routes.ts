export const ROUTES = {
  '/dashboard': {template: '<p>/dashboard in AngularJS config</p>'},
  '/otherUrl': {
    template: `<p>/otherUrl in AngularJS configuration with data bindings {{ctrl.nowish | date : 'h:mm:ss'}}`,
    controllerAs: 'ctrl',
    controller: function ($interval) {
      const that = this;
      $interval(updateDate, 1000);
      updateDate();
      function updateDate() {
        that.nowish = Date.now();
      }
    }
  }
};