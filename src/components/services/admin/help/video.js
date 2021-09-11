import Vue from 'vue'
import VuePlayerPlugin, { Player } from 'vue-youtube-iframe-api'
export default {
  name: "Tutorial",
  components: {
    Vue, VuePlayerPlugin
  },
  data() {
    return {
      // 2. This code loads the IFrame Player API code asynchronously.
       
       done : false,
       player:'',


// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.

    }
  },
  methods: {

     onYouTubeIframeAPIReady:function()
     {
     var  tag = document.createElement('script');
  this.tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    this.player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: 'M7lc1UVf-VE',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
},

// 4. The API will call this function when the video player is ready.
 onPlayerReady:function(event) {
  event.target.playVideo();
},


 onPlayerStateChange:function(event) {
  if (event.data == YT.PlayerState.PLAYING && !this.done) {
    setTimeout(stopVideo, 6000);
   this.done = true;
  }
},

 stopVideo:function() {
 this.player.stopVideo();
}
  }
}


