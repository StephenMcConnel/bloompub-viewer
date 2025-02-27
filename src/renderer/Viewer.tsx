import React from "react";
const bloomPlayerProtocol = "bpub://bloom-player/";
const bloomPlayerHtml = "bloomplayer.htm";
export const Viewer: React.FunctionComponent<{
  unpackedPath: string;
}> = (props) => {
  const rawUrl = getUrlFromFilePath(props.unpackedPath);
  const iframeSource = `${bloomPlayerProtocol}${bloomPlayerHtml}?allowToggleAppBar=true&url=${rawUrl}&host=bloompubviewer&showBackButton=true`;
  return (
    <div className="App">
      <iframe
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          display: "block", // Prevent a 4px white bar at the bottom of the iframe. See BL-14065 and BL-14049.
        }}
        src={iframeSource}
      />
    </div>
  );
}; ////https://s3.amazonaws.com/bloomharvest/benjamin%40aconnectedplanet.org%2f130b6829-5367-4e5c-80d7-ec588aae5281/bloomdigital%2findex.htm"

// Converts a filePath into a URL. Applies appropriate encoding to any special characters.
function getUrlFromFilePath(htmPath: string): string {
  // see https://issues.bloomlibrary.org/youtrack/issue/BL-8652 and BL-9041
  const encodedPath = htmPath.split(/[\\/]/g).map(encodeURIComponent).join("/");
  return `${bloomPlayerProtocol}${encodedPath}`; // need this bloomPlayerProtocol so as to not be cross origin.
}
