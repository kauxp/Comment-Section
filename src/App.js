import './App.css';
import { CommentSection, ReplySection } from './components/CommentSection';
function App() {
  return (
    <div className="App">
      <CommentSection header={"Comment"} isReply={true} />
      {/* <ReplySection/> */}
    </div>
  );
}

export default App;
