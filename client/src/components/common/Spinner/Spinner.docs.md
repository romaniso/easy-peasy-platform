# Spinner Component

The `Spinner` component is a React functional component designed to display a loading indicator with customizable sizes. It provides a simple, animated spinner using the PiSpinnerGap icon from react-icons.

---

## Props

| Prop   | Type          | Description              | Required | Default  |
| ------ | ------------- | ------------------------ | -------- | -------- |
| `size` | `SpinnerSize` | The size of the spinner. | No       | `MEDIUM` |

---

## Features

### 1. Size Variants

- **Small**: 2xl size (24px)
- **Medium**: 4xl size (36px)
- **Large**: 6xl size (48px)

### 2. Animation

- Smooth spinning animation using Tailwind's `animate-spin`
- Continuous rotation for clear loading indication

### 3. Styling

- White color by default
- Consistent sizing across different variants
- Clean, minimal design

---

## Usage Example

```tsx
import { Spinner, SpinnerSize } from "./Spinner";

const App = () => {
  return (
    <div>
      {/* Default (Medium) size */}
      <Spinner />

      {/* Custom size */}
      <Spinner size={SpinnerSize.SMALL} />
      <Spinner size={SpinnerSize.LARGE} />
    </div>
  );
};

export default App;
```

---

## Size Enum

```typescript
export enum SpinnerSize {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}
```

---

## Styling

The component uses Tailwind CSS for styling:

- **Animation**: `animate-spin` for continuous rotation
- **Sizes**:
  - Small: `text-2xl`
  - Medium: `text-4xl`
  - Large: `text-6xl`
- **Color**: `text-white`

---

## Dependencies

### 1. React Icons

- `PiSpinnerGap` from `react-icons/pi` for the spinner icon

### 2. Tailwind CSS

- Used for utility-based styling
- Provides animation classes
- Handles responsive sizing

---

## Notes

### Size Handling

- Default size is `MEDIUM` if not specified
- Size mapping is handled through a static object for optimal performance
- Fallback to `MEDIUM` size if an invalid size is provided

### Performance

- Uses static object mapping for size classes
- No unnecessary re-renders or computations
- Lightweight implementation

### Accessibility

- Icon-based spinner provides clear visual feedback
- Can be used in combination with aria-labels for screen readers
- Suitable for loading states in forms and data fetching
