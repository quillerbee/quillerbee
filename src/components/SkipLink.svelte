<style>
    .skip-link {
        color: #fff;
        font-weight: 700;
        position: absolute;
        z-index: 2;
        top: -148px;
        left: 0;
        padding: 65px 16px 0;
        transform: translateY(-125%);
        pointer-events: all;
    }

    .skip-link {
        transform: translateY(-125%);
        transition: transform 0.3s;
    }

    .skip-link:focus-within {
        transform: translateY(80%);
    }

    .skip-to-content-link:focus {
        transform: translateY(80%);
    }
</style>

<div class="skip-link">
    <div class="mb-2">Skip to</div>
    <a href="#main" class="focus:outline-none">Content</a>
    or
    <a href="#footer" class="focus:outline-none">Footer</a>
    <div class="ribbon banner transform-gpu" />
</div>