
var loadPostItem = function () {

var postItemTemplate = `<div class="row">
            <div class="col-md-8 well" style="margin: 5px 10px 5px 10px;">
              <h4>{{ post.user }}</h4>
              <p v-show="!editingMode">{{post.text}}</p>
              <textarea v-bind:name="'updatedPostText' + post._id" v-bind:id="'updatedPostText' + post._id"
              v-show="editingMode" class="form-control textarea" cols="50" rows="7" >{{post.text}}</textarea>
              </br>

              <p class="btn btn-xs btn-primary" @click='deleted'><span class="glyphicon glyphicon-trash"></span></a>
              <p v-show="!editingMode" class="btn btn-xs btn-primary" @click='editingMode = !editingMode;'><span class="glyphicon glyphicon-pencil"></span></p>
              <p v-show="editingMode" class="btn btn-xs btn-primary" @click='update'><span class="glyphicon glyphicon-ok"></span></p>
              <p v-show="editingMode" class="btn btn-xs btn-primary" @click='cancleUpdate'><span class="glyphicon glyphicon-remove"></span></p>

              <hr class="style1">

              <collapsible
               ref="collapsible" header="view comments">
                  <comment
                  v-for="(comment, index) in post.comments"
                  v-bind:comment="comment"
                  v-bind:postId="post._id"
                  v-bind:key="comment._id"
                  v-bind:pindex="pindex"
                ></comment>
                <new-comment :pindex=pindex :postId=post._id></new-comment>
              </collapsible>

            </div>
          </div>`;

Vue.component('post', {
  props: ['post','pindex'],
  template: postItemTemplate,
  data () {
    return {
      editingMode : false
    }
  },
  methods: {
    deleted: function(event) {
      this.$parent.$emit('deletePost', this.post._id, this.pindex);
    },
    update: function(event) {
      this.post.text = document.getElementById('updatedPostText' + this.post._id).value;
      this.editingMode = false;
      this.$parent.$emit('updatePost', this.post, this.pindex);
    },
    cancleUpdate: function () {
      document.getElementById('updatedPostText' + this.post._id).value = this.post.text;
      this.editingMode = false;
    }
  },
  mounted: function() {
  }
})
}


window.addEventListener('load', loadPostItem);
