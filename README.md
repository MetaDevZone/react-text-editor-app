# text-editor is FINALLY RETURNED !!

is a customizable rich text editor component for React applications. It provides a flexible and easy-to-use interface for users to create and edit content with various formatting options.

```sh
npm i -S react-editor
```

```tsx
import { Editor } from 'react-editor'

let [value, setValue] = useState('')
let ref = useRef()

ref.focus()
ref.insertText('foo')
ref.insertHTML('<img src="https://foo.bar/baz.png">')
value = 'set content'

<Editor
  ref={ref}
  placeholder="Type message to send..."
  className={styles.editor}
  value={value}
  onChange={setValue}
/>
```

#### Props

```tsx
export interface EditorProps {
  value?: string;
  defaultValue?: string;
  className?: string;
  placeholder?: string;
  allowInWebDrop?: boolean;
  processHTML?: (html: string) => string;
  processText?: (text: string) => string;
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
  onPaste?: (e: React.ClipboardEvent<HTMLDivElement>) => void;
  onChange?: (value: string) => void;
  [restProp: string]: any; // onto <div>
}

export interface EditorRefAttrs {
  focus: () => void;
  insertHTML: (html: string) => void;
  insertText: (text: string) => void;
}
```

**for umd / \<script> usage**

```html
<script src="https://unpkg.com/react"></script>
<script src="https://unpkg.com/react-dom"></script>
<script src="https://unpkg.com/react-editor"></script>
<script src="myapp.js"></script>
```

```js
// myapp.js
let React = window.React;
let ReactDOM = window.ReactDOM;
let { Editor } = window.ReactEditor;

ReactDOM.render(<Editor />, mountNode);
```

**for react < 16.8 we need hooks polyfill workaround**

```tsx
// todo
```

**for react-editor legacy version**

```sh
npm i -S react-editor@1.x
```

---

This project was bootstrapped with [create-react-library](https://github.com/transitive-bullshit/create-react-library) & [react-ts-demo](https://github.com/fritx/react-ts-demo).
