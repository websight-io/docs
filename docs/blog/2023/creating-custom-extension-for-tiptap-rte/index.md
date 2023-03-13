---
title: Creating custom extension for TipTap Rich Text Editor
description: RTE can be extended by additional fields, which provide new formatting options for users. However, the list of available plugins may not be sufficient for demanding clients. Let’s create a completely new component for the RTE toolbar, using the TipTap library which lies underneath the Rich Text Editor component.
author: Martyna Szeszko
image: feature-image.jpg
publicationDate: 16.02.2023
minReadTime: 12
tags:
  - WebSight
---

*Published at: 16.02.2023 by [Martyna Szeszko](https://github.com/martyna-ds)*

<p align="center" width="100%">
    <img class="image" src="ws-and-tiptap.jpg" alt="Extension for tiptap rich text editor in websight CMS">
</p>

> There was a need to add plugin, which should be masking e-mail addresses inside Rich Text Editor in case to prevent spam messages. This new RTE plugin was created as a custom, written from scratch, fully customizable component for [ds.pl](https://ds.pl) website. Let's follow the process of creation such a component, with a little help of [TipTap library](https://tiptap.dev/introduction), which lies underneath the Rich Text Editor.

See our other article about [Customizing Rich Text Editor in WebSight CMS](https://www.websight.io/blog/2022/customizing-rich-text-editor/), where you can read more about RTE configuration and learn how to create plugin from predefined components.

## New component requirements

The new component is supposed to add a masked email address in case it prevents spam messages. An anchor tag should not contain a plain, easy-to-read email address, instead can use data attributes for storing email parts. Example of pretected email address could look like this:

```<a href="" data-part1="info" data-part2="ds" data-part3="pl" ... >Contact Us</a>```

After the page is loaded, the script should convert these data parts to the whole email address, like in a regular link with `mailto:` prefix: 

```<a href="mailto:info@ds.pl" ... >Contact Us</a>```

From a user perspective, RTE should have a dedicated button where after clicking there is a possibility to input an email address, and the rest is happening under the hood. The button could be placed next to Link button. This is how RTE component looks like now:

<p align="center" width="100%">
    <img class="image" src="before-email-extension.png" alt="Extension for tiptap rich text editor in websight CMS">
</p>

!!! warning "Email link obfuscation"
    Please keep in mind it is only a very basic method of email link obfuscation, chosen as one from many other ways of encoding link content. Surely it will not protect from all spambots or harvesters, but should be enough for our current needs.

## Technical overview

Due to component specifcity, the work can be split into two parts:

- CMS part - where adding/editing/deleting and encrypting email addresses is happening within Rich Text Editor
- page part - where RTE configuration and email decoding happens 

Therefore, **the component must be used with the script provided within page**, otherwise, email links won’t be decoded.

As the decoding email script will be the last step, let’s focus on the main issue here – extending the RTE editor. Such an editor component is made up of two parts: the plugin element and the UI element. The plugin part is responsible for the plugin behavior and it is directly related to the UI part, which is providing UI for the plugin itself. In Websight CMS, the tiptap library is responsible for plugins, and for UI - a separate module that is a part of Websight CMS. As for the plugin, we can either extend or create a new extension. But what about the UI element for this plugin? Any of these (button, button dropdown, list dropdown, link) don't match the requirements, because we need a dropdown with one input (link UI has input and select with `target` attribute selection). So we need a new UI as well.

Our new plugin will affect another plugin that is already in the default version in RTE - Link. **We need to exclude email handling from the Link plugin**, as we will cover that in the email plugin. And that means we need also to modify the Link plugin by creating a custom link plugin.

## Page part - configuration

We can start by adding proper fields in the JSON file with richtext configuration. Under the `"configuration"` property we want to inherit all other components, so we can make use of the `"sling:resourceSuperType"` property and type our default path to richtext configuration `wcm/dialogs/components/richtext/configuration`. Afterward, we can add any plugin we want and in our case, `link` will be overwritten and `email` will be added as new. To not confuse and overcomplicate, let's keep simple titles and plugin/UI names. To keep both UI next to each other, let's use the `"sling:orderBefore"` property.

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
    Icons are provided by [Google font page](https://fonts.google.com/icons)

## CMS part - new plugin

In case to connect our JSON configuration above to actual scripts, create the following files with a path pointing to our script:

```json title="websight-rte-extensions/src/main/resources/libs/extensions/dialogs/components/richtext/plugin/email/email.json.html"
{
    "type": "/apps/websight-rte-extensions/web-resources/components/richtext/plugin/Email/Email.js"
}
```
A similar file needs to be created for the link:
```json websight-rte-extensions/src/main/resources/libs/extensions/dialogs/components/richtext/plugin/link/link.json.html
{
    "type": "/apps/websight-rte-extensions/web-resources/components/richtext/plugin/Link/Link.js"
}
```

And for UI element:
```json title="websight-rte-extensions/src/main/resources/libs/extensions/dialogs/components/richtext/ui/email/email.json.html"
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

There is very supportive [tiptap documentation on how to build such custom extensions](https://tiptap.dev/guide/custom-extensions), also in our case we can just base our code on [Link docs](https://tiptap.dev/api/marks/link) and [Link code](https://github.com/ueberdosis/tiptap/blob/main/packages/extension-link/src/link.ts).

**Extend or write from scratch?**

Extending existing component result in less code writing, as we can only replace particular methods. The obvious component, in this case, would be the Link component, as the behavior would be very similar. But the differences are significant, too. Fortunately, it is no need to decide now, as we can simply switch from extending to creating.

Some chosen methods from component:
```typescript title="extension-email.ts"
...
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

    ...

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

TipTap library is built on the top of the [ProseMirror](https://prosemirror.net/) package but almost every functionality can be done without any knowledge of it, as TipTap is handling it under the hood. However, for handling some events we need to add the `addProseMirrorPlugins()` method and inside it create prosemirror plugins in case to handle this special event-based behavior. Here is an [example usage of ProseMirror API](https://tiptap.dev/guide/custom-extensions/#access-the-prosemirror-api), so the helper file would look like something like this:

```typescript title=" helpers/pasteHandler.ts"

export function pasteHandler(options: PasteHandlerOptions): Plugin {
  return new Plugin({
    key: new PluginKey('handlePasteEmail'),
    props: {
      handlePaste: (view, event, slice) => {
        ...
      },
    },
  });
}
```

Finally, we can create an `Email.ts` file with component which loads the previously registered plugin:

```typescript title="/apps/websight-rte-extensions/web-resources/components/richtext/plugin/Email/Email.ts"
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
- `getTipTapExtension` method is doing exactly what its name indicates, as well as making it possible to switch off/on some plugin features
- `execute` runs when the user click submit button
- `getState` is passing the current editor state

## Page part once again - decoding script

Script for decoding is quite simple, as it is scanning the page and converting three data parts to proper email:

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
<p align="center" width="100%">
    <img class="image" src="email-extension.png" alt="Extension for tiptap rich text editor in websight CMS - result">
    Result
</p>

## Summary

First of all, we created new entries in the richtext JSON configuration file, then we added proper JSON files with paths corresponding to actual scripts. After creating and extending the existing component we could add a simple script for decoding emails on our page.

As we can see, Rich Text Editor can be easily extended by any functionality we want, due to the flexible architecture model used in Websight CMS. Furthermore, creating an extension with the TipTap library offers broad possibilities, as well as creating a new UI component within CMS. 

