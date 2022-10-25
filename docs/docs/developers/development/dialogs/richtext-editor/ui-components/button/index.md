# Button
**wcm/dialogs/components/richtext/ui/button**

![Button](button1.png)

![Button](button2.png)

## Description:

Component allows to add edit action as a button visible in menu bar. Button can be displayed with title or icon.

### Configuration:

-   **title** -  `string` (required)  
    Action title. It will be visible in a tooltip. It also will be shown on button in case of lack of icon property
    
-   **icon** - `string`  
    Icon name. If set then button will be visible with defined icon. Available icons can be found in Material Icons font.
    

### State:

-   **isActive** - `boolean`  
    Defines if button should be checked as active.
    
-   **isDisabled** - `boolean`  
    Defines if button should be disabled.
    

### Children:

-   plugin - node defines edit action caused by a button.
    

## Example:

```json
"bold": {
  "sling:resourceType": "wcm/dialogs/components/richtext/ui/button",
  "title": "Bold",
  "icon": "format_bold",
  "plugin": {"sling:resourceType": "wcm/dialogs/components/richtext/plugin/bold"}
}
```