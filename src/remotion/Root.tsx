import { Composition } from "remotion";
import { MyTemplate } from "./MyTemplate";
import { SqlVsVectorTemplate } from "./SqlVsVectorTemplate";
import { DataFlowTemplate } from "./DataFlowTemplate";
import { DebugTemplate } from "./DebugTemplate";
import { AgentVsLlmTemplate } from "./AgentVsLlmTemplate";
import { PipelineTemplate } from "./PipelineTemplate";
import { CodeDiffTemplate } from "./CodeDiffTemplate";
import { MetricStackTemplate } from "./MetricStackTemplate";
import { AuroraGlassTemplate } from "./AuroraGlassTemplate";
import { AiCompareTemplate } from "./AiCompareTemplate";
import { CyberCompareTemplate } from "./CyberCompareTemplate";
import { ThreeDMatrixTemplate } from "./ThreeDMatrixTemplate";
import { ThreeDClusterTemplate } from "./ThreeDClusterTemplate";

export const RemotionRoot = () => {
  return (
    <>
      <Composition id="ReelTemplate" component={MyTemplate} durationInFrames={600} fps={30} width={1080} height={1920} />
      <Composition id="SqlVsVectorTemplate" component={SqlVsVectorTemplate} durationInFrames={300} fps={30} width={1080} height={1920} />
      <Composition id="DataFlowTemplate" component={DataFlowTemplate} durationInFrames={540} fps={30} width={1080} height={1920} />
      <Composition id="DebugTemplate" component={DebugTemplate} durationInFrames={450} fps={30} width={1080} height={1920} />
      <Composition id="AgentVsLlmTemplate" component={AgentVsLlmTemplate} durationInFrames={300} fps={30} width={1080} height={1920} />
      <Composition id="PipelineTemplate" component={PipelineTemplate} durationInFrames={360} fps={30} width={1080} height={1920} />
      <Composition id="CodeDiffTemplate" component={CodeDiffTemplate} durationInFrames={300} fps={30} width={1080} height={1920} />
      <Composition id="MetricStackTemplate" component={MetricStackTemplate} durationInFrames={300} fps={30} width={1080} height={1920} />
      <Composition id="AuroraGlassTemplate" component={AuroraGlassTemplate} durationInFrames={450} fps={30} width={1080} height={1920} />
      <Composition id="AiCompareTemplate" component={AiCompareTemplate} durationInFrames={300} fps={30} width={1080} height={1920} />
      <Composition id="CyberCompareTemplate" component={CyberCompareTemplate} durationInFrames={300} fps={30} width={1080} height={1920} />
      <Composition id="ThreeDMatrixTemplate" component={ThreeDMatrixTemplate} durationInFrames={300} fps={30} width={1080} height={1920} />
      
      {/* 15. COMPOSITION NETWORK CLUSTER GRAPH 3D */}
      <Composition id="ThreeDClusterTemplate" component={ThreeDClusterTemplate} durationInFrames={300} fps={30} width={1080} height={1920} />
    </>
  );
};
