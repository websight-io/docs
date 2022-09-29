# DatePicker

**wcm/dialogs/components/datepicker**

## Description

Allows user to pick a date, time or datetime.

## Properties

- **name** - `string` (required)  
    Form field name

- **label** - `string` (required)  
    Display label value

- **required** - `string`  
    Indicates if field value is mandatory

- **type** - `string`  
    The type of the datepicker. It can be one of `date`, `time` or `datetime`. Default value is `date`.

- **displayDateFormat** - `string`  
    Date format that will be used to format date on the user interface. It does not affect the way the date is saved. Format should be accepted by [date-fn’s format function](https://date-fns.org/v1.29.0/docs/format "https://date-fns.org/v1.29.0/docs/format").

- **displayTimeFormat** - `string`  
    Time format that will be used to format time on the user interface. It does not affect the way the time is saved. Format should be accepted by [date-fn’s format function](https://date-fns.org/v1.29.0/docs/format "https://date-fns.org/v1.29.0/docs/format").

- **minDate** - `string`  
    Low boundary of the selected date or datetime. Format should be: `yyyy-MM-dd`. E.g.: 2022-02-02

- **maxDate** - `string`  
    High boundary of the selected date or datetime. Format should be: `yyyy-MM-dd`. E.g.: 2022-02-02

- **after** - `string`  
    Comma separated values of other datepickers. These datepickers’s values should be lower than the selected date.

- **before** - `string`  
    Comma separated values of other datepickers. These datepickers’s values should be higher the selected date.

## Example

```json
"displayDate": {
  "sling:resourceType": "wcm/dialogs/components/datepicker",
  "name": "displayDate",
  "label": "Display date",
  "type": "date",
  "displayDateFormat": "YYYY-MM-DD"
}
```
