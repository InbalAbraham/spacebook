var loadNewPost = function () {

  var newPostItemTemplate = `<div class="row">
              <div class="col-md-8 well" style="margin: 5px 10px 5px 10px;">
                  <input id="newPostText" name="newPostText" class="form-control" placeholder="post" type="text" v-model:value="newText"/>
                  <button v-bind:disabled="newText.trim() == ''" class="btn btn-default" type="submit" @click='createPost'>
                      add
                  </button>
              </div>
            </div>`;

      Vue.component('new-post', {
        template: newPostItemTemplate,
        props: [],
        data () {
          return {newText : ""}
        },
        methods: {
          createPost: function(event) {
              var newPost = {"user" : Config.currentUser, "text" : newPostText.value};
              this.$parent.$emit('createPost', newPost);
              this.newText = "";
            }
          }
      })
}

window.addEventListener('load', loadNewPost);
