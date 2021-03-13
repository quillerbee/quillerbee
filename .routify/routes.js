
/**
 * @roxi/routify 2.14.0
 * File generated Sat Mar 13 2021 12:26:29 GMT+0530 (India Standard Time)
 */

export const __version = "2.14.0"
export const __timestamp = "2021-03-13T06:56:29.504Z"

//buildRoutes
import { buildClientTree } from "@roxi/routify/runtime/buildRoutes"

//imports


//options
export const options = {}

//tree
export const _tree = {
  "root": true,
  "children": [
    {
      "isFallback": true,
      "path": "/_fallback",
      "component": () => import('../src/pages/_fallback.svelte').then(m => m.default)
    },
    {
      "isDir": true,
      "children": [
        {
          "isIndex": true,
          "isPage": true,
          "path": "/admin/index",
          "id": "_admin_index",
          "component": () => import('../src/pages/admin/index.svelte').then(m => m.default)
        }
      ],
      "isLayout": true,
      "path": "/admin",
      "id": "_admin__folder",
      "component": () => import('../src/pages/admin/_folder.svelte').then(m => m.default)
    },
    {
      "isDir": true,
      "children": [
        {
          "isPage": true,
          "path": "/company/about-us",
          "id": "_company_aboutUs",
          "component": () => import('../src/pages/company/about-us.svelte').then(m => m.default)
        },
        {
          "isPage": true,
          "path": "/company/media-kit",
          "id": "_company_mediaKit",
          "component": () => import('../src/pages/company/media-kit.svelte').then(m => m.default)
        },
        {
          "isPage": true,
          "path": "/company/pitch-deck",
          "id": "_company_pitchDeck",
          "component": () => import('../src/pages/company/pitch-deck.svelte').then(m => m.default)
        }
      ],
      "isLayout": true,
      "path": "/company",
      "id": "_company__folder",
      "component": () => import('../src/pages/company/_folder.svelte').then(m => m.default)
    },
    {
      "isIndex": true,
      "isPage": true,
      "path": "/index",
      "id": "_index",
      "component": () => import('../src/pages/index.svelte').then(m => m.default)
    },
    {
      "isDir": true,
      "children": [
        {
          "isIndex": true,
          "isPage": true,
          "path": "/jobs/index",
          "id": "_jobs_index",
          "component": () => import('../src/pages/jobs/index.svelte').then(m => m.default)
        }
      ],
      "isLayout": true,
      "path": "/jobs",
      "id": "_jobs__folder",
      "component": () => import('../src/pages/jobs/_folder.svelte').then(m => m.default)
    },
    {
      "isDir": true,
      "children": [
        {
          "isPage": true,
          "path": "/legal/cookie-policy",
          "id": "_legal_cookiePolicy",
          "component": () => import('../src/pages/legal/cookie-policy.svelte').then(m => m.default)
        },
        {
          "isPage": true,
          "path": "/legal/disclaimer",
          "id": "_legal_disclaimer",
          "component": () => import('../src/pages/legal/disclaimer.svelte').then(m => m.default)
        },
        {
          "isPage": true,
          "path": "/legal/privacy-policy",
          "id": "_legal_privacyPolicy",
          "component": () => import('../src/pages/legal/privacy-policy.svelte').then(m => m.default)
        },
        {
          "isPage": true,
          "path": "/legal/terms-and-conditions",
          "id": "_legal_termsAndConditions",
          "component": () => import('../src/pages/legal/terms-and-conditions.svelte').then(m => m.default)
        }
      ],
      "isLayout": true,
      "path": "/legal",
      "id": "_legal__folder",
      "component": () => import('../src/pages/legal/_folder.svelte').then(m => m.default)
    }
  ],
  "isLayout": true,
  "path": "/",
  "id": "__folder",
  "component": () => import('../src/pages/_folder.svelte').then(m => m.default)
}


export const {tree, routes} = buildClientTree(_tree)

