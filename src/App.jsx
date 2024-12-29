import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/dashboard/Home";
import WorkspaceId from "./pages/dashboard/WorkspaceId";
import Create from "./pages/workspaces/Create";
import WorkspaceIdSettingPage from "./pages/workspaces/WorkspaceIdSettingPage";
import Workspacejoin from "./pages/workspaces/Workspacejoin";
import WorkspaceMembers from "./pages/workspaces/WorkspaceMembersPage";
import ProjectIdPage from "./pages/dashboard/ProjectIdPage";
import Error from "./components/Error";
import ProjectIdSettingPage from "./pages/workspaces/projectIdSettingPage";
import TaskPage from "./pages/dashboard/TaskPage";
import TaskIdPage from "./pages/dashboard/TaskIdPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route path="" element={<ProtectedRoute redirectRoute={"/sign-in"} />}>
          <Route path="/" element={<Home />} />
          <Route path="/workspace/:id" element={<WorkspaceId />} />
          <Route
            path="/workspace/:id/settings"
            element={<WorkspaceIdSettingPage />}
          />
          <Route
            path="/workspace/:id/join/:invitecode"
            element={<Workspacejoin />}
          />
          <Route path="/workspace/create" element={<Create />} />
          <Route path="/workspace/:id/members" element={<WorkspaceMembers />} />
          <Route
            path="/workspace/:id/project/:projectId"
            element={<ProjectIdPage />}
          />
          <Route path="/workspace/:id/tasks" element={<TaskPage />} />
          <Route path="/workspace/:id/task/:taskId" element={<TaskIdPage />} />

          <Route
            path="/workspace/:workspaceId/project/:projectId/settings"
            element={<ProjectIdSettingPage />}
          />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
