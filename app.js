
new Vue({

  el:'#beerApp',

  //objeto chamado data
  data: {
      cervejarias: []
  },

  ready: function() {
    var self = this;

    self.$http.get('http://localhost:9001/cervejarias.json', function(response) {

        self.cervejarias = response;

    });

  }

});
