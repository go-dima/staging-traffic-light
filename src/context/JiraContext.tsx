import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Issue } from "../types/jira";
import { CONNECTION_PORT, MESSAGE_TYPE } from "../utils/constants";

interface JiraContextType {
  issues: Issue[];
  loading: boolean;
  error: string | null;
}

const JiraContext = createContext<JiraContextType>({
  issues: [],
  loading: true,
  error: null,
});

export const useJira = () => useContext(JiraContext);

export const JiraProvider = ({ children }: { children: ReactNode }) => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const port = chrome.runtime.connect({ name: CONNECTION_PORT });

    // Listen for messages from the background script
    port.onMessage.addListener((message) => {
      if (message.type === MESSAGE_TYPE.DATA) {
        setIssues(message.data.issues);
        setLoading(false);
        setError(null);
      } else if (message.type === MESSAGE_TYPE.ERROR) {
        setError(message.error);
        setLoading(false);
      }
    });

    // Request issues data
    port.postMessage({ type: MESSAGE_TYPE.GET });

    // Cleanup
    return () => {
      port.disconnect();
    };
  }, []);

  return (
    <JiraContext.Provider value={{ issues, loading, error }}>
      {children}
    </JiraContext.Provider>
  );
};
