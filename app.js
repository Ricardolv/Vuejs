
new Vue({

  el:'#beerApp',

  //objeto chamado data
  data: {
      cervejarias: [],
      openDetails: [],
  },

  methods: {
    doOpenDetails: function(ev, id) {

      //link não será seguido
      ev.preventDefault();

      var self = this,

        index = self.openDetails.indexOf(id);

        if(index > -1) {
          self.openDetails.$remove(index);  
        }  else {
          self.openDetails.push(id);
        }

    }
  },

  ready: function() {
    var self = this;

    self.$http.get('http://localhost:9001/cervejarias.json', function(response) {

        self.cervejarias = response;

    });

  }

});
