# @spextion/components

A collection of beautiful UI components for React, React Native, Expo, and Next.js with TypeScript support.

## Installation

```bash
npm install @spextion/components
# or
yarn add @spextion/components
# or
pnpm add @spextion/components
```

### For React / Next.js

Make sure you have Tailwind CSS installed and configured:

```bash
npm install -D tailwindcss
npx tailwindcss init
```

Update your `tailwind.config.js`:

```js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@spextion/components/**/*.{js,mjs}', // Add this line
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### For React Native / Expo

Install peer dependencies:

```bash
npm install react-native-reanimated @expo/vector-icons
```

## Usage

### React / Next.js

```tsx
import { ThreeDButton } from '@spextion/components';

function App() {
  return (
    <ThreeDButton variant="default" onClick={() => console.log('Clicked!')}>
      Click Me
    </ThreeDButton>
  );
}
```

**Note:** The component uses Tailwind CSS classes. Make sure Tailwind is configured in your project.

### React Native / Expo

```tsx
import { ThreeDButton } from '@spextion/components/native';

function App() {
  return (
    <ThreeDButton variant="default" onPress={() => console.log('Pressed!')}>
      Click Me
    </ThreeDButton>
  );
}
```

### Loading State

```tsx
<ThreeDButton
  variant="default"
  isLoading={isSubmitting}
  onPress={handleSubmit}
>
  Submit
</ThreeDButton>
```

### Button Sizes

```tsx
<ThreeDButton variant="default" size="xs">Extra Small</ThreeDButton>
<ThreeDButton variant="default" size="sm">Small</ThreeDButton>
<ThreeDButton variant="default" size="default">Default</ThreeDButton>
<ThreeDButton variant="default" size="lg">Large</ThreeDButton>
```

### Button Variants

```tsx
<ThreeDButton variant="default">Default</ThreeDButton>
<ThreeDButton variant="ai">AI Theme</ThreeDButton>
<ThreeDButton variant="destructive">Destructive</ThreeDButton>
<ThreeDButton variant="outline">Outline</ThreeDButton>
<ThreeDButton variant="outline_destructive">Outline Destructive</ThreeDButton>
<ThreeDButton variant="secondary">Secondary</ThreeDButton>
<ThreeDButton variant="ghost">Ghost</ThreeDButton>
<ThreeDButton variant="ghost_destructive">Ghost Destructive</ThreeDButton>
<ThreeDButton variant="link">Link</ThreeDButton>
<ThreeDButton variant="solid">Solid</ThreeDButton>
```

### Button Groups

```tsx
import { ThreeDButton, ThreeDButtonGroup } from '@spextion/components';

function App() {
  return (
    <ThreeDButtonGroup>
      <ThreeDButton variant="outline" onPress={() => console.log('Left')}>
        Left
      </ThreeDButton>
      <ThreeDButton variant="outline" onPress={() => console.log('Middle')}>
        Middle
      </ThreeDButton>
      <ThreeDButton variant="outline" onPress={() => console.log('Right')}>
        Right
      </ThreeDButton>
    </ThreeDButtonGroup>
  );
}
```

### Full Width Button

```tsx
<ThreeDButton variant="default" stretch>
  Full Width Button
</ThreeDButton>
```

### Disabled State

```tsx
<ThreeDButton variant="default" disabled>
  Disabled Button
</ThreeDButton>
```

## API Reference

### ThreeDButton Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `ThreeDButtonVariant` | `'default'` | Button style variant |
| `size` | `ThreeDButtonSize` | `'default'` | Button size |
| `children` | `React.ReactNode` | - | Button content |
| `stretch` | `boolean` | `false` | Make button full width |
| `supportIcon` | `string` | - | Icon before text (Ionicons name) |
| `leadingIcon` | `string` | - | Icon after text (Ionicons name) |
| `isLoading` | `boolean` | `false` | Show loading indicator |
| `disabled` | `boolean` | `false` | Disable button |
| `style` | `ViewStyle` | - | Custom styles |
| `onPress` | `() => void` | - | Press handler |

### Variants

- `ai` - Indigo gradient with 3D effect
- `default` - Blue primary button
- `destructive` - Red danger button
- `outline` - Outlined button with border
- `outline_destructive` - Outlined red button
- `secondary` - Gray secondary button
- `ghost` - Transparent ghost button
- `ghost_destructive` - Transparent red button
- `link` - Underlined link style
- `solid` - Dark solid button

### Sizes

- `xs` - Extra small (32px height)
- `sm` - Small (36px height)
- `default` - Default (40px height)
- `lg` - Large (44px height)
- `icon` - Icon only (40px × 40px)

## Helper Functions

### threeDButtonVariants

Get button styles programmatically:

```tsx
import { threeDButtonVariants } from '@spextion/components';

const buttonStyles = threeDButtonVariants({
  variant: 'ai',
  size: 'lg'
});
```

## TypeScript

Full TypeScript support with exported types:

```tsx
import type {
  ThreeDButtonProps,
  ThreeDButtonVariant,
  ThreeDButtonSize,
  ThreeDButtonGroupProps
} from '@spextion/components';
```

## Examples

### Form Submit Button

```tsx
const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async () => {
  setIsLoading(true);
  await submitForm();
  setIsLoading(false);
};

<ThreeDButton
  variant="default"
  size="lg"
  stretch
  isLoading={isLoading}
  onPress={handleSubmit}
>
  Submit Form
</ThreeDButton>
```

### Delete Confirmation

```tsx
<ThreeDButton
  variant="destructive"
  onPress={handleDelete}
>
  Delete Account
</ThreeDButton>
```

### Navigation Button

```tsx
<ThreeDButton
  variant="ghost"
  onPress={() => navigation.navigate('Next')}
>
  Continue
</ThreeDButton>
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [spextion](https://github.com/thespextion)

## Links

- [GitHub Repository](https://github.com/thespextion/Components)
- [npm Package](https://www.npmjs.com/package/@spextion/components)
- [Report Issues](https://github.com/thespextion/Components/issues)
