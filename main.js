(()=>{"use strict";class t{#state;constructor(t,s){this.player_el=t,this.stream_url=s}setup(){let t=document.createElement("iframe");t.setAttribute("allow","autoplay; encrypted-media;"),t.setAttribute("src",this.stream_url+"?enablejsapi=1"),this.player_el.appendChild(t),this.#state=0}get state(){return this.#state}post_message(t){this.player_el.childNodes[0].contentWindow.postMessage('{"event":"command","func":"'+t+'","args":""}',"*")}play(){this.post_message("playVideo"),this.#state=1}stop(){this.post_message("stopVideo"),this.#state=0}destroy(){for(this.stop();this.player_el.lastChild;)this.player_el.removeChild(this.player_el.lastChild);this.#state}}let s;s=new class{BACKGROUND_VIDEO_EL_ID="background-video";BACKGROUND=class{BACKGROUND_VIDEO_URL="backgrounds.json";constructor(t){this.parent=t,this.background_video_el=t.background_video_el,this.background_video_el.defaultPlaybackRate=.5}get_json(t,s){return fetch(t).then((function(t){if(!t.ok)throw new Error("HTTP error, status = "+t.status);return t.json()})).then(s.bind(this))}handle_backgrounds(t){this.backgrounds=t}random_choice(t){return t[Math.floor(Math.random()*t.length)]}random_background(){return this.random_choice(this.backgrounds)}update_background(t){this.background_video_el.setAttribute("src",t.url)}change(){this.background=this.random_background(),this.update_background(this.background),this.parent.player.stream&&localStorage.setItem("bg-"+this.parent.player.stream.id,this.background.id)}get_backgrounds(){return this.get_json(this.BACKGROUND_VIDEO_URL,this.handle_backgrounds)}start(){this.get_backgrounds().then(this.change.bind(this))}};PLAYER_EL_ID="player";PLAYER=class{STREAMS_URL="streams.json";SOURCES={"www.youtube.com":t};constructor(t){this.parent=t,this.player_el=t.player_el}get_json(t,s){return fetch(t).then((function(t){if(!t.ok)throw new Error("HTTP error, status = "+t.status);return t.json()}))}handle_streams(t){this.streams=t}random_choice(t){return t[Math.floor(Math.random()*t.length)]}random_stream(){return this.random_choice(this.streams)}change_stream(){this.stream=this.random_stream(),this.source&&this.source.destroy();const t=new URL(this.stream.url);this.source=new this.SOURCES[t.hostname](this.player_el,this.stream.url),this.source.setup(),localStorage.setItem("stream",this.stream.id)}pause(){this.source.stop()}play(){this.source.play()}toggle(){1!=this.source.state?0!=this.source.state||this.source.play():this.source.stop()}clear(){this.source&&this.source.destroy()}start(){this.get_json(this.STREAMS_URL,this.handle_streams).then(this.handle_streams.bind(this)).then(this.change_stream.bind(this)).then(this.play.bind(this))}};SHORTCUTS=class{KEY_MAP={Space:this.space};constructor(t){this.parent=t}setup(){const t=this;document.addEventListener("keypress",(s=>{s=s||window.event,this.KEY_MAP[s.code].call(t,s)}))}space(t){this.parent.player.toggle()}};#background_video;#background;#player_el;#player;#shortcuts;get background_video_el(){return this.#background_video||(this.#background_video=document.getElementById(this.BACKGROUND_VIDEO_EL_ID)),this.#background_video}get background(){return this.#background||(this.#background=new this.BACKGROUND(this)),this.#background}get player_el(){return this.#player_el||(this.#player_el=document.getElementById(this.PLAYER_EL_ID)),this.#player_el}get player(){return this.#player||(this.#player=new this.PLAYER(this)),this.#player}get shortcuts(){return this.#shortcuts||(this.#shortcuts=new this.SHORTCUTS(this)),this.#shortcuts}run(){this.shortcuts.setup(),this.player.start(),this.background.start()}},s.run()})();
//# sourceMappingURL=main.js.map