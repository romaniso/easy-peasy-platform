# `Icon` Component

The `Icon` component is a reusable React component for rendering specific icons based on the `type` prop. It uses an enum (`IconType`) to ensure type safety and scalability. If the specified icon type is not found, it returns a <span> with the text "Icon not found".

## Props

| Name        | Type       | Default | Description                                                      |
| ----------- | ---------- | ------- | ---------------------------------------------------------------- |
| `className` | `string`   | `null`  | Optional CSS class to style the icon.                            |
| `type`      | `IconType` | `null`  | The type of icon to render. Use values from the `IconType` enum. |

## `IconType` Enum

Defines the allowed values for the `type` prop.

```tsx
export enum IconType {
  Check = "check", // Renders a checkmark icon
  SelectArrow = "selectArrow", // Renders a downward caret arrow icon
}
```

## Usage

#### Basic Usage

```tsx
import { Icon, IconType } from "./Icon";

// Render a check icon
<Icon type={IconType.Check} />

// Render a select arrow icon with custom styling
<Icon type={IconType.SelectArrow} className="custom-class" />
```

#### Adding New Icons

To add a new icon:

- Import an icon from `react-icons` lib
- Add a new entry in the `IconType` enum.
- Extend the iconMap to include the new icon logic.
  Example:

```tsx
import { FaNewIcon } from "react-icons/fa"; // Import an icon

export enum IconType {
  Check = "check",
  SelectArrow = "selectArrow",
  NewIcon = "newIcon", // Add new type here
}

const iconMap = new Map<IconType, (className?: string) => JSX.Element>([
  [IconType.Check, (className) => <FaCheck className={className} />],
  [IconType.SelectArrow, (className) => <FaCaretDown className={className} />],
  [IconType.NewIcon, (className) => <FaNewIcon className={className} />], // Extend the iconMap
]);
```

## Notes

- The `type` prop is required to render an icon.
- The `className` prop is optional and can be used for additional styling.
- If the specified icon type is not found, the component returns a <span> with the text "Icon not found".
- The use of a Map improves maintainability, making it easier to add or update icons without modifying multiple parts of the codebase.
