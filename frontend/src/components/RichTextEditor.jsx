import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

const RichTextEditor = ({input, setInput}) => {
  const handleChange = (content) => {
    setInput({...input, description:content})
  }
  
  const { quill, quillRef } = useQuill();
  return <div ref={quillRef} />;
};
export default RichTextEditor