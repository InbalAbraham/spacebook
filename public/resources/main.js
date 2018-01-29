window.addEventListener('load', function () {
    var spaceApp = new Vue({
      el: '#spaceApp',
      data: {
        postsList: []
      },
      methods:{
        refreshCommentsForPost: function(postId, postIndex) {
          const vm = this;

          axios.get(Config.serverBaseURL + "/posts/" + postId + "/comments")
          .then(response => {
            vm.postsList[postIndex].comments = response.data
          });
        },
        createPost: function (newPost) {
          const vm = this;

            axios.post(Config.serverBaseURL + "/posts/", newPost)
            .then(response => {
              var fullNewPost = response.data;
              vm.postsList.push(fullNewPost);
            })
            .catch(error => {
              console.log(error)}
            );
        },
        createComment: function(newComment, postId, postIndex) {
            const vm = this;

            axios.post(Config.serverBaseURL + "/posts/" + postId + "/comments", newComment)
            .then(response => {
              var fullNewPost = response.data;
              vm.postsList[postIndex].comments.push(fullNewPost);
            })
            .catch(error => {
                console.log(error)}
            );
          },
        deletePost: function(postId, postIndex) {
          const vm = this;

          axios.delete(Config.serverBaseURL + "/posts/" + postId)
          .then(response => {
            vm.postsList.splice(postIndex, 1);
          });
        },
        deleteComment: function(postId, postIndex, commentId){
          const vm = this;

          axios.delete(Config.serverBaseURL + "/posts/" + postId + "/comments/" + commentId)
          .then(response => {
            vm.refreshCommentsForPost(postId, postIndex);
          });
        },
        updatePost: function(post, postIndex){
          const vm = this;

          axios.put(Config.serverBaseURL + "/posts/" + post._id, post)
          .then(response => {
            vm.postsList[postIndex].text = post.text;
          })
          .catch(error => {
            console.log(error)}
          );
        },
        updateComment: function(postId, postIndex, comment){
          const vm = this;

          axios.put(Config.serverBaseURL + "/posts/" + postId + "/comments/" + comment._id, comment)
          .then(response => {
            vm.refreshCommentsForPost(postId, postIndex);
          })
          .catch(error => {
            console.log(error)}
          );
        },
        loadPosts: function() {
          axios.get(Config.serverBaseURL + "/posts")
          .then(response => {this.postsList = response.data
          })
          .catch(error => {
            console.log(error)}
          );
        }
      },
      mounted() {
        this.$on('deletePost', this.deletePost);
        this.$on('deleteComment', this.deleteComment);
        this.$on('updatePost', this.updatePost);
        this.$on('updateComment', this.updateComment);
        this.$on('createPost', this.createPost);
        this.$on('createComment', this.createComment);

        this.loadPosts();
      }
    });
})
