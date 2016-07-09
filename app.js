
new Vue({

  el:'#beerApp',

  //objeto chamado data
  data: {
      cervejarias: [],
      openDetails: [],
      sortColumn: 'name',
      sortInverse: false
  },

  methods: {

    doSort: function(ev, column) {

      ev.preventDefault();

      var self = this;

      self.sortColumn = column;

      self.$set('sortInverse', !self.sortInverse);

    },

    doOpenDetails: function(ev, id) {

      //link não será seguido
      ev.preventDefault();

      var self = this,

        index = self.openDetails.indexOf(id);

        if(index > -1) {
          self.openDetails.$remove(id);
        }  else {
          self.openDetails.push(id);
        }

    },

    openAllDetails: function(ev) {

            ev.preventDefault();

            var self = this;

            if(self.openDetails.length > 0)
            {
                self.$set('openDetails', []);
            } else {
                self.$set('openDetails', _.pluck(self.cervejarias.list, 'id'));
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
