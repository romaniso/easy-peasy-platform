# Image Component

The `Image` component is a React functional component designed to display an image with advanced interactive features, such as zooming, dragging, downloading, and a modal view.

---

## Props

| Prop           | Type      | Description                               | Required | Default |
| -------------- | --------- | ----------------------------------------- | -------- | ------- |
| `src`          | `string`  | The source URL of the image.              | Yes      | -       |
| `alt`          | `string`  | Alternate text for the image.             | No       | `""`    |
| `downloadable` | `boolean` | The ability to download an image.         | No       | `false` |
| `...props`     | `object`  | Additional props for the `<img>` element. | No       | -       |

---

## Features

### 1. Image Display with Zoom Modal

- Clicking the image opens it in a modal with enhanced controls.
- The modal supports zooming, dragging, and downloading the image.

### 2. Zoom Controls

- **Zoom In**: Increases the image scale by `0.1` per click.
- **Zoom Out**: Decreases the image scale by `0.1` per click.

### 3. Drag Support

- Click and drag the image inside the modal to move it.

### 4. Download Functionality

- Provides an option to download the image in its full resolution.

### 5. Reset Transform

- Resets the zoom and position to the initial state.

---

## Usage Example

```tsx
import { Image } from "./Image";

const App = () => {
  return (
    <div>
      <h1>Interactive Image Viewer</h1>
      <Image src="https://example.com/image.jpg" alt="Sample Image" />
    </div>
  );
};

export default App;
```

---

## Key Functions

### 1. `handleOpened`

- **Description**: Toggles the modal view and resets the image transform.
- **Usage**: Called when the image or modal close button is clicked.

### 2. `handleZoomIn`

- **Description**: Increases the scale of the image.
- **Usage**: Triggered when the Zoom In button (`FaPlus`) is clicked.

### 3. `handleZoomOut`

- **Description**: Decreases the scale of the image.
- **Usage**: Triggered when the Zoom Out button (`FaMinus`) is clicked.

### 4. `handleDownload`

- **Description**: Downloads the image using a proxy to handle cross-origin issues.
- **Usage**: Triggered when the Download button (`FaCloudDownloadAlt`) is clicked.

### 5. `resetTransform`

- **Description**: Resets the image scale and position to their default states.
- **Usage**: Automatically called when the modal is opened or manually triggered.

---

## Modal Controls

### 1. Close Button

- **Icon**: `RxCross2`
- **Function**: Closes the modal.

### 2. Zoom In/Out Buttons

- **Icons**: `FaPlus`, `FaMinus`
- **Function**: Adjusts the scale of the image.

### 3. Download Button

- **Icon**: `FaCloudDownloadAlt`
- **Function**: Downloads the image.

### 4. Drag to Move

- **Function**: Allows the image to be repositioned inside the modal by dragging.

---

## Styling

The component leverages Tailwind CSS for responsive and styled layouts:

- **Positioning**: `absolute`, `relative`.
- **Animations**: `hover:scale-110` for hover effects.
- **Dark Mode Compatibility**: `dark:bg-black/30`, `dark:text-orange-500`.

---

## Dependencies

### 1. React Icons

- Provides icons for zooming, closing, and downloading.

### 2. Tailwind CSS

- Used for utility-based styling and responsive layouts.

### 3. Custom Modal Component

- A reusable modal component for displaying the image.

---

## Notes

### Drag and Zoom

- Ensure the image has a non-empty `src` to enable drag and zoom functionalities.

### CORS Proxy for Downloads

- A proxy (`cors-anywhere`) is used to handle cross-origin image downloads. Replace it with your own proxy service in production environments.
