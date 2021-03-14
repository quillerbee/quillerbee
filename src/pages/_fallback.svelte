<script>
    /**
    * Taken from:
    * https://codepen.io/FilipVitas/pen/KRRRoY 
    */
    import { url, metatags } from "@roxi/routify";

    metatags.template("title", title => `Page Not Found - ${title}`);
</script>
<section class="absolute top-0 flex flex-col justify-around w-full p-10 pointer-events-none h-4/5">
    <div class="center transform-gpu">
        <div class="circle circle--outer"></div>
        <div class="circle circle--inner">
            <div class="four four--1">4</div>
            <div class="four four--2">4</div>
            <div class="circle oh">
                <div class="astronaut">
                    <div class="astronaut-backpack"></div>
                    <div class="astronaut-head"></div>
                    <div class="astronaut-antena antena--left">
                        <div class="ear-down"></div>
                        <div class="ear-up"></div>
                        <div class="antena"></div>
                        <div class="antena-tip"></div>
                    </div>
                    <div class="astronaut-antena antena--right">
                        <div class="ear-down"></div>
                        <div class="ear-up"></div>
                        <div class="antena"></div>
                        <div class="antena-tip"></div>
                    </div>
                    <div class="astronaut-helmet">
                        <div class="astronaut-glass"></div>
                        <div class="glow glow--1"></div>
                        <div class="glow glow--2"></div>
                    </div>
                    <div class="astronaut-body"></div>
                </div>
                <svg class="astronaut-wire" width="259" height="823">
                    <use xlink:href="symbol-defs.svg#astronaut-wire" />
                </svg>
                <div class="circle planet">
                    <div class="craters">
                        <div class="crater crater--1"></div>
                        <div class="crater crater--2"></div>
                        <div class="crater crater--3"></div>
                        <div class="crater crater--4"></div>
                        <div class="crater crater--5"></div>
                        <div class="crater crater--6"></div>
                    </div>
                </div>
                <div class="astronaut-hands">
                    <div class="astronaut-hand hand--left">
                        <svg>
                            <use xlink:href="symbol-defs.svg#astronaut-left-hand" />
                        </svg>
                    </div>
                    <div class="astronaut-hand hand--right">
                        <svg>
                            <use xlink:href="symbol-defs.svg#astronaugh-right-hand" />
                        </svg>
                    </div>
                </div>
            </div>
            <a use:$url href="/jobs" class="pointer-events-auto button">GO HOME</a>
        </div>
        <div class="sorry">Oops! Sorry, page not found.</div>
    </div>
</section>

