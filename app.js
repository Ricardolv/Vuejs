Vue.filter('dateFormat', function(value, formatString) {

  if (formatString != undefined) {
    return  moment(value).format(formatString);
  }
  return  moment(value).format('DD/MM/YYYY HH:mm:ss');

});


new Vue({

  el:'#beerApp',

  //objeto chamado data
  data: {
      columnsToFilter: [],
      filterTerm:'',
      all: [],
      cervejarias: [],
      openDetails: [],
      sortColumn: 'name',
      sortInverse: false
  },

  methods: {

    doFilter: function(ev) {

      var self = this,
      filtered = self.all;

      if (self.filterTerm != '' && self.columnsToFilter.length > 0) {

          filtered = _.filter(self.all, function(cervejaria) {

                return self.columnsToFilter.some(function(column) {
                    return cervejaria[column].toLowerCase().indexOf(self.filterTerm.toLowerCase()) > -1
                });

          });
      }


      self.$set('cervejarias', filtered);


    },

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

        self.$set('cervejarias', response);
        self.$set('all', response);

    });

    jQuery(self.$$.columnsToFilterSelect).select2({
      placeholder: 'Selecionar uma ou mais colunas para filtrar !'
    }).on('change', function() {

        self.$set('columnsToFilter', jQuery(this).val());

    });

  }

});
