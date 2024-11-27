import { Image } from "antd";
import { useState } from "react";

import backendPaths from "@shared/constants/backendPaths";

export interface Props {
  imageSrc: string;
  photoCode: string;
}

export const ImagePreview = (props: Props) => {
  const { imageSrc, photoCode } = props;
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Image
        preview={{ visible: false }}
        width={100}
        src={backendPaths.BACKEND_FILES_URL(`/thumbnail/preview/${photoCode}`)}
        onClick={() => setVisible(true)}
      />
      <div style={{ display: "none" }}>
        <Image.PreviewGroup
          preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}
        >
          <Image src={backendPaths.BACKEND_FILES_URL(imageSrc)} />
        </Image.PreviewGroup>
      </div>
    </>
  );
};
