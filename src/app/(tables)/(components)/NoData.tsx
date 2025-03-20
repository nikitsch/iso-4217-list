import { NO_DATA_TITLE } from '~constant/index';

import type { FC } from 'react';

const NoData: FC = () => (
  <div className="w-full flex items-center justify-center mt-56" role="status">
    <p className="text-gray-400 text-2xl font-bold text-center mt-6 drop-shadow-lg animate-pulse">
      {NO_DATA_TITLE}
    </p>
  </div>
);

export default NoData;
