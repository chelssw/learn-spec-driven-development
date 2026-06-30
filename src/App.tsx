import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import Introduction from "./pages/Introduction.tsx";
import TheProblem from "./pages/TheProblem.tsx";
import Landscape from "./pages/Landscape.tsx";
import SpecKit from "./pages/SpecKit.tsx";
import OpenSpec from "./pages/OpenSpec.tsx";
import TraditionalTools from "./pages/TraditionalTools.tsx";
import AIPoweredTools from "./pages/AIPoweredTools.tsx";
import CopilotPlanMode from "./pages/CopilotPlanMode.tsx";
import BestPractices from "./pages/BestPractices.tsx";
import DecisionGuide from "./pages/DecisionGuide.tsx";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Introduction />} />
          <Route path="problem" element={<TheProblem />} />
          <Route path="landscape" element={<Landscape />} />
          <Route path="tools/speckit" element={<SpecKit />} />
          <Route path="tools/openspec" element={<OpenSpec />} />
          <Route path="tools/ai-powered" element={<AIPoweredTools />} />
          <Route path="tools/copilot-plan-mode" element={<CopilotPlanMode />} />
          <Route path="tools/traditional" element={<TraditionalTools />} />
          <Route path="best-practices" element={<BestPractices />} />
          <Route path="decision-guide" element={<DecisionGuide />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
