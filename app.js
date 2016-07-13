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
      cervejarias: {
            all: [],
            list: [],
            paginated: []
      },
      pagination: {
          perPage: 6,
          currentPage: 1,
          totalPages: 0,
          totalItens: 0,
          pageNumbers: []

      },
      interaction: {
              visibleColumns: ['name', 'last_mod'],
              columnsToFilter: [],
              filterTerm:'',
              cervejarias: [],
              openDetails: [],
              sortColumn: 'name',
              sortInverse: false
      },
      controls: {
        select2: null,

      },

  },

  methods: {

    new: function() {

        jQuery(this.$$.modal).modal('show');
    },

    setPaginationData: function(list) {

      var self = this,
      chunk = _.chunk(list, self.pagination.perPage);

      self.cervejarias.$set('paginated', chunk);
      self.cervejarias.$set('list', chunk[0]);

      self.pagination.$set('currentPage', 1);
      self.pagination.$set('totalItens', list.length);
      self.pagination.$set('totalPages', Math.ceil(list.length / self.pagination.perPage));
      self.pagination.$set('pageNumbers', _.range(1, self.pagination.totalPages+1));

    },

    page: function(ev, page) {

      ev.preventDefault();

      var self = this;

      self.pagination.$set('currentPage', page);

      self.cervejarias.$set('list', self.cervejarias.paginated[page-1]);


    },

    next: function(ev) {

        ev.preventDefault();

        var self = this;

        if (self.pagination.currentPage == self.pagination.totalPages) {
            return false;
        }

        self.pagination.$set('currentPage', self.pagination.currentPage  + 1);
        self.cervejarias.$set('list', self.cervejarias.paginated[self.pagination.currentPage-1]);
    },

    previous: function(ev) {

        ev.preventDefault();

        var self = this;

        if (self.pagination.currentPage == 1) {
          return false;
        }

        self.pagination.$set('currentPage', self.pagination.currentPage  - 1);
        self.cervejarias.$set('list', self.cervejarias.paginated[self.pagination.currentPage-1]);
    },

    doResetAll: function() {
        var self = this;

        self.interaction.$set('visibleColumns', ['name', 'last_mod']);
        self.interaction.$set('columnsToFilter', []);
        self.interaction.$set('filterTerm', '');
        self.interaction.$set('openDetails', []);
        self.interaction.$set('sortColumn', 'name');
        self.interaction.$set('sortInverse', false);

        self.setPaginationData(self.cervejarias.all);
        self.controls.select2.val('').trigger('change');
    },

    doFilter: function(ev) {

      var self = this,
      filtered = self.cervejarias.all;

      if (self.interaction.filterTerm != '' && self.interaction.columnsToFilter.length > 0) {

          filtered = _.filter(self.cervejarias.all, function(cervejaria) {

                return self.interaction.columnsToFilter.some(function(column) {
                    return cervejaria[column].toLowerCase().indexOf(self.interaction.filterTerm.toLowerCase()) > -1
                });

          });
      }


      self.setPaginationData(filtered);
    },

    doSort: function(ev, column) {

      ev.preventDefault();

      var self = this;

      self.interaction.sortColumn = column;

      self.interaction.$set('sortInverse', !self.interaction.sortInverse);

    },

    doOpenDetails: function(ev, id) {

      //link não será seguido
      ev.preventDefault();

      var self = this,

        index = self.interaction.openDetails.indexOf(id);

        if(index > -1) {
          self.interaction.openDetails.$remove(id);
        }  else {
          self.interaction.openDetails.push(id);
        }

    },

    doOpenAllDetails: function(ev) {

            ev.preventDefault();

            var self = this;

            if(self.interaction.openDetails.length > 0)
            {
                self.interaction.$set('openDetails', []);
            } else {
                self.interaction.$set('openDetails', _.pluck(self.cervejarias.list, 'id'));
            }
     }

  },


  ready: function() {
    var self = this;

    self.$http.get('http://localhost:9001/cervejarias.json', function(response) {

        self.cervejarias.$set('all', response);

        self.setPaginationData(response);
    });

    self.controls.select2 = jQuery(self.$$.columnsToFilterSelect).select2({
      placeholder: 'Selecionar uma ou mais colunas para filtrar !'
    }).on('change', function() {

        self.interaction.$set('columnsToFilter', jQuery(this).val());

    });

  }

});
