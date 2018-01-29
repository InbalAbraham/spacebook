var loadNewComment = function () {

  var newCommentTemplate = `<div class="comment">
                                <input id="newCommentText" name="newCommentText" class="form-control" placeholder="comment" type="text" v-model:value="newText"/>
                                <button v-bind:disabled="newText.trim() == ''" class="btn btn-default" type="submit" @click='createComment'>
                                    add
                                </button>
                        </div>`;

    Vue.component('new-comment', {
      template: newCommentTemplate,
      props: ['pindex', 'postId'],
      data () {
        return {newText : ""}
      },
      methods: {
        createComment: function(event) {
            var newComment = {"user" : Config.currentUser, "text" : this.newText};
            this.$parent.$parent.$parent.$emit('createComment', newComment, this.postId, this.pindex);
            this.newText = "";
          }
        }
  })
}

window.addEventListener('load', loadNewComment);
