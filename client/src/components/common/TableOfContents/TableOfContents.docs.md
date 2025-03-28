# TableOfContents Component

The `TableOfContents` component is a React functional component designed to create an interactive table of contents that automatically tracks and highlights the current section based on scroll position.

---

## Props

| Prop    | Type     | Description                                   | Required | Default |
| ------- | -------- | --------------------------------------------- | -------- | ------- |
| `title` | `string` | Optional title for the table of contents.     | No       | -       |
| `data`  | `T`      | Generic data containing headings information. | Yes      | -       |

---

## Features

### 1. Automatic Heading Detection

- Automatically detects and organizes headings from the provided data
- Supports nested headings (h2 and h3)
- Creates a hierarchical structure of the content

### 2. Intersection Observer

- Tracks the current section in view
- Automatically highlights the active section in the table of contents
- Updates in real-time as the user scrolls

### 3. Smooth Scrolling

- Provides smooth scrolling to the selected section
- Prevents default anchor behavior for better user experience
- Maintains scroll position after navigation

### 4. Responsive Design

- Sticky positioning for better navigation
- Collapsible structure for nested headings
- Dark mode support

---

## Usage Example

```tsx
import { TableOfContents } from "./TableOfContents";

const App = () => {
  const content = {
    // Your content with headings
  };

  return (
    <div>
      <TableOfContents title="Contents" data={content} />
      {/* Your main content */}
    </div>
  );
};

export default App;
```

---

## Key Functions

### 1. `handleSmoothScroll`

- **Description**: Handles smooth scrolling to the selected section
- **Parameters**:
  - `e`: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  - `id`: string (the target section id)
- **Usage**: Called when a table of contents link is clicked

### 2. `useHeadingsData`

- **Description**: Custom hook that processes and organizes heading data
- **Returns**: Object containing nested headings structure
- **Usage**: Automatically called by the component to process headings

### 3. `useIntersectionObserver`

- **Description**: Custom hook that tracks the current section in view
- **Returns**: Object containing the active section ID
- **Usage**: Automatically updates the active section as user scrolls

---

## Styling

The component uses Tailwind CSS for styling:

- **Layout**: `sticky top-20` for fixed positioning
- **Typography**:
  - Main headings: `text-2xl font-bold text-indigo-500`
  - Sub-headings: `text-lg font-semibold text-indigo-600`
  - Active section: `text-orange-500`
- **Dark Mode Support**:
  - `dark:text-indigo-300`
  - `dark:border-black/30`
- **Hover Effects**: `hover:text-indigo-800`

---

## Dependencies

### 1. Custom Hooks

- `useHeadingsData`: Processes heading data
- `useIntersectionObserver`: Tracks scroll position

### 2. Tailwind CSS

- Used for utility-based styling
- Provides responsive design
- Handles dark mode

---

## Notes

### Heading Structure

- The component expects a specific heading structure in the data
- Supports h2 and h3 headings for nested structure
- Automatically generates IDs for headings if not provided

### Accessibility

- Uses semantic HTML with `<nav>` and `<ul>` elements
- Includes `aria-label` for screen readers
- Maintains proper heading hierarchy

### Performance

- Uses Intersection Observer for efficient scroll tracking
- Implements smooth scrolling for better user experience
- Optimized for large documents with many sections
