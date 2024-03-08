import { useCallback, useRef, useState } from 'react';

import type { ChangeEvent } from 'react';

const useTopBarHooks = () => {
  const [isShowLabelPlay, setIsShowLabelPlay] = useState(false);
  const [isShowLabelExport, setIsShowLabelExport] = useState(false);
  const [isShowLabelImport, setIsShowLabelImport] = useState(false);

  const inputFileRef = useRef<HTMLInputElement>(null);
  
  const onMouseEnterPlayButton = useCallback(() => setIsShowLabelPlay(true), []);
  const onMouseLeavePlayButton = useCallback(() => setIsShowLabelPlay(false), []);
  const onMouseEnterExportButton = useCallback(() => setIsShowLabelExport(true), []);
  const onMouseLeaveExportButton = useCallback(() => setIsShowLabelExport(false), []);
  const onMouseEnterImportButton = useCallback(() => setIsShowLabelImport(true), []);
  const onMouseLeaveImportButton = useCallback(() => setIsShowLabelImport(false), []);

  const onClickOpenFile = useCallback(() => inputFileRef?.current?.click(), [inputFileRef]);

  const onSelectFile = useCallback((
    callback: (jsonString: string) => void
  ) => (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (evt) => { 
        const text = (evt?.target?.result) as string;
        if (text) callback(text);
      };
      reader.readAsText(file);
    }
  }, []);

  return {
    data: { isShowLabelPlay, isShowLabelExport, isShowLabelImport, inputFileRef },
    methods: {
      onMouseEnterPlayButton,
      onMouseLeavePlayButton,
      onMouseEnterExportButton,
      onMouseLeaveExportButton,
      onMouseEnterImportButton,
      onMouseLeaveImportButton,
      onClickOpenFile,
      onSelectFile
    }
  };
};

export default useTopBarHooks;
