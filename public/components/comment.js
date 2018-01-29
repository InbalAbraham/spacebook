var loadComment = function () {

  var commentTemplate = `<div class="comment">
                          <h4>{{ comment.user }}:</h4>
                          <p v-show="!editingMode">{{comment.text}}</p>
                          <textarea v-bind:name="'updatedCommentText' + comment._id" v-bind:id="'updatedCommentText' + comment._id"
                           v-show="editingMode" class="form-control textarea" cols="12" rows="3">{{comment.text}}</textarea>
                          </br>
                          <p class="btn btn-xs btn-primary" @click='deleted'><span class="glyphicon glyphicon-trash"></span></p>
                          <p v-show="!editingMode" class="btn btn-xs btn-primary" @click='editingMode = !editingMode;'><span class="glyphicon glyphicon-pencil"></span></p>
                          <p v-show="editingMode" class="btn btn-xs btn-primary" @click='update'><span class="glyphicon glyphicon-ok"></span></p>
                          <p v-show="editingMode" class="btn btn-xs btn-primary" @click='cancleUpdate'><span class="glyphicon glyphicon-remove"></span></p>

                      	</div>`;

  Vue.component('comment', {
    template: commentTemplate,
    props: ['comment', 'pindex', 'postId'],
    data () {
      return {editingMode : false}
    },
    methods: {
      deleted: function(event) {
        this.$parent.$parent.$parent.$emit('deleteComment', this.postId, this.pindex, this.comment._id);
      },
      cancleUpdate: function () {
        document.getElementById('updatedCommentText' + this.comment._id).value = this.comment.text;
        this.editingMode = false;
      },
      update: function(event) {
        this.comment.text = document.getElementById('updatedCommentText' + this.comment._id).value;
        this.editingMode = false;
        this.$parent.$parent.$parent.$emit('updateComment', this.postId, this.pindex, this.comment);
      }
    }
  })
}

window.addEventListener('load', loadComment);
