let app = new Vue({

    el: "#app",

    data: {
        show: localStorage.getItem('styling'),
        apiRequest: new XMLHttpRequest(),
        cats: {},
        query:localStorage.getItem('current_query'),
        limit:localStorage.getItem('current_limit'),
        group:{},
        retrievedData:'',
        isShow:true,
        form:''
    },

    computed: {

        showGrid: function () {
            return this.show == 'grid';
        },

        showList: function () {
            return this.show == 'list';
        }
    },

    created: function () {

        // Format a url
        let gifarray = 'https://api.giphy.com/v1/gifs/search?api_key=k8tYDwmR2RjiJK4ARzJKigWrCKffNZDn&q=<query>&limit=<limit>offset=0&rating=G&lang=en';
        gifarray = gifarray.replace("<query>",this.query);
        gifarray = gifarray.replace("<limit>",this.limit);


        // Fetch from the url
        this.apiRequest.onload = this.onRecall;
        this.apiRequest.onerror = this.onError;
        this.apiRequest.open('get', gifarray, true);
        this.apiRequest.send();


    },

    methods: {

        pickGrid: function () {
            this.pickView('grid');
        },

        pickList: function () {
            this.pickView('list');
        },

        pickView: function (style) {
            this.show = style;
            localStorage.setItem('styling',style);
        },

        onError: function () {
            console.log("oops!");
        },

        onSuccess: function () {

            if (this.apiRequest.status == "200") {
                this.cats = JSON.parse(this.apiRequest.responseText);
                this.cats = this.cats.data;
              //  window.location.reload(true)
            }
            else {
                this.onError();
            }

        },
        onRecall:function(){
          if (this.apiRequest.status == "200") {
              this.group = JSON.parse(this.apiRequest.responseText);
              this.group = this.group.data;
            //  window.location.reload(true)
            localStorage.setItem('search_result',JSON.stringify(this.group));
          }
          else {
              this.onError();
          }
        },
        filteredgifs: function(){
          let gifarray = 'https://api.giphy.com/v1/gifs/search?api_key=k8tYDwmR2RjiJK4ARzJKigWrCKffNZDn&q=<query>&limit=<limit>offset=0&rating=G&lang=en';
          gifarray = gifarray.replace("<query>",this.query);
          gifarray = gifarray.replace("<limit>",this.limit);

          // Fetch from the url
          this.apiRequest.onload = this.onRecall;
          this.apiRequest.onerror = this.onError;
          this.apiRequest.open('get', gifarray, true);
          // apiRequest.setRequestHeader('x-api-key', 'your-key-here');
          this.apiRequest.send();
          localStorage.setItem('current_query',this.query);
          localStorage.setItem('current_limit',this.limit);
        },



    }
})
