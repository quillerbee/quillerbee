<script>
    import { url, metatags } from "@roxi/routify";
    import { Loader, LoadMoreBtn } from "components";

    metatags.template("title", title => `Jobs - ${title}`);
</script>

<style>
    /* https://www.cssportal.com/css-ribbon-generator/ */

    .ribbon.top-left {
        position: absolute;
        left: -5px;
        top: -5px;
        z-index: 1;
        overflow: hidden;
        width: 75px;
        height: 75px;
        text-align: right;
    }

    .ribbon.top-left span {
        font-size: 10px;
        font-weight: bold;
        color: #FFF;
        text-transform: uppercase;
        text-align: center;
        line-height: 20px;
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
        width: 100px;
        display: block;
        background: #79A70A;
        background: linear-gradient(#9BC90D 0%, #79A70A 100%);
        box-shadow: 0 3px 10px -5px rgba(0, 0, 0, 1);
        position: absolute;
        top: 19px;
        left: -21px;
    }

    .ribbon.top-left span::before {
        content: "";
        position: absolute;
        left: 0px;
        top: 100%;
        z-index: -1;
        border-left: 3px solid #79A70A;
        border-right: 3px solid transparent;
        border-bottom: 3px solid transparent;
        border-top: 3px solid #79A70A;
    }

    .ribbon.top-left span::after {
        content: "";
        position: absolute;
        right: 0px;
        top: 100%;
        z-index: -1;
        border-left: 3px solid transparent;
        border-right: 3px solid #79A70A;
        border-bottom: 3px solid transparent;
        border-top: 3px solid #79A70A;
    }

    /* https://codepen.io/crayon-code/pen/vYXpmPB */

    .bookmark {
        width: 37px;
        height: 36px;
    }

    .bookmark:hover .ribbon.up>.content,
    .bookmark:focus .ribbon.up>.content {
        height: 70px;
    }

    .bookmark:hover .ribbon.up,
    .bookmark:focus .ribbon.up {
        top: -20px;
    }

    .ribbon.up {
        position: absolute;
        z-index: 1;
        top: 0;
        right: 5px;
        filter: drop-shadow(2px 3px 2px rgba(0, 0, 0, 0.5));
    }

    .ribbon>.content {
        color: white;
        font-size: 1.25rem;
        text-align: center;
        font-weight: 400;
        background: var(--color, #2ca7d8) linear-gradient(45deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.25) 100%);
        padding: 25px 2px 4px;
        clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 100%, 0 100%);
        width: 28px;
        transition: clip-path 1s, padding 1s, background 1s;
    }

    .ribbon.up>.content {
        height: 35px;
        clip-path: polygon(0 0, 100% 0, 100% 100%, 50% calc(100% - 8px), 0 100%);
    }

    .ribbon.up,
    .ribbon.up>.content {
        -webkit-transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
        -moz-transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
        -o-transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
        transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
    }

    .w-logo {
        min-width: 75px;
        width: 75px;
        max-width: 75px;
    }

    .h-logo {
        min-height: 75px;
        height: 75px;
        max-height: 75px;
    }
</style>

<div class="flex flex-col w-11/12 m-10 mb-10 items-left lg:ml-0 sm:w-10/12 md:w-9/12 lg:w-8/12">
    <h2 class="inline-flex w-auto mb-6 text-xl font-bold text-left text-white">
        <a href="https://www.quillerbee.com/" class="focus:outline-none">Software Development (3)</a>
    </h2>
    <section
        class="relative flex flex-col pb-0 mb-6 transition-shadow duration-300 ease-in-out bg-gray-900 rounded-lg hover:shadow-lg">
        <div class="ribbon top-left"><span>popular</span></div>
        <div class="flex items-start justify-between mb-5">
            <div class="flex p-5">
                <div
                    class="flex items-center justify-center text-4xl font-bold text-center text-gray-900 bg-pink-400 rounded-full w-logo h-logo">
                    D
                </div>
                <div class="flex flex-col ml-4 text-left">
                    <div class="mb-1">
                        <div class="relative flex items-center">
                            <div class="mr-2 text-gray-300 truncate">
                                Frontend Engineer
                            </div>
                        </div>
                        <div class="flex items-center text-xs text-gray-400">
                            Dgraph
                            <div class="flex ml-2 text-gray-400">
                                <svg class="mr-1 fill-current inline-inline-block" width="15" height="15"
                                    fill="currentColor">
                                    <use xlink:href="#users" />
                                </svg>
                                51 - 200
                            </div>
                        </div>
                    </div>
                    <div class="flex text-xs font-semibold text-green-800">
                        <button onclick="this.blur();"
                            class="px-2 py-1 mr-2 font-medium text-center bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 w-max rounded-2xl hover:shadow-lg focus:shadow-lg">
                            Full Time
                        </button>
                        <button onclick="this.blur();"
                            class="px-2 py-1 mr-2 font-medium text-center bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-400 w-max rounded-2xl hover:shadow-lg focus:shadow-lg">
                            Remote
                        </button>
                    </div>
                </div>
            </div>
            <div class="flex pt-4 pr-5 text-gray-500">
                <button onclick="this.blur();"
                    class="bookmark relative top-0 left-0 focus:outline-none p-1.5 mr-1 rounded-full transform-gpu">
                    <div class="ribbon up" style="--color: #911750;">
                        <div class="content">
                        </div>
                    </div>
                </button>

                <button onclick="this.blur();"
                    class="focus:outline-none focus:ring-2 focus:ring-indigo-400 p-1.5 rounded-full hover:bg-indigo-200">
                    <svg width="24" height="24">
                        <use xlink:href="#chevron-down" />
                    </svg>
                </button>
            </div>
        </div>
        <div class="flex justify-between px-5 py-2 text-gray-500 border-t border-gray-800 border-solid">
            <div class="flex items-center justify-between w-full text-xs">
                <div class="flex">
                    <div class="flex items-center mr-3">
                        <svg class="mr-1 mb-0.5" width="15" height="15">
                            <use xlink:href="#briefcase" />
                        </svg>
                        3
                    </div>
                    <div class="flex items-center justify-center mr-2">
                        <svg class="mr-0.5" width="15" height="15">
                            <use xlink:href="#hashtag" />
                        </svg>
                        <a class="focus:outline-none hover:text-gray-300 focus:text-gray-300"
                            href="https://www.quillerbee.com/">
                            JavaScript
                        </a>
                    </div>
                    <div class="flex items-center justify-center mr-2">
                        <svg class="mr-0.5" width="15" height="15">
                            <use xlink:href="#hashtag" />
                        </svg>
                        <a class="focus:outline-none hover:text-gray-300 focus:text-gray-300"
                            href="https://www.quillerbee.com/">
                            Svelte
                        </a>
                    </div>
                </div>
                <div class="items-center hidden mr-3 sm:flex">
                    <span class="text-gray-500">$</span>24k -
                    <span class="ml-1 text-gray-500">$</span>40k
                </div>
            </div>
            <div class="flex">
                <button onclick="this.blur();"
                    class="focus:outline-none focus:ring-2 focus:ring-purple-400 p-1.5 mr-1 rounded-full cursor-pointer hover:bg-purple-200">
                    <svg width="24" height="24">
                        <use xlink:href="#flag" />
                    </svg>
                </button>
                <button onclick="this.blur();"
                    class="focus:outline-none focus:ring-2 focus:ring-red-400 p-1.5 rounded-full cursor-pointer hover:bg-red-200">
                    <svg width="24" height="24">
                        <use xlink:href="#eye" />
                    </svg>
                </button>
            </div>
        </div>
    </section>
    <section
        class="relative flex flex-col pb-0 mb-6 transition-shadow duration-300 ease-in-out bg-gray-900 rounded-lg hover:shadow-lg">
        <div class="flex items-start justify-between mb-5">
            <div class="flex p-5">
                <div class="bg-gray-700 rounded-full w-logo h-logo animate-pulse"></div>
                <div class="flex flex-col ml-4 text-left">
                    <div>
                        <div class="w-42 mb-0.5 h-5 mr-2 bg-gray-700 rounded animate-pulse"></div>
                        <div>
                            <div class="inline-block w-16 h-4 bg-gray-700 rounded animate-pulse"></div>
                            <div class="inline-block w-20 h-4 bg-gray-700 rounded animate-pulse"></div>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="w-20 mr-2 bg-gray-700 h-7 rounded-2xl animate-pulse"></div>
                        <div class="w-20 mr-2 bg-gray-700 h-7 rounded-2xl animate-pulse"></div>
                    </div>
                </div>
            </div>
            <div class="flex pt-4 pr-5">
                <div class="w-8 h-8 mr-1 bg-gray-700 rounded-full animate-pulse"></div>
                <div class="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
            </div>
        </div>
        <div class="flex justify-between px-5 py-2 border-t border-gray-800">
            <div class="flex items-center justify-between w-full text-xs">
                <div class="flex items-center">
                    <div class="flex items-center w-8 h-8 mr-3 bg-gray-700 rounded-full animate-pulse"></div>
                    <div class="flex items-center justify-center w-20 h-5 mr-2 bg-gray-700 rounded animate-pulse">
                    </div>
                    <div class="flex items-center justify-center w-20 h-5 mr-2 bg-gray-700 rounded animate-pulse">
                    </div>
                </div>
                <div class="items-center hidden mr-3 sm:flex">
                    <div class="w-24 h-5 bg-gray-700 rounded animate-pulse"></div>
                </div>
            </div>
            <div class="flex">
                <div class="w-8 h-8 mr-1 bg-gray-700 rounded-full animate-pulse"></div>
                <div class="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
            </div>
        </div>
    </section>
    <section
        class="relative flex flex-col pb-0 mb-6 transition-shadow duration-300 ease-in-out bg-gray-900 rounded-lg hover:shadow-lg">
        <div class="flex justify-end px-5 py-2 text-gray-500 border-t border-gray-800 border-solid">
            <button onclick="this.blur();"
                class="focus:outline-none focus:ring-2 focus:ring-red-400 p-1.5 rounded-full cursor-pointer hover:bg-red-200">
                <svg width="24" height="24">
                    <use xlink:href="#eye-off" />
                </svg>
            </button>
        </div>
    </section>
    <section
        class="relative flex flex-col pb-0 mb-6 transition-shadow duration-300 ease-in-out rounded-lg bg-yellow-50 hover:shadow-lg">
        <div class="ribbon top-left"><span>featured</span></div>
        <div class="flex items-start justify-between mb-5">
            <div class="flex p-5">
                <div
                    class="flex items-center justify-center text-4xl font-bold text-center text-white bg-pink-400 rounded-full w-logo h-logo">
                    D
                </div>
                <div class="flex flex-col ml-4 text-left">
                    <div class="mb-1">
                        <div class="relative flex items-center">
                            <div class="mr-2 truncate">
                                Frontend Engineer
                            </div>
                        </div>
                        <div class="flex items-center text-xs text-gray-600">
                            Dgraph
                            <div class="flex ml-2 text-gray-500">
                                <svg class="mr-1 fill-current inline-inline-block" width="15" height="15"
                                    fill="currentColor">
                                    <use xlink:href="#users" />
                                </svg>
                                51 - 200
                            </div>
                        </div>
                    </div>
                    <div class="flex text-xs font-semibold text-green-800">
                        <button onclick="this.blur();"
                            class="px-2 py-1 mr-2 font-medium text-center bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 w-max rounded-2xl hover:shadow-lg focus:shadow-lg">
                            Full Time
                        </button>
                        <button onclick="this.blur();"
                            class="px-2 py-1 mr-2 font-medium text-center bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-400 w-max rounded-2xl hover:shadow-lg focus:shadow-lg">
                            Remote
                        </button>
                    </div>
                </div>
            </div>
            <div class="flex pt-4 pr-5 text-gray-500">
                <button onclick="this.blur();"
                    class="bookmark relative top-0 left-0 focus:outline-none p-1.5 mr-1 rounded-full transform-gpu">
                    <div class="ribbon up" style="--color: #911750;">
                        <div class="content">
                        </div>
                    </div>
                </button>
                <button onclick="this.blur();"
                    class="focus:outline-none focus:ring-2 focus:ring-indigo-400 p-1.5 rounded-full hover:bg-indigo-200">
                    <svg width="24" height="24">
                        <use xlink:href="#chevron-down" />
                    </svg>
                </button>
            </div>
        </div>
        <div class="flex justify-between px-5 py-2 text-gray-500 border-t border-gray-200 border-solid">
            <div class="flex items-center justify-between w-full text-xs">
                <div class="flex">
                    <div class="flex items-center mr-3">
                        <svg class="mr-1 mb-0.5" width="15" height="15">
                            <use xlink:href="#briefcase" />
                        </svg>
                        3
                    </div>
                    <div class="flex items-center justify-center mr-2">
                        <svg class="mr-0.5" width="15" height="15">
                            <use xlink:href="#hashtag" />
                        </svg>
                        <a class="focus:outline-none hover:text-gray-700 focus:text-gray-700"
                            href="https://www.quillerbee.com/">
                            JavaScript
                        </a>
                    </div>
                    <div class="flex items-center justify-center mr-2">
                        <svg class="mr-0.5" width="15" height="15">
                            <use xlink:href="#hashtag" />
                        </svg>
                        <a class="focus:outline-none hover:text-gray-700 focus:text-gray-700"
                            href="https://www.quillerbee.com/">
                            Svelte
                        </a>
                    </div>
                </div>
                <div class="items-center hidden mr-3 sm:flex">
                    <span class="text-gray-500">$</span>24k -
                    <span class="ml-1 text-gray-500">$</span>40k
                </div>
            </div>
            <div class="flex">
                <button onclick="this.blur();"
                    class="focus:outline-none focus:ring-2 focus:ring-purple-400 p-1.5 mr-1 rounded-full cursor-pointer hover:bg-purple-200">
                    <svg width="24" height="24">
                        <use xlink:href="#flag" />
                    </svg>
                </button>
                <button onclick="this.blur();"
                    class="focus:outline-none focus:ring-2 focus:ring-red-400 p-1.5 rounded-full cursor-pointer hover:bg-red-200">
                    <svg width="24" height="24">
                        <use xlink:href="#eye" />
                    </svg>
                </button>
            </div>
        </div>
    </section>
    <h2 class="inline-flex w-auto my-6 text-xl font-bold text-left text-white">
        <a href="https://www.quillerbee.com/" class="focus:outline-none">Game Development (1)</a>
    </h2>
    <section
        class="relative flex flex-col pb-0 mb-6 transition-shadow duration-300 ease-in-out bg-gray-900 rounded-lg hover:shadow-lg">
        <div class="ribbon top-left"><span>urgent</span></div>
        <div class="flex items-start justify-between mb-5">
            <div class="flex p-5">
                <div
                    class="flex items-center justify-center text-4xl font-bold text-center text-gray-900 bg-pink-400 rounded-full w-logo h-logo">
                    D
                </div>
                <div class="flex flex-col ml-4 text-left">
                    <div class="mb-1">
                        <div class="relative flex items-center">
                            <div class="mr-2 text-gray-300 truncate">
                                Frontend Engineer
                            </div>
                        </div>
                        <div class="flex items-center text-xs text-gray-400">
                            Dgraph
                            <div class="flex ml-2 text-gray-400">
                                <svg class="mr-1 fill-current inline-inline-block" width="15" height="15"
                                    fill="currentColor">
                                    <use xlink:href="#users" />
                                </svg>
                                51 - 200
                            </div>
                        </div>
                    </div>
                    <div class="flex text-xs font-semibold text-green-800">
                        <button onclick="this.blur();"
                            class="px-2 py-1 mr-2 font-medium text-center bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 w-max rounded-2xl hover:shadow-lg focus:shadow-lg">
                            Full Time
                        </button>
                        <button onclick="this.blur();"
                            class="px-2 py-1 mr-2 font-medium text-center bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-400 w-max rounded-2xl hover:shadow-lg focus:shadow-lg">
                            Remote
                        </button>
                    </div>
                </div>
            </div>
            <div class="flex pt-4 pr-5 text-gray-500">
                <button onclick="this.blur();"
                    class="bookmark relative top-0 left-0 focus:outline-none p-1.5 mr-1 rounded-full transform-gpu">
                    <div class="ribbon up" style="--color: #911750;">
                        <div class="content">
                        </div>
                    </div>
                </button>

                <button onclick="this.blur();"
                    class="focus:outline-none focus:ring-2 focus:ring-indigo-400 p-1.5 rounded-full hover:bg-indigo-200">
                    <svg width="24" height="24">
                        <use xlink:href="#chevron-down" />
                    </svg>
                </button>
            </div>
        </div>
        <div class="flex justify-between px-5 py-2 text-gray-500 border-t border-gray-800 border-solid">
            <div class="flex items-center justify-between w-full text-xs">
                <div class="flex">
                    <div class="flex items-center mr-3">
                        <svg class="mr-1 mb-0.5" width="15" height="15">
                            <use xlink:href="#briefcase" />
                        </svg>
                        3
                    </div>
                    <div class="flex items-center justify-center mr-2">
                        <svg class="mr-0.5" width="15" height="15">
                            <use xlink:href="#hashtag" />
                        </svg>
                        <a class="focus:outline-none hover:text-gray-300 focus:text-gray-300"
                            href="https://www.quillerbee.com/">
                            JavaScript
                        </a>
                    </div>
                    <div class="flex items-center justify-center mr-2">
                        <svg class="mr-0.5" width="15" height="15">
                            <use xlink:href="#hashtag" />
                        </svg>
                        <a class="focus:outline-none hover:text-gray-300 focus:text-gray-300"
                            href="https://www.quillerbee.com/">
                            Svelte
                        </a>
                    </div>
                </div>
                <div class="items-center hidden mr-3 sm:flex">
                    <span class="text-gray-500">$</span>24k -
                    <span class="ml-1 text-gray-500">$</span>40k
                </div>
            </div>
            <div class="flex">
                <button onclick="this.blur();"
                    class="focus:outline-none focus:ring-2 focus:ring-purple-400 p-1.5 mr-1 rounded-full cursor-pointer hover:bg-purple-200">
                    <svg width="24" height="24">
                        <use xlink:href="#flag" />
                    </svg>
                </button>
                <button onclick="this.blur();"
                    class="focus:outline-none focus:ring-2 focus:ring-red-400 p-1.5 rounded-full cursor-pointer hover:bg-red-200">
                    <svg width="24" height="24">
                        <use xlink:href="#eye" />
                    </svg>
                </button>
            </div>
        </div>
    </section>
    <LoadMoreBtn />
    <Loader />
</div>