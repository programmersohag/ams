<template>
    <div style="width:75px;">
              <svg viewBox="0 0 250 200" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <defs>
                  <g id="cube" class="cube-unit">
                    <rect width="21" height="24" class="cube-part-left" transform="skewY(30)"/>
                    <rect width="21" height="24" class="cube-part-right" transform="skewY(-30) translate(21 24.3)"/>
                    <rect width="21" height="21" class="cube-part-top" transform="scale(1.41,.81) rotate(45) translate(0 -21)"/>
                  </g>
                </defs>
                <g transform="translate(-80 0)">
                  <use xlink:href="#cube" x="121" y="112" class="cube cube-1 invisible"/>
                <use xlink:href="#cube" x="100" y="124" class="cube cube-2 invisible"/>
                <use xlink:href="#cube" x="142" y="124" class="cube cube-3 invisible"/>
                <use xlink:href="#cube" x="121" y="136" class="cube cube-4 invisible"/>
            
                <use xlink:href="#cube" x="79" y="136" class="cube cube-5 invisible"/>
                <use xlink:href="#cube" x="163" y="136" class="cube cube-6 invisible"/>
                <use xlink:href="#cube" x="142" y="148" class="cube cube-7 invisible"/>
                <use xlink:href="#cube" x="100" y="148" class="cube cube-8 invisible"/>
                <use xlink:href="#cube" x="121" y="160" class="cube cube-9 invisible"/>
                
                <use xlink:href="#cube" x="121" y="88" class="cube cube-10 invisible"/>
                <use xlink:href="#cube" x="100" y="100" class="cube cube-11 invisible"/>
                <use xlink:href="#cube" x="142" y="100" class="cube cube-12 invisible"/>
                <use xlink:href="#cube" x="121" y="112" class="cube cube-13 invisible"/>
                
                <use xlink:href="#cube" x="79" y="112" class="cube cube-14 invisible"/>
                <use xlink:href="#cube" x="163" y="112" class="cube cube-15 invisible"/>
                <use xlink:href="#cube" x="142" y="124" class="cube cube-16 invisible"/>
                <use xlink:href="#cube" x="100" y="124" class="cube cube-17 invisible"/>
                <use xlink:href="#cube" x="121" y="136" class="cube cube-18 invisible"/>
                <use xlink:href="#cube" x="121" y="64" class="cube cube-19 invisible"/>
                <use xlink:href="#cube" x="100" y="76" class="cube cube-20 invisible"/>
                <use xlink:href="#cube" x="142" y="76" class="cube cube-21 invisible"/>
                <use xlink:href="#cube" x="121" y="88" class="cube cube-22 invisible"/>
                <use xlink:href="#cube" x="79" y="88" class="cube cube-23 invisible"/>
                <use xlink:href="#cube" x="163" y="88" class="cube cube-24 invisible"/>
                <use xlink:href="#cube" x="142" y="100" class="cube cube-25 invisible"/>
                <use xlink:href="#cube" x="100" y="100" class="cube cube-26 invisible"/>
                <use xlink:href="#cube" x="121" y="112" class="cube cube-27 invisible"/>
                
                <path transform="translate(45 40) skewY(30) scale(0.5 0.5)" class="cube cube-28 cube-text invisible" 
                  d="M158,196.1c-8.3,0-14.1-2.9-17.2-8.5l-28-51v48.7c0,2.5-0.9,5.9-5.3,8.3c-3,1.6-6.6,2.5-10.7,2.5
                  c-4.1,0-7.7-0.8-10.7-2.5c-4.3-2.4-5.3-5.8-5.3-8.3V76.1c0-2.5,0.9-5.9,5.3-8.3c3-1.6,6.6-2.5,10.7-2.5c5.7,0,9.8,0.8,12.7,2.6
                  c2.9,1.8,5.9,5.7,9.3,12.2l23.1,44.1V75.9c0-2.5,0.9-6,5.3-8.2c3-1.6,6.6-2.3,10.6-2.3c4.1,0,7.6,0.8,10.6,2.3
                  c4.4,2.3,5.3,5.7,5.3,8.2v109.4c0,2.5-0.9,5.9-5.3,8.3C165.7,195.2,162.1,196.1,158,196.1z "/>
                  <!-- M110.4,124.3c0.9,0,1.7,0.5,2.2,1.3
                  l32.7,59.5c2.2,4,6.4,5.9,12.8,5.9c3.2,0,6-0.6,8.3-1.8c2.3-1.3,2.7-2.8,2.7-3.9V75.9c0-1.1-0.3-2.6-2.6-3.8
                  c-2.3-1.2-5.1-1.8-8.3-1.8c-3.2,0-6,0.6-8.3,1.8c-2.3,1.2-2.6,2.7-2.6,3.8v58.5c0,1.2-0.8,2.2-1.9,2.4c-1.1,0.3-2.3-0.2-2.8-1.3
                  l-27.9-53.1c-3.6-6.9-6-9.3-7.4-10.2c-2.1-1.2-5.5-1.9-10.1-1.9c-3.2,0-6,0.6-8.3,1.8c-2.3,1.3-2.7,2.8-2.7,3.9v109.2
                  c0,1.2,0.3,2.6,2.6,3.9c2.3,1.2,5,1.8,8.3,1.8c3.2,0,6-0.6,8.3-1.8c2.3-1.3,2.6-2.8,2.6-3.9v-58.5c0-1.1,0.8-2.1,1.9-2.4
                  C110,124.3,110.2,124.3,110.4,124.3z"/> -->
                  
                <path transform="translate(140 25) scale(0.6 0.336) rotate(45)" class="cube cube-29 cube-text invisible" 
                  d="M159,197.1c-4.2,0-7-1.4-8.5-4l-22.9-39l-23,39c-1.7,2.7-4.5,4-8.5,4c-4.5,0-9-1.5-13.4-4.5
                  c-4.7-3.2-7-7-7-11.3c0-1.9,0.6-4,1.9-6.1l28.9-44.7L78.8,86.2c-1.4-2.2-2.1-4.5-2.1-6.7c0-4.3,2.3-8,6.8-11
                  c4.2-2.8,8.6-4.2,13.1-4.2c4.7,0,8.2,2,10.3,5.8l20.7,36.1L148.2,70c2-3.7,5.6-5.7,10.3-5.7c4.5,0,8.9,1.4,13.1,4.2
                  c4.5,3,6.8,6.7,6.8,11c0,2.2-0.7,4.4-2.1,6.7l-27.7,44.4l28.9,44.6c1.3,2.2,2,4.2,2,6.2c0,4.3-2.4,8.1-7,11.3
                  C168,195.6,163.5,197.1,159,197.1z "/>
                  <!-- M127.5,146.7c0.9,0,1.7,0.5,2.2,1.2l25.1,42.7c0.6,1,2,1.5,4.2,1.5c3.5,0,7-1.2,10.5-3.6
                  c3.3-2.2,4.8-4.6,4.8-7.1c0-1-0.4-2.2-1.2-3.5L143.5,132c-0.5-0.8-0.5-1.9,0-2.7L172,83.5c0.9-1.4,1.3-2.8,1.3-4
                  c0-2.6-1.5-4.8-4.6-6.9c-3.4-2.2-6.8-3.4-10.3-3.4c-2.9,0-4.7,1-5.9,3.2l-22.9,40c-0.4,0.8-1.3,1.3-2.2,1.3c-0.9,0-1.7-0.5-2.2-1.3
                  l-22.9-39.9c-1.2-2.2-3.1-3.2-5.9-3.2c-3.5,0-6.9,1.1-10.3,3.4c-3.1,2-4.6,4.3-4.6,6.9c0,1.2,0.5,2.6,1.3,4l28.6,45.8
                  c0.5,0.8,0.5,1.9,0,2.7l-29.8,45.9c-0.7,1.2-1.1,2.4-1.1,3.5c0,2.6,1.6,4.9,4.8,7.1c3.5,2.4,7.1,3.6,10.5,3.6c3.3,0,4-1.2,4.2-1.6
                  l25.1-42.6C125.8,147.1,126.6,146.7,127.5,146.7z"/> -->
                
                  <path transform="translate(110 115) skewY(-30) scale(0.5 0.5)" class="cube cube-30 cube-text invisible" 
                    d="M127.5,196.1c-4.1,0-7.7-0.8-10.7-2.5c-4.3-2.4-5.3-5.8-5.3-8.3V93.7H90.3c-3.4,0-6.2-1.6-8.1-4.6
                    c-1.7-2.7-2.5-6-2.5-9.8c0-3.6,0.8-6.7,2.4-9.4c1.8-3,4.6-4.6,8.2-4.6h74.3c3.5,0,6.3,1.6,8.2,4.6c1.6,2.7,2.4,5.8,2.4,9.4
                    c0,3.8-0.9,7.1-2.5,9.8c-1.9,3-4.7,4.6-8.1,4.6h-21.2v91.5c0,2.5-0.9,6-5.3,8.3C135.2,195.2,131.6,196.1,127.5,196.1z "/>
                    <!-- M90.3,70.3c-1.8,0-3,0.7-3.9,2.2c-1.1,1.9-1.7,4.1-1.7,6.8c0,2.9,0.6,5.2,1.8,7.1c1,1.6,2.2,2.3,3.8,2.3h23.7c1.4,0,2.5,1.1,2.5,2.5v94
                    c0,1.2,0.3,2.7,2.7,4c2.3,1.2,5,1.9,8.3,1.9c3.2,0,6-0.6,8.3-1.9c2.4-1.3,2.7-2.8,2.7-4v-94c0-1.4,1.1-2.5,2.5-2.5h23.7
                    c1.7,0,2.8-0.7,3.8-2.3c1.2-1.9,1.8-4.3,1.8-7.1c0-2.7-0.6-4.9-1.7-6.8c-0.9-1.5-2.1-2.2-3.9-2.2H90.3z"/> -->
                </g>
                
              </svg>
            </div>
