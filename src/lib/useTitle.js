import { useEffect } from 'react';

const BASE = 'Saklain Niam';

export default function useTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · ${BASE}` : `${BASE} — Agricultural Robotics, Computer Vision & ML`;
  }, [title]);
}
