---
title: Creating custom extension for TipTap Rich Text Editor
description: RTE can be extended by additional fields, which provide new formatting options for users. However, list of available plugins may not be sufficient for demanding client. Let’s create completely new component for RTE toolbar, using TipTap library which lies underneath Rich Text Editor component.
author: Martyna Szeszko
image: feature-image.jpg
publicationDate: 16.02.2023
minReadTime: 5
tags:
  - WebSight
---

*Published at: 16.02.2023 by [Martyna Szeszko](https://github.com/martyna-ds)*

<p align="center" width="100%">
    <img class="image" src="ws-and-tiptap.jpg" alt="Extension for tiptap rich text editor in websight CMS">
</p>

> As written in related article [Customizing Rich Text Editor in WebSight CMS](https://www.websight.io/blog/2022/customizing-rich-text-editor/) RTE can be extended by additional fields, which provide new formatting options for users. However, list of available plugins may not be sufficient for demanding client. Let’s create completely new component for RTE toolbar, using [TipTap library](https://tiptap.dev/introduction) which lies underneath Rich Text Editor component.

## New component requirements

New component is supposed to add masked email address in case to prevent spam messages. Anchor tag should not contain plain, easy to read email address, instead can use data attributes for storing email parts. After page is loaded, script should convert these data-parts to whole email address, like in regular link with `mailto:` prefix. 

From user perspective, RTE should have dedicated button where after click there is possibility to input email address, and the rest is happening under the hood.

!!! tip Available plugins
    Websight CMS already provides list of useful RTE extensions. The guide [in mentioned article](https://www.websight.io/blog/2022/customizing-rich-text-editor/) might be helfpul to understand some steps covered throughout article

## Technical overview

Component specifity implies the work can be split into two parts:
- CMS part, where adding/editing/deleting and encrypting email address is happening within Rich Text Editor
- page part, where email decoding happens 

Therefore, **component must be used with script provided within page**, otherwise email links won’t be decoded.

As the decoding email script will be the last step, let’s focus on the main issue here – extending RTE editor. Such editor component, as mentioned in related article, is made up from two parts: the plugin element and the ui element. The plugin part is responsible for the plugin behavior and it is directly related with ui part, which is providing UI for plugin itself. In Websight CMS for plugins is responsible @tiptap library, and for UI - separate module which is a part of Websight CMS. As for plugin, we can either extend Link or create new extension. But what with ui element for this plugin? Any of these (button, button dropdown, list dropdown, link) don't match requirements, because we need dropdown with one input (link UI has input and select with `target` attribute selection). So we need new UI as well.

Our new plugin will affect another plugin which is already in default version in RTE - Link. **We need to exlude email handling from Link plugin**, as we will cover that in email plugin. And that means, we need also to modify Link plugin by creating custom link plugin.

## Page part - configuration

We can start by adding proper fields in json file with richtext configuration. Under `"configuration"` property we want to inherit all others components, so we can make use of `"sling:resourceSuperType"` property and type our default path to richtext configuration `wcm/dialogs/components/richtext/configuration`. Afterwards we can add any plugin and in our case `link` will be overwritten and `email` will be added as new. To not confuse and overcomplicate, let's keep simple titles and plugin/UI names. To keep both UI next to each other, let's use `"sling:orderBefore"` property.

```json title=".../application/backend/src/main/resources/apps/wcm/dialogs/components/richtext/configuration/.content.json"
{
  "sling:resourceSuperType": "/libs/wcm/dialogs/components/richtext/configuration",
  "link": {
    "sling:resourceType": "wcm/dialogs/components/richtext/ui/link",
    "title": "Link",
    "icon": "link",
    "plugin": {
      "sling:resourceType": "extensions/dialogs/components/richtext/plugin/link"
    }
  },
  "email": {
    "sling:resourceType": "extensions/dialogs/components/richtext/ui/email",
    "title": "Email",
    "icon": "alternate_email",
    "plugin": {
      "sling:resourceType": "extensions/dialogs/components/richtext/plugin/email"
    },
    "sling:orderBefore": "bulletlist"
  }
}
```
!!! note Available icons
    Icons are provided from [Google font page](https://fonts.google.com/icons), but keep in mind, that not all icons listed on google page can be available in CMS due to update time differences

## CMS part - new plugin

In case to connect our json configuration above to actual scripts, create following files with path pointing to our script:

```json websight-rte-extensions/src/main/resources/libs/extensions/dialogs/components/richtext/plugin/email/email.json.html
{
    "type": "/apps/websight-rte-extensions/web-resources/components/richtext/plugin/Email/Email.js"
}
```
Same file need to be created for link file, as we overwrite plugin only.

And for UI element (only email plugin):
```json websight-rte-extensions/src/main/resources/libs/extensions/dialogs/components/richtext/ui/email/email.json.html
{
    "type": "/apps/websight-rte-extensions/web-resources/components/richtext/ui/EmailDialog.js",
    "configuration": {
        "title": "${properties.title}",
        "icon": "${properties.icon}"
    }
    <sly data-sly-list="${resource.children}">
        <sly data-sly-test="itemList.first">,
            "plugin": <sly data-sly-resource="${item}"></sly>
        </sly>
    </sly>
}
```
### TipTap

There is very supportive [tiptap documentation on how to build such custom extensions](https://tiptap.dev/guide/custom-extensions), also in our case we can just base our code on [Link docs](https://tiptap.dev/api/marks/link) and [Link code](https://github.com/ueberdosis/tiptap/blob/main/packages/extension-link/src/link.ts). With this knowledge, writing our plugin is not really a struggle. 

**Extend or create from scratch?**

Extending existing component result in less code writing, as we can only replace particular methods. The obvious component in this case would be Link component, as the behavior would be very similar. But the differences are significant, too. Fortunately, it is no need to decide now, as we can switch from extending to creating in a simple way. And actually it is exactly what I did at some point of writing email component.

I came out with following result:

```ts extension-email.ts
import { markPasteRule, mergeAttributes, Mark } from '@tiptap/core';
import { autolink } from './helpers/autolink.js';
import { pasteHandler } from './helpers/pasteHandler.js';
import { find, reset } from 'linkifyjs';
import { Plugin } from '@tiptap/pm/state';
import { splitEmail } from './helpers/splitEmail.js';
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    email: {
      setEmail: (attributes: 
        { 'data-part1': string | null, 'data-part2': string | null, 'data-part3': string | null }
        ) => ReturnType,
      toggleEmail: (attributes: 
        { 'data-part1': string | null, 'data-part2': string | null, 'data-part3': string | null }
        ) => ReturnType,
      unsetEmail: () => ReturnType,
    }
  }
}

const CustomEmail = Mark.create({
  name: 'email',
  priority: 1000,
  addOptions() {
    return {
      linkOnPaste: false,
      autolink: false,
      validate: undefined,
      HTMLAttributes: {
        rel: 'noopener noreferrer nofollow',
        class: null,
        'data-part1': null,
        'data-part2': null,
        'data-part3': null
      }
    };
  },
  onDestroy() {
    reset();
  },
  inclusive() {
    return this.options.autolink;
  },
  addAttributes() {
    return {
      class: {
        default: this.options.HTMLAttributes.class,
      },
      'data-part1': {
        default: null
      },
      'data-part2': {
        default: null
      },
      'data-part3': {
        default: null
      }
    };
  },

  parseHTML() {
    return [
      { tag: 'a[data-part1][data-part2][data-part3]' },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      'a',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },
  addCommands() {
    return {
      setEmail: attributes => ({ chain }) => {
        return chain()
          .setMark(this.name, attributes)
          .setMeta('preventAutolink', true)
          .run();
      },

      toggleEmail: attributes => ({ chain }) => {
        return chain()
          .toggleMark(this.name, attributes, { extendEmptyMarkRange: true })
          .setMeta('preventAutolink', true)
          .run();
      },

      unsetEmail: () => ({ chain }) => {
        return chain()
          .unsetMark(this.name, { extendEmptyMarkRange: true })
          .setMeta('preventAutolink', true)
          .run();
      },
    };
  },
  addPasteRules() {
    return [
      markPasteRule({
        find: text => find(text, 'email')
          .filter(email => {
            if (this.options.validate) {
              return this.options.validate(email.value);
            }

            return true;
          })
          .filter(email => email.isLink)
          .map(email => ({
            text: email.value,
            index: email.start,
            data: email,
          })),
        type: this.type,
        getAttributes: match => (splitEmail(match.data?.href)),
      }),
    ]
  },

  addProseMirrorPlugins() {
    const plugins: Plugin[] = [];

    if (this.options.autolink) {
      plugins.push(
        autolink({
          type: this.type,
          validate: this.options.validate,
        }),
      );
    }

    if (this.options.linkOnPaste) {
      plugins.push(
        pasteHandler({
          editor: this.editor,
          type: this.type,
        }),
      );
    }

    return plugins;
  },
});

export default CustomEmail;
```


Finally, we can create `Email.ts` file, component which loads previously registered plugin:
```ts /apps/websight-rte-extensions/web-resources/components/richtext/plugin/Email/Email.ts
import CustomEmail from "./extension-email.js";
import { splitEmail } from "./helpers/splitEmail.js";
import { validateEmail } from "./helpers/validateEmail.js";

const Email = () => ({
    getTipTapExtensions: () => [CustomEmail.configure({autolink: true, linkOnPaste: true})],
    getAction: ({
      editor
    }) => ({
      execute: ({hrefDecoded}) => {
        if (validateEmail(hrefDecoded)) {
          editor.chain().focus().extendMarkRange('email').setEmail({
            hrefDecoded,
            ...splitEmail(hrefDecoded)
          }).run();
        } else {
          editor.chain().focus().extendMarkRange('email').unsetEmail().run();
        }
      }
    }),
    getState: ({
      editor
    }) => ({
      isActive: editor.isActive('email'),
      ...editor.getAttributes('email')
    })
});

export default Email;
```
- `getTipTapExtension` method is doing exactly what its name indicate, as well as making possible to switch off/on some plugin features
- `execute` runs when user click submit button after filling the input
- `getState` is passing current editor state

Basically what is done here is just combine our UI and plugin into one component.

## Page part once again - decoding script

Script for decoding is quite simple, as it is scanning page and convert three data parts to proper email:

```js
window.addEventListener('load', () => {
    const links = document.querySelectorAll('[data-part1][data-part2][data-part3]');
    for (const link of links) {
      const attrs = link.dataset;
      link.setAttribute(
        'href',
        `mailto:${attrs.part1}@${attrs.part2}.${attrs.part3}`
      );
    }
});
```

## Summary