</template>
<script>
export default {
    name:"SvgIcon"
}
</script>
<style scoped>
    .text-features{
  vertical-align: bottom;
  font-size: 24pt;
  font-weight: bold;
}
.text-features p {
  display: inline-block;
  vertical-align: top;
  margin: 0;
}
.text-tagline{
  vertical-align: top;
  font-size: 8pt;
}
.text-tagline p{
  display: inline-block;
  vertical-align: top;
  margin: 0;
}
.svg-container{
  vertical-align: bottom;
}
.logo{
  max-width: 75px;
  margin-right: 7px;
}
.word {
  position: absolute;
  width: 400px;
  opacity: 0;
}

.letter {
  display: inline-block;
  position: relative;
  transform: translateZ(25px);
  transform-origin: 50% 50% 25px;
}

.letter.out {
  transform: rotateX(-90deg);
  transition: transform 0.32s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

.letter.behind { transform: rotateX(90deg); }

.letter.in {
  transform: rotateX(0deg);
  transition: transform 0.38s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.blue { color: #0e6caf; }
.yellow { color: #f7a31b; }
.green { color: #72bd43; }
.red { color: #ed1c24; }
.black { color: black; }

.rotate{
  animation: spin infinite 2s linear forwards;
}
@keyframes spin {
     from {
         transform: rotate(360deg);
    }
     to {
         transform: rotate(0deg);
    }
}



/* Cube */
.cube-unit {
  stroke-miterlimit:0;
}
.cube-part-left{
  /* fill:#00affa; */
  fill:#717070;
}
.cube-part-right{
  /* fill:#008bc7; */
  fill:#000000;
  fill-opacity: 1;
}
.cube-part-top{
  /* fill:#009CDE; */
  fill:#504f4f;
}
path{
  fill:white;
  stroke:white;
}

div.logo {
    margin-top: 32.5px;
}
div.logo img {width: 252px;height: 65px;}
div.service-name{
    margin-top: 30px;
    margin-bottom: 20px;
}
div.service-name h1{
    font-family: "Muli";
    font-style: normal;
    font-weight: 600;
    font-size: 31px;
    line-height: 39px;
    color: #2D58A7;
     position: relative;
    display: inline-block; 
    padding-bottom: 11px;
}
div.service-name h1:before{
    position: absolute;
    height: 3px;
    width: 50%;
    left: 0;
    bottom: 0;
    background: blue;
    display: block;
    content: "";
}
</style>
