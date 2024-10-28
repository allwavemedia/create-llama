import { useChatMessage, useChatUI } from "@llamaindex/chat-ui";
import { useMemo } from "react";
import { ToolData } from "../index";
import { Artifact, CodeArtifact } from "../widgets/Artifact";
import { WeatherCard, WeatherData } from "../widgets/WeatherCard";

// TODO: If needed, add displaying more tool outputs here
export default function ChatTools({ data }: { data: ToolData }) {
  const { messages } = useChatUI();
  const { message } = useChatMessage();

  // build a map of message id to artifact version
  const artifactVersionMap = useMemo(() => {
    const map = new Map<string, number | undefined>();
    let versionIndex = 1;
    messages.forEach((m) => {
      m.annotations?.forEach((annotation: any) => {
        if (
          typeof annotation === "object" &&
          annotation != null &&
          "type" in annotation &&
          annotation.type === "tools"
        ) {
          const data = annotation.data as ToolData;
          if (data?.toolCall?.name === "artifact") {
            map.set(m.id, versionIndex);
            versionIndex++;
          }
        }
      });
    });
    return map;
  }, [messages]);

  if (!data) return null;
  const { toolCall, toolOutput } = data;

  if (toolOutput.isError) {
    return (
      <div className="border-l-2 border-red-400 pl-2">
        There was an error when calling the tool {toolCall.name} with input:{" "}
        <br />
        {JSON.stringify(toolCall.input)}
      </div>
    );
  }

  switch (toolCall.name) {
    case "get_weather_information":
      const weatherData = toolOutput.output as unknown as WeatherData;
      return <WeatherCard data={weatherData} />;
    case "artifact":
      return (
        <Artifact
          artifact={toolOutput.output as CodeArtifact}
          version={artifactVersionMap.get(message.id)}
        />
      );
    default:
      return null;
  }
}