<style>
    section {
        color: white;
    }

    .center {
        position: relative;
        top: 5%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.75);
        z-index: 1;
    }

    .center>.circle {
        background-color: rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(10px);
    }

    @media screen and (max-height: 600px) {
        .center {
            transform: translate(-50%, -50%) scale(0.75);
        }
    }

    @media screen and (max-width: 400px) {
        .center {
            transform: translate(-50%, -50%) scale(0.75);
        }
    }

    .circle {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
    }

    .circle--outer {
        width: 550px;
        height: 550px;
        box-shadow: 0px 0px 20px -8px #000;
    }

    .circle--inner {
        width: 355px;
        height: 355px;
        box-shadow: 0px 0px 20px -8px #000;
    }

    .four {
        position: absolute;
        font-size: 150px;
        font-weight: 900;
        text-shadow: 0px 2px 10px rgba(0, 0, 0, 0.5);
        user-select: none;
    }

    .four--1 {
        top: 100px;
        left: 30px;
        z-index: 1;
    }

    .four--2 {
        top: 100px;
        left: 230px;
        z-index: 3;
    }

    .astronaut {
        position: absolute;
        top: -115px;
        left: -30px;
        transform: rotate(17deg);
    }

    .astronaut .astronaut-backpack {
        width: 100px;
        height: 100px;
        background-color: #e3e3e3;
        border-radius: 10px;
    }

    .astronaut .antena--left {
        left: 10px;
    }

    .astronaut .antena--right {
        right: 10px;
    }

    .astronaut .astronaut-antena {
        position: absolute;
        top: -7px;
    }

    .astronaut .astronaut-antena .ear-down {
        position: absolute;
        bottom: -5px;
        width: 15px;
        height: 20px;
        border-radius: 5px;
        background-color: #afafaf;
        z-index: 1;
    }

    .astronaut .astronaut-antena .ear-up {
        position: relative;
        width: 15px;
        height: 20px;
        border-radius: 5px;
        background-color: #c3c3c3;
        z-index: 2;
    }

    .astronaut .astronaut-antena .antena {
        position: absolute;
        top: -29px;
        width: 2px;
        height: 30px;
        border-radius: 5px;
        background-color: #c3c3c3;
    }

    .astronaut .astronaut-antena .antena-tip {
        position: absolute;
        top: -33px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #c3c3c3;
    }

    .astronaut .antena--left .antena {
        left: 5px;
    }

    .astronaut .antena--right .antena {
        right: 5px;
    }

    .astronaut .antena--left .antena-tip {
        left: 3px;
    }

    .astronaut .antena--right .antena-tip {
        right: 3px;
    }

    .astronaut .astronaut-helmet {
        position: absolute;
        top: -30px;
        left: 50%;
        width: 66px;
        height: 66px;
        border-radius: 50%;
        background-color: #fff;
        box-shadow: 0px 5px 1px -3px #808080;
        transform: translateX(-50%);
        z-index: 3;
        overflow: hidden;
    }

    .astronaut .astronaut-glass {
        position: absolute;
        top: 13px;
        left: 5px;
        width: 56px;
        height: 56px;
        background: #00202e;
        border-radius: 10px;
    }

    .astronaut .glow {
        position: absolute;
        border-radius: 50%;
        background-color: #334d57;
    }

    .astronaut .glow--1 {
        top: 25px;
        left: 15px;
        width: 17px;
        height: 17px;
    }

    .astronaut .glow--2 {
        top: 44px;
        left: 13px;
        width: 7px;
        height: 7px;
    }

    .astronaut .astronaut-body {
        position: absolute;
        top: 30px;
        left: 50%;
        width: 50px;
        height: 50px;
        background-color: #c3c3c3;
        transform: translateX(-50%);
    }

    .astronaut-wire {
        position: absolute;
        top: -40px;
        left: -260px;
    }

    .astronaut-hands {
        position: absolute;
        top: -89px;
        left: -23px;
        width: 100px;
        transform: rotate(17deg);
        z-index: 3;
    }

    .astronaut-hands .astronaut-hand {
        position: absolute;
    }

    .astronaut-hands .hand--left {
        left: -3px;
    }

    .astronaut-hands .hand--right {
        transform: scaleX(-1);
        right: -3px;
    }

    .oh {
        transition: all 0.1s linear;
        animation: floating 4s linear infinite;
        z-index: 2;
    }

    .planet {
        background-color: #ff4980;
        box-shadow: inset -6px -10px 0px 1px #cc3b6b, 0px 2px 10px rgba(0, 0, 0, 0.4);
        width: 155px;
        height: 155px;
    }

    .craters .crater {
        position: absolute;
        border-radius: 50%;
        background-color: #c93667;
    }

    .craters .crater--1 {
        width: 35px;
        height: 35px;
        top: 30px;
        left: 25px;
    }

    .craters .crater--2 {
        width: 23px;
        height: 23px;
        top: 20px;
        left: 93px;
    }

    .craters .crater--3 {
        width: 17px;
        height: 17px;
        top: 77px;
        left: 17px;
    }

    .craters .crater--4 {
        width: 10px;
        height: 10px;
        top: 90px;
        left: 80px;
    }

    .craters .crater--5 {
        width: 25px;
        height: 25px;
        top: 115px;
        left: 50px;
    }

    .craters .crater--6 {
        width: 13px;
        height: 13px;
        top: 118px;
        left: 105px;
    }

    .button {
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        padding: 8px 12px;
        border: 1px solid #fff;
        border-radius: 3px;
        cursor: pointer;
        z-index: 999;
    }

    .button:active {
        transform: translateX(-50%) scale(0.95);
    }

    .sorry {
        position: absolute;
        top: 210px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 15px;
    }

    @-moz-keyframes floating {

        0%,
        100% {
            transform: translate(2px, 3px) rotate(1deg);
        }

        20% {
            transform: translate(3px, -2px) rotate(2deg);
        }

        40% {
            transform: translate(-1px, 0px) rotate(-1deg);
        }

        60% {
            transform: translate(-3px, -3px) rotate(2deg);
        }

        80% {
            transform: translate(-2px, 1px) rotate(1deg);
        }
    }

    @-webkit-keyframes floating {

        0%,
        100% {
            transform: translate(2px, 3px) rotate(1deg);
        }

        20% {
            transform: translate(3px, -2px) rotate(2deg);
        }

        40% {
            transform: translate(-1px, 0px) rotate(-1deg);
        }

        60% {
            transform: translate(-3px, -3px) rotate(2deg);
        }

        80% {
            transform: translate(-2px, 1px) rotate(1deg);
        }
    }

    @-o-keyframes floating {

        0%,
        100% {
            transform: translate(2px, 3px) rotate(1deg);
        }

        20% {
            transform: translate(3px, -2px) rotate(2deg);
        }

        40% {
            transform: translate(-1px, 0px) rotate(-1deg);
        }

        60% {
            transform: translate(-3px, -3px) rotate(2deg);
        }

        80% {
            transform: translate(-2px, 1px) rotate(1deg);
        }
    }

    @keyframes floating {

        0%,
        100% {
            transform: translate(2px, 3px) rotate(1deg);
        }

        20% {
            transform: translate(3px, -2px) rotate(2deg);
        }

        40% {
            transform: translate(-1px, 0px) rotate(-1deg);
        }

        60% {
            transform: translate(-3px, -3px) rotate(2deg);
        }

        80% {
            transform: translate(-2px, 1px) rotate(1deg);
        }
    }
</style>