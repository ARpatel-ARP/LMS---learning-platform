import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

const RichTextEditor = () => {
  const { quill, quillRef } = useQuill();
  return <div ref={quillRef} />;
};
export default RichTextEditor