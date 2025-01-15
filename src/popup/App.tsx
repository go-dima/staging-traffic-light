import { JiraProvider } from "../context/JiraContext";
import { IssueList } from "../components/IssueList";
import "./App.css";

export function App() {
  return (
    <JiraProvider>
      <div className="app">
        <h1>Issues In Staging</h1>
        <IssueList />
      </div>
    </JiraProvider>
  );
}
