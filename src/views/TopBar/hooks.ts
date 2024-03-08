import { useCallback, useState } from 'react';

const useTopBarHooks = () => {
  const [isShowLabelPlay, setIsShowLabelPlay] = useState(false);
  
  const onMouseEnterPlayButton = useCallback(() => setIsShowLabelPlay(true), []);
  const onMouseLeavePlayButton = useCallback(() => setIsShowLabelPlay(false), []);

  return {
    data: { isShowLabelPlay },
    methods: { onMouseEnterPlayButton, onMouseLeavePlayButton }
  };
};

export default useTopBarHooks;
