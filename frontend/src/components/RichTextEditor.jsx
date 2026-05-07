import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

const Editor = () => {
  const { quill, quillRef } = useQuill();
  return <div ref={quillRef} />;
};