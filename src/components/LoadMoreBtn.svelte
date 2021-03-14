<style>
    /* https://codepen.io/kathykato/pen/rZRaNe */

    .load-more {
        position: relative;
        display: inline-block;
        cursor: pointer;
        outline: none;
        border: 0;
        vertical-align: middle;
        text-decoration: none;
        background: transparent;
        padding: 0;
        font-size: inherit;
        font-family: inherit;
        border-radius: 50px;
    }

    button.load-more {
        width: 12rem;
        height: auto;
    }

    button.load-more .circle {
        transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
        position: relative;
        display: block;
        margin: 0;
        width: 3rem;
        height: 3rem;
        border-radius: 1.625rem;
    }

    button.load-more .circle .icon {
        transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        background: #fff;
    }

    button.load-more .circle .icon.arrow {
        transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
        left: 0.625rem;
        width: 1.125rem;
        height: 0.125rem;
        background: none;
    }

    button.load-more .circle .icon.arrow::before {
        position: absolute;
        content: '';
        top: -0.25rem;
        right: 0.0625rem;
        width: 0.625rem;
        height: 0.625rem;
        border-top: 0.125rem solid #fff;
        border-right: 0.125rem solid #fff;
        transform: rotate(45deg);
    }

    button.load-more .button-text {
        transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 0.75rem 0;
        margin: 0 0 0 1.85rem;
        font-weight: 700;
        line-height: 1.6;
        text-align: center;
        text-transform: uppercase;
    }

    button.load-more:hover .circle,
    button.load-more:focus .circle {
        width: 100%;
    }

    button.load-more:hover .circle .icon.arrow,
    button.load-more:focus .circle .icon.arrow {
        background: #fff;
        transform: translate(1rem, 0);
    }

    button.load-more:hover .button-text,
    button.load-more:focus .button-text {
        color: #fff;
    }

    @supports (display: grid) {
        #load-more-container {
            grid-area: main;
            align-self: center;
            justify-self: center;
        }
    }
</style>

<div id="load-more-container">
    <button class="load-more focus:outline-none focus:ring-2 focus:ring-green-400" onclick="this.blur();">
        <span class="bg-gray-900 circle transform-gpu" aria-hidden="true">
            <span class="icon arrow"></span>
        </span>
        <span class="flex items-center justify-center text-sm text-gray-500 button-text">Load More</span>
    </button>
</div>