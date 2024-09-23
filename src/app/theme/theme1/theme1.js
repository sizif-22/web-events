import Editor from "./editor";
import Viewer from "./viewer";
const Theme1 = ({ editor, data, eventId }) => {
  return editor ? <Editor /> : <Viewer data={data} eventId={eventId} />;
};
export default Theme1;
