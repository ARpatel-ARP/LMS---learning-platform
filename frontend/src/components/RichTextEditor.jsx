import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

const RichTextEditor = ({input, setInput}) => {
  const { quill, quillRef } = useQuill();
  return <div ref={quillRef} />;
};
export default RichTextEditor