import { JiraProvider } from "../context/JiraContext";
import { IssuesList } from "../components/IssuesList";
import "./App.css";

export function App() {
  return (
    <JiraProvider>
      <div className="app">
        <h1>Issues In Staging</h1>
        <IssuesList />
      </div>
    </JiraProvider>
  );
}
